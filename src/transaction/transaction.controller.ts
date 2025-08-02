import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Request() req, @Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(req.user.id, createTransactionDto);
  }

  @Get()
  findAll(@Request() req, @Query() query) {
    return this.transactionService.findAll(req.user.id, query);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.transactionService.findOne(req.user.id, id);
  }

  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(req.user.id, id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.transactionService.remove(req.user.id, id);
  }

  @Post('bulk')
  createBulk(@Request() req, @Body('transactions') transactions: CreateTransactionDto[]) {
    return this.transactionService.createBulk(req.user.id, transactions);
  }
}
