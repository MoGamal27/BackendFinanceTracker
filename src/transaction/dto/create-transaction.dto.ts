import { IsNumber, IsEnum, IsString, IsDateString, IsOptional, MinLength, Min, IsUUID, IsArray, MaxLength } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsEnum(['income', 'expense'])
  type: 'income' | 'expense';

  @IsNumber()
  categoryId: string;

  @IsString()
  @MinLength(1)
  description: string;

  @IsDateString()
  date: string;

  @IsString()
  @MaxLength(3)
  @IsOptional()
  currency?: string = 'USD';

  @IsString()
  @IsOptional()
  payment_method?: string;

  @IsString()
  @IsOptional()
  reference_number?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  receipt_url?: string;
}
