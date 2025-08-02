import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Category } from '../../category/entities/category.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  category_id: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: ['income', 'expense'],
  })
  type: 'income' | 'expense';

  @Column('text')
  description: string;

  @Column({ type: 'date' })
  transaction_date: Date;

  @Column({ length: 3, default: 'USD' })
  currency: string;

  @Column({ type: 'decimal', precision: 10, scale: 6, default: 1.0 })
  exchange_rate: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  amount_in_base_currency: number;

  @Column({ length: 50, nullable: true })
  payment_method: string;

  @Column({ length: 100, nullable: true })
  reference_number: string;

  @Column({ type: 'text', nullable: true })
  location: string;

  @Column('text', { array: true, nullable: true })
  tags: string[];

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'text', nullable: true })
  receipt_url: string;

  @Column({ default: false })
  is_recurring: boolean;

  @Column({ type: 'uuid', nullable: true })
  recurring_transaction_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Category)
  category: Category;
}
