import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Request() req, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(req.user.id, createCategoryDto);
  }

  @Get()
  findAll(@Request() req, @Query('type') type: 'income' | 'expense' | 'all' = 'all') {
    return this.categoryService.findAll(req.user.id, type);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.categoryService.findOne(req.user.id, id);
  }

  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(req.user.id, id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.categoryService.remove(req.user.id, id);
  }
}
