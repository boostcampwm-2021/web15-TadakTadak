import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginRequestDto } from '../dto/login-request.dto';
import { AuthService } from '../service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const loginUserDto: LoginRequestDto = { email, password };

    const userInfo = await this.authService.validateUser(loginUserDto);
    if (!userInfo) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: ['USER_INFORMATION_DOES_NOT_MATCH'],
        error: 'Unauthorized',
      });
    }
    return userInfo;
  }
}
