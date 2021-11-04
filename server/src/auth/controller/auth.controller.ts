import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../service/auth.service';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { LoginRequestDto } from '../dto/login-request.dto';
import { JoinRequestDto } from '../dto/join-request.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  // @authPublic()
  @Post('/login')
  login(@Body() loginRequestDto: LoginRequestDto, @Res({ passthrough: true }) res: Response) {
    res.cookie('access-token', this.authService.login(loginRequestDto));
    return { msg: 'treu' };
  }

  @Post('/join')
  join(@Body() joinRequestDto: JoinRequestDto) {
    return this.authService.join(joinRequestDto);
  }
}
