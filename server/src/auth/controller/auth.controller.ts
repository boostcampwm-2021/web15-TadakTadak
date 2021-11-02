import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Get('/login')
  getHello(): string {
    return "hello";
  }
}
