import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthRequestDto } from '../dto/authRequestDTO';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() authRequestDto: AuthRequestDto) {
    console.log(authRequestDto.email);
    console.log(authRequestDto.password);
    return 'hello';
  }
}
