import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(userId: string, createCategoryDto: CreateCategoryDto) {
    // Check for duplicate
    const existing = await this.categoryRepository.findOne({
      where: {
        user_id: userId,
        name: createCategoryDto.name,
        type: createCategoryDto.type,
      },
    });

    if (existing) {
      throw new ConflictException('Category with this name and type already exists');
    }

    const category = this.categoryRepository.create({
      ...createCategoryDto,
      user_id: userId,
    });

    await this.categoryRepository.save(category);

    return {
      success: true,
      data: {
        ...category,
        transactionCount: 0,
        totalAmount: 0,
      },
    };
  }

  async findAll(userId: string, type: 'income' | 'expense' | 'all' = 'all') {
    const where: any = { user_id: userId };
    if (type !== 'all') {
      where.type = type;
    }

    const categories = await this.categoryRepository.find({
      where,
      order: { sort_order: 'ASC', name: 'ASC' },
    });

    return {
      success: true,
      data: categories.map(category => ({
        ...category,
        transactionCount: 0, // TODO
        totalAmount: 0, // TODO
      })),
    };
  }

  async findOne(userId: string, id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id, user_id: userId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return {
      success: true,
      data: {
        ...category,
        transactionCount: 0, // TODO
        totalAmount: 0, // TODO
      },
    };
  }

  async update(userId: string, id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { id, user_id: userId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepository.update(id, updateCategoryDto);

    const updated = await this.categoryRepository.findOne({
      where: { id },
    });

    return {
      success: true,
      data: {
        ...updated,
        transactionCount: 0, // TODO
        totalAmount: 0, // TODO
      },
    };
  }

  async remove(userId: string, id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id, user_id: userId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepository.remove(category);

    return {
      success: true,
      message: 'Category deleted successfully',
    };
  }
}
