import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginRequestDto } from '../dto/loginRequestDTO';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginRequestDto: LoginRequestDto) {
    console.log('login');
    return this.authService.login(loginRequestDto);
  }
}
