import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Bcrypt } from 'src/utils/bcrypt';
import { User } from '../auth.entity';
import { AuthRepository } from '../auth.repository';
import { LoginRequestDto } from '../dto/login-request.dto';
import { JoinRequestDto } from '../dto/join-request.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginRequestDto: LoginRequestDto): Promise<any> {
    const user: User = await this.authRepository.findOne({ where: { email: loginRequestDto.email } });
    if (user && Bcrypt.compare(loginRequestDto.password, user.password)) return user;
    throw new UnauthorizedException({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: ['USER_INFORMATION_DOES_NOT_MATCH'],
      error: 'Unauthorized',
    });
  }

  async login(loginRequestDto: LoginRequestDto) {
    const payload = { email: loginRequestDto.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async join(joinRequestDto: JoinRequestDto) {
    if (await this.authRepository.exists(joinRequestDto)) return;

    console.log('없닿ㅎ');
  }
}
