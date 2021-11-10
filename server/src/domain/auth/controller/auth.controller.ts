import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from '../service/auth.service';
import { JwtAuthGuard } from '../guard/jwt-auth-guard';
import { LoginRequestDto } from '../dto/login-request.dto';
import { JoinRequestDto } from '../dto/join-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginRequestDto: LoginRequestDto, @Res({ passthrough: true }) res: Response) {
    const { token, userInfo } = await this.authService.login(loginRequestDto);
    res.cookie('access-token', token);
    return { result: userInfo };
  }

  @Post('/join')
  async join(@Body() joinRequestDto: JoinRequestDto) {
    return { result: await this.authService.join(joinRequestDto) };
  }

  @Get('/token')
  @UseGuards(JwtAuthGuard)
  async test(@Req() req: Request) {
    return { result: await this.authService.getUserInfo(req.user['email']) };
  }
}
