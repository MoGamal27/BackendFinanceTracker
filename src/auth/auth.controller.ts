import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() loginDto: LoginDto) {
    return this.authService.login(req.user);
  }
}