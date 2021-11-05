import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../service/auth.service';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { JwtAuthGuard } from '../guard/jwt-auth-guard';
import { LoginRequestDto } from '../dto/login-request.dto';
import { JoinRequestDto } from '../dto/join-request.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @authPublic()
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginRequestDto: LoginRequestDto, @Res({ passthrough: true }) res: Response) {
    const tk = await this.authService.login(loginRequestDto);
    res.cookie('access-token', tk);
    return { msg: '통과 됐다..' };
  }

  @Post('/join')
  join(@Body() joinRequestDto: JoinRequestDto) {
    return this.authService.join(joinRequestDto);
  }

  @Get('/test')
  @UseGuards(JwtAuthGuard)
  test() {
    console.log('access token 검증하기 위한 코드 예시입니다.');
    return true;
  }
}
