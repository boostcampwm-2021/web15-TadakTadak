import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Bcrypt } from 'src/utils/bcrypt';
import { User } from '../auth.entity';
import { AuthRepository } from '../auth.repository';
import { LoginRequestDto } from '../dto/loginRequestDTO';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginRequestDTO: LoginRequestDto): Promise<any> {
    const user: User = await this.authRepository.findOne({ where: { email: loginRequestDTO.email } });
    if (user && Bcrypt.compare(loginRequestDTO.password, user.password)) return user;
    throw new UnauthorizedException({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: ['USER_INFORMATION_DOES_NOT_MATCH'],
      error: 'Unauthorized',
    });
  }

  async login(loginRequestDTO: LoginRequestDto) {
    const payload = { email: loginRequestDTO.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
