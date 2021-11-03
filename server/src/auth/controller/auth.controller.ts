import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { LoginRequestDto } from '../dto/loginRequestDTO';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  // @authPublic()
  @Post('/login')
  login(@Body() loginRequestDto: LoginRequestDto) {
    return this.authService.login(loginRequestDto);
  }
}
