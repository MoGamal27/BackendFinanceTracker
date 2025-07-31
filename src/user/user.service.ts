import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/user-profile.entity';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>
  ) {}

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  findOneById(id): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async getProfile(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['profile']
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      role: user.role,
      avatar: user.avatar_url,
      currency: user.profile?.default_currency,
      timezone: user.profile?.timezone,
      preferences: {
        theme: user.profile?.theme,
        notifications: user.profile?.notifications_enabled,
        defaultCurrency: user.profile?.default_currency
      },
      createdAt: user.created_at,
      updatedAt: user.updated_at
    };
  }

  async updateProfile(userId: string, updateProfileDto: UpdateUserProfileDto) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.profile) {
      user.profile = this.userProfileRepository.create({
        user_id: userId,
      });
    }

    // Update profile 
    // Object.assign(target, source)
    Object.assign(user.profile, {
      default_currency: updateProfileDto.default_currency,
      timezone: updateProfileDto.timezone,
      date_format: updateProfileDto.date_format,
      
      theme: updateProfileDto.theme,
      language: updateProfileDto.language,
      notifications_enabled: updateProfileDto.notifications_enabled,
      email_notifications: updateProfileDto.email_notifications,
      push_notifications: updateProfileDto.push_notifications,
      monthly_budget_limit: updateProfileDto.monthly_budget_limit,
      financial_year_start: updateProfileDto.financial_year_start,
    });

    await this.userProfileRepository.save(user.profile);

    return this.getProfile(userId);
  }
}
