import { IsEmail, IsString, IsEnum, IsOptional, MinLength, MaxLength } from 'class-validator';
import { Role } from './../utils/user.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  full_name: string;

  @IsEnum(Role)
  @IsOptional()
  role?: 'user' | 'admin' | 'accountant' = 'user';

  @IsString()
  @IsOptional()
  avatar_url?: string;
}
