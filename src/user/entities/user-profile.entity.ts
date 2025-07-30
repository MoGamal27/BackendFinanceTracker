import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_profiles')
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  user_id: string;

  @Column({ default: 'USD' })
  default_currency: string;

  @Column({ default: 'UTC' })
  timezone: string;

  @Column({ default: 'MM/DD/YYYY' })
  date_format: string;

  @Column({ default: 'light' })
  theme: 'light' | 'dark';

  @Column({ default: 'en' })
  language: string;

  @Column({ default: true })
  notifications_enabled: boolean;

  @Column({ default: true })
  email_notifications: boolean;

  @Column({ default: false })
  push_notifications: boolean;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  monthly_budget_limit: number;

  @Column({ default: 1 })
  financial_year_start: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => User, user => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: User;
}