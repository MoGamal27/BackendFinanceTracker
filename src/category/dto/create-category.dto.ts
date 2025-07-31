import { IsString, IsEnum, IsHexColor, IsOptional, IsNumber, Min, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsEnum(['income', 'expense'])
  type: 'income' | 'expense';

  @IsHexColor()
  @IsOptional()
  color?: string = '#3B82F6';

  @IsString()
  @IsOptional()
  icon?: string = 'tag';

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  budget?: number;
}
