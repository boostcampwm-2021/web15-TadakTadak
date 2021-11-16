import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { LocalDate } from 'js-joda';
import { Bcrypt } from 'src/utils/bcrypt';
import { UserBuilder } from '../../../builder';
import { UserException } from '../../../exception';
import { User } from '../../user/user.entity';
import { HistoryService } from 'src/domain/history/service/history.service';
import { AuthRepository } from '../auth.repository';
import { LoginRequestDto } from '../dto/login-request.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { JoinRequestDto } from '../dto/join-request.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,

    private readonly historyService: HistoryService,
    private jwtService: JwtService,
  ) {}

  async login(loginRequestDto: LoginRequestDto) {
    const user: User = await this.authRepository.findUserByEmail(loginRequestDto.email);
    if (!user || !Bcrypt.compare(loginRequestDto.password, user.password))
      throw UserException.userLoginInfoNotCorrect();
    const today = LocalDate.now();
    const isToday = user.lastCheckIn.isEqual(today);
    if (!isToday) {
      user.setLastCheckIn(today);
      this.historyService.checkIn(user);
      await this.authRepository.save(user);
    }
    const token = this.jwtService.sign({ email: loginRequestDto.email });
    const userInfo: UserResponseDto = new UserResponseDto(user);
    return { token, userInfo };
  }

  async join(joinRequestDto: JoinRequestDto) {
    const { nickname, email, password } = joinRequestDto;
    const isExistUser = await this.authRepository.exists(joinRequestDto);
    if (isExistUser) throw UserException.userIsExist();
    const user: User = new UserBuilder()
      .setNickName(nickname)
      .setEmail(email)
      .setPassword(Bcrypt.hash(password))
      .build();
    await this.authRepository.save(user);
    return true;
  }

  async getUserInfo(email: string) {
    const user: User = await this.authRepository.findUserByEmail(email);
    if (!user) throw UserException.userNotFound();
    return new UserResponseDto(user);
  }
}
