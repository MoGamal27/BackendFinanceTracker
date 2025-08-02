import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Like } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const transaction = this.transactionRepository.create({
      ...createTransactionDto,
      user_id: userId,
      category_id: createTransactionDto.categoryId,
      transaction_date: new Date(createTransactionDto.date),
    });

    await this.transactionRepository.save(transaction);

    return {
      success: true,
      data: await this.findOne(userId, transaction.id),
    };
  }

  async findAll(userId: string, query: any) {
    const {
      page = 1,
      limit = 20,
      type = 'all',
      category,
      startDate,
      endDate,
      search,
      sortBy = 'date',
      sortOrder = 'DESC',
    } = query;

    const skip = (page - 1) * limit;
    const where: any = { user_id: userId };

    if (type !== 'all') {
      where.type = type;
    }

    if (category) {
      where.category_id = category;
    }

    if (startDate && endDate) {
      where.transaction_date = Between(new Date(startDate), new Date(endDate));
    }

    if (search) {
      where.description = Like(`%${search}%`);
    }

    const [transactions, total] = await this.transactionRepository.findAndCount({
      where,
      relations: ['category'],
      skip,
      take: limit,
      order: {
        [sortBy === 'date' ? 'transaction_date' : sortBy]: sortOrder,
      },
    });

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data: {
        transactions: transactions.map(tx => ({
          id: tx.id,
          amount: tx.amount,
          type: tx.type,
          category: tx.category ? {
          id: tx.category.id,
          name: tx.category.name,
          color: tx.category.color,
          icon: tx.category.icon,
      } : null,
          description: tx.description,
          date: tx.transaction_date,
          currency: tx.currency,
          createdAt: tx.created_at,
          updatedAt: tx.updated_at,
        })),
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: total,
          itemsPerPage: limit,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
    };
  }

  async findOne(userId: string, id: string) {
    const transaction = await this.transactionRepository.findOne({
      where: { id, user_id: userId },
      relations: ['category'],
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }

  async update(userId: string, id: string, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.findOne(userId, id);

    await this.transactionRepository.update(id, {
      ...updateTransactionDto,
      category_id: updateTransactionDto.categoryId,
      transaction_date: updateTransactionDto.date ? new Date(updateTransactionDto.date) : undefined,
    });

    return {
      success: true,
      data: await this.findOne(userId, id),
    };
  }

  async remove(userId: string, id: string) {
    const transaction = await this.findOne(userId, id);
    await this.transactionRepository.remove(transaction);

    return {
      success: true,
      message: 'Transaction deleted successfully',
    };
  }

  async createBulk(userId: string, transactions: CreateTransactionDto[]) {
    const createdTransactions = await Promise.all(
      transactions.map(tx => this.create(userId, tx))
    );

    return {
      success: true,
      data: createdTransactions,
    };
  }
}
