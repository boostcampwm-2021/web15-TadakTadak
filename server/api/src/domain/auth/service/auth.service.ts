import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { LocalDate } from 'js-joda';
import { Bcrypt } from '../../../utils';
import { UserBuilder, UserResponseDtoBuilder } from '../../../builder';
import { DevFieldException, UserException } from '../../../exception';
import { User } from '../../user/user.entity';
import { DevField } from '../../field/dev-field.entity';
import { HistoryService } from '../../history/service/history.service';
import { UserRepository } from '../../user/repository/user.repository';
import { DevFieldRepository } from '../../field/repository/dev-field.repository';
import { LoginRequestDto } from '../dto/login-request.dto';
import { UserResponseDto } from '../../user/dto/user-response.dto';
import { JoinRequestDto } from '../dto/join-request.dto';

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
      await this.historyService.checkIn(user);
      await this.userRepository.save(user);
    }
    const token = this.jwtService.sign({ email: loginRequestDto.email });
    const userInfo: UserResponseDto = new UserResponseDtoBuilder()
      .setId(user.id)
      .setNickname(user.nickname)
      .setEmail(user.email)
      .setImageUrl(user.imageUrl)
      .setDevField(user.devField)
      .build();
    return { token, userInfo };
  }

  async join(joinRequestDto: JoinRequestDto) {
    const { nickname, email, password } = joinRequestDto;
    const isExistEmail = await this.userRepository.isExistEmail(email);
    if (isExistEmail) throw UserException.userEmailIsExist();
    const isExistNickname = await this.userRepository.isExistNickname(nickname);
    if (isExistNickname) throw UserException.userNicknameIsExist();
    const devField: DevField = await this.devFieldRepository.findDevById(joinRequestDto.devField);
    if (!devField) throw DevFieldException.devFieldNotFound();
    const user: User = new UserBuilder()
      .setNickname(nickname)
      .setEmail(email)
      .setPassword(Bcrypt.hash(password))
      .setImageURL(process.env.DEFAULT_IMG)
      .setDevField(devField)
      .setLastCheckIn(LocalDate.now().minusDays(1))
      .build();
    await this.userRepository.save(user);
    return true;
  }

  async getUserInfo(email: string) {
    const user: User = await this.userRepository.findUserByEmailWithDev(email);
    if (!user) throw UserException.userNotFound();
    return new UserResponseDtoBuilder()
      .setId(user.id)
      .setNickname(user.nickname)
      .setEmail(user.email)
      .setImageUrl(user.imageUrl)
      .setDevField(user.devField)
      .build();
  }
}
