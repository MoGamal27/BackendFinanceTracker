import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  user_id: string;

  @Column({ length: 100 })
  name: string;

  @Column({
    type: 'enum',
    enum: ['income', 'expense'],
  })
  type: 'income' | 'expense';

  @Column({ default: '#3B82F6', length: 7 })
  color: string;

  @Column({ default: 'tag', length: 50 })
  icon: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: false })
  is_system: boolean;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: 0 })
  sort_order: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User)
  user: User;
}
