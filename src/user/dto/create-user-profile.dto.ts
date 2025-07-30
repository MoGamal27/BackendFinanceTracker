import { IsString, IsEnum, IsBoolean, IsOptional, IsNumber, Min, Max, IsISO8601, Matches } from 'class-validator';

export class CreateUserProfileDto {
  @IsString()
  @IsOptional()
  @Matches(/^[A-Z]{3}$/)
  default_currency?: string = 'USD';

  @IsString()
  @IsOptional()
  timezone?: string = 'UTC';

  @IsString()
  @IsOptional()
  @Matches(/^(MM\/DD\/YYYY|DD\/MM\/YYYY|YYYY-MM-DD)$/)
  date_format?: string = 'MM/DD/YYYY';

  @IsEnum(['light', 'dark'])
  @IsOptional()
  theme?: 'light' | 'dark' = 'light';

  @IsString()
  @IsOptional()
  @Matches(/^[a-z]{2}(-[A-Z]{2})?$/)
  language?: string = 'en';

  @IsBoolean()
  @IsOptional()
  notifications_enabled?: boolean = true;

  @IsBoolean()
  @IsOptional()
  email_notifications?: boolean = true;

  @IsBoolean()
  @IsOptional()
  push_notifications?: boolean = false;

  @IsNumber()
  @IsOptional()
  @Min(0)
  monthly_budget_limit?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(12)
  financial_year_start?: number = 1;
}