import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Bcrypt } from 'src/utils/bcrypt';
import { User } from '../../user/user.entity';
import { AuthRepository } from '../auth.repository';
import { LoginRequestDto } from '../dto/login-request.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { JoinRequestDto } from '../dto/join-request.dto';
import { UserBuilder } from '../../../builder';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async login(loginRequestDto: LoginRequestDto) {
    const user: User = await this.authRepository.findUserByEmail(loginRequestDto.email);
    if (!user || !Bcrypt.compare(loginRequestDto.password, user.password)) throw new UnauthorizedException();
    const token = this.jwtService.sign({ email: loginRequestDto.email });
    const userInfo: LoginResponseDto = new LoginResponseDto(user);
    return { token, userInfo };
  }

  async join(joinRequestDto: JoinRequestDto) {
    const { nickname, email, password } = joinRequestDto;
    const baseImageURL = '디폴트 이미지 주소 자리';
    const isExistUser = await this.authRepository.exists(joinRequestDto);
    if (isExistUser) throw new BadRequestException();
    if (isExistUser) throw UserException.userIsExist();
    const user: User = new UserBuilder()
      .setNickName(nickname)
      .setEmail(email)
      .setPassword(Bcrypt.hash(password))
      .setImageURL(baseImageURL)
      .build();
    await this.authRepository.save(user);
    return true;
  }
}
