import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { LocalDate } from 'js-joda';
import { Bcrypt } from 'src/utils/bcrypt';
import { UserBuilder } from '../../../builder';
import { DevFieldException, UserException } from '../../../exception';
import { User } from '../../user/user.entity';
import { HistoryService } from 'src/domain/history/service/history.service';
import { UserRepository } from '../../user/repository/user.repository';
import { DevFieldRepository } from 'src/domain/field/repository/dev-field.repository';
import { LoginRequestDto } from '../dto/login-request.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { JoinRequestDto } from '../dto/join-request.dto';
import { DevField } from 'src/domain/field/dev-field.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,

    @InjectRepository(DevFieldRepository)
    private readonly devFieldRepository: DevFieldRepository,

    private readonly historyService: HistoryService,
    private jwtService: JwtService,
  ) {}

  async login(loginRequestDto: LoginRequestDto) {
    const user: User = await this.userRepository.findUserByEmailWithDev(loginRequestDto.email);
    if (!user || !Bcrypt.compare(loginRequestDto.password, user.password))
      throw UserException.userLoginInfoNotCorrect();
    const today = LocalDate.now();
    const isToday = user.lastCheckIn.isEqual(today);
    if (!isToday) {
      user.setLastCheckIn(today);
      this.historyService.checkIn(user);
      await this.userRepository.save(user);
    }
    const token = this.jwtService.sign({ email: loginRequestDto.email });
    const userInfo: UserResponseDto = new UserResponseDto(user);
    return { token, userInfo };
  }

  async join(joinRequestDto: JoinRequestDto) {
    const { nickname, email, password } = joinRequestDto;
    const isExistUser = await this.userRepository.exists(joinRequestDto);
    if (isExistUser) throw UserException.userIsExist();
    const devField: DevField = await this.devFieldRepository.findDevById(joinRequestDto.devFieldId);
    if (!devField) throw DevFieldException.devFieldNotFound();
    const user: User = new UserBuilder()
      .setNickName(nickname)
      .setEmail(email)
      .setPassword(Bcrypt.hash(password))
      .setImageURL(process.env.DEFAULT_IMG)
      .setDevField(devField)
      .build();
    await this.userRepository.save(user);
    return true;
  }

  async getUserInfo(email: string) {
    const user: User = await this.userRepository.findUserByEmailWithDev(email);
    if (!user) throw UserException.userNotFound();
    return new UserResponseDto(user);
  }
}
