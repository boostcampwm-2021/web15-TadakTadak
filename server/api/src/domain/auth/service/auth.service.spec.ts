import * as dotenv from 'dotenv';
dotenv.config();
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from '../../user/repository/user.repository';
import { DevFieldRepository } from '../../field/repository/dev-field.repository';
import { HistoryService } from '../../history/service/history.service';
import { HistoryRepository } from '../../history/repository/history.repository';
import { VisitRepository } from '../../history/repository/visit.repository';
import { JoinRequestDto } from '../dto/join-request.dto';
import { JoinRequestDtoBuilder } from '../../../builder/auth/join-request.dto.builder';
import { datatype, lorem, internet } from 'faker';
import { DevFieldBuilder } from '../../../builder';
import { HistoryBuilder, LoginRequestDtoBuilder, UserBuilder, UserResponseDtoBuilder } from '../../../builder';
import { BadRequestException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { UserException } from '../../../exception';
import { LoginRequestDto } from '../dto/login-request.dto';
import { Bcrypt } from '../../../utils';
import { User } from '../../user/user.entity';
import { LocalDate } from 'js-joda';
import { DevField } from '../../field/dev-field.entity';
import { History } from '../../history/history.entity';
import { UserResponseDto } from '../../user/dto/user-response.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UserRepository;
  let devFieldRepository: DevFieldRepository;
  let historyService: HistoryService;
  let historyRepository: HistoryRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1h' },
        }),
      ],
      providers: [
        AuthService,
        UserRepository,
        DevFieldRepository,
        HistoryRepository,
        VisitRepository,
        HistoryService,
        JwtStrategy,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
    devFieldRepository = module.get<DevFieldRepository>(DevFieldRepository);
    historyService = module.get<HistoryService>(HistoryService);
    historyRepository = module.get<HistoryRepository>(HistoryRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('유저 회원가입', () => {
    it('정상적으로 회원가입이 된다.', async () => {
      const joinRequestDto: JoinRequestDto = new JoinRequestDtoBuilder()
        .setNickname(lorem.sentence())
        .setEmail(internet.email())
        .setPassword(lorem.sentence())
        .setDevField(0)
        .setIntroduction('')
        .build();
      const findDevByIdResponseDevField = new DevFieldBuilder().setId(0).setName('Front-end').build();
      const saveResponseUser = new UserBuilder()
        .setId(datatype.number())
        .setNickname(joinRequestDto.nickname)
        .setEmail(joinRequestDto.email)
        .setPassword(joinRequestDto.password)
        .setDevField(findDevByIdResponseDevField)
        .setIntroduction('')
        .setImageName('')
        .setImageURL(process.env.DEFAULT_IMG)
        .setHistorys([])
        .setIsSocial(false)
        .build();

      jest.spyOn(userRepository, 'isExistEmail').mockResolvedValue(false);
      jest.spyOn(userRepository, 'isExistNickname').mockResolvedValue(false);
      jest.spyOn(devFieldRepository, 'findDevById').mockResolvedValue(findDevByIdResponseDevField);
      jest.spyOn(userRepository, 'save').mockResolvedValue(saveResponseUser);
      const result = await authService.join(joinRequestDto);
      expect(result).toEqual(true);
    });

    it('동일한 닉네임으로 회원가입을 할 수 없다.', async () => {
      const joinRequestDto: JoinRequestDto = new JoinRequestDtoBuilder()
        .setNickname(lorem.sentence())
        .setEmail(internet.email())
        .setPassword(lorem.sentence())
        .setDevField(0)
        .setIntroduction('')
        .build();
      const findDevByIdResponseDevField = new DevFieldBuilder().setId(0).setName('Front-end').build();
      const saveResponseUser = new UserBuilder()
        .setId(datatype.number())
        .setNickname(joinRequestDto.nickname)
        .setEmail(joinRequestDto.email)
        .setPassword(joinRequestDto.password)
        .setDevField(findDevByIdResponseDevField)
        .setIntroduction('')
        .setImageName('')
        .setImageURL(process.env.DEFAULT_IMG)
        .setHistorys([])
        .setIsSocial(false)
        .build();

      jest.spyOn(userRepository, 'isExistEmail').mockResolvedValue(false);
      jest.spyOn(userRepository, 'isExistNickname').mockResolvedValue(true);
      jest.spyOn(devFieldRepository, 'findDevById').mockResolvedValue(findDevByIdResponseDevField);
      jest.spyOn(userRepository, 'save').mockResolvedValue(saveResponseUser);
      try {
        await authService.join(joinRequestDto);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.message).toBe(UserException.userNicknameIsExist().message);
      }
    });

    it('동일한 이메일로 회원가입을 할 수 없다.', async () => {
      const joinRequestDto: JoinRequestDto = new JoinRequestDtoBuilder()
        .setNickname(lorem.sentence())
        .setEmail(internet.email())
        .setPassword(lorem.sentence())
        .setDevField(0)
        .setIntroduction('')
        .build();
      const findDevByIdResponseDevField = new DevFieldBuilder().setId(0).setName('Front-end').build();
      const saveResponseUser = new UserBuilder()
        .setId(datatype.number())
        .setNickname(joinRequestDto.nickname)
        .setEmail(joinRequestDto.email)
        .setPassword(joinRequestDto.password)
        .setDevField(findDevByIdResponseDevField)
        .setIntroduction('')
        .setImageName('')
        .setImageURL(process.env.DEFAULT_IMG)
        .setHistorys([])
        .setIsSocial(false)
        .build();

      jest.spyOn(userRepository, 'isExistEmail').mockResolvedValue(true);
      jest.spyOn(userRepository, 'isExistNickname').mockResolvedValue(false);
      jest.spyOn(devFieldRepository, 'findDevById').mockResolvedValue(findDevByIdResponseDevField);
      jest.spyOn(userRepository, 'save').mockResolvedValue(saveResponseUser);
      try {
        await authService.join(joinRequestDto);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.message).toBe(UserException.userEmailIsExist().message);
      }
    });

    it('존재하지 않는 이메일로 로그인을 하면 예외가 발생한다.', async () => {
      const loginRequestDto: LoginRequestDto = new LoginRequestDtoBuilder()
        .setEmail(internet.email())
        .setPassword(lorem.sentence())
        .build();

      jest.spyOn(userRepository, 'findUserByEmailWithDev').mockResolvedValue(undefined);
      let result;
      try {
        result = await authService.login(loginRequestDto);
      } catch (e) {
        expect(e).toBeInstanceOf(UnauthorizedException);
        expect(e.message).toBe('입력하신 사용자 정보가 올바르지 않습니다.');
        expect(e.status).toBe(HttpStatus.UNAUTHORIZED);
      }
    });

    it('일치하지 않는 비밀번호로 로그인을 하면 예외가 발생한다.', async () => {
      const loginRequestDto: LoginRequestDto = new LoginRequestDtoBuilder()
        .setEmail(internet.email())
        .setPassword(lorem.sentence())
        .build();

      jest.spyOn(userRepository, 'findUserByEmailWithDev').mockResolvedValue(new User());
      Bcrypt.compare = jest.fn().mockReturnValue(false);

      let result;
      try {
        result = await authService.login(loginRequestDto);
      } catch (e) {
        expect(e).toBeInstanceOf(UnauthorizedException);
        expect(e.message).toBe('입력하신 사용자 정보가 올바르지 않습니다.');
        expect(e.status).toBe(HttpStatus.UNAUTHORIZED);
      }
    });

    it('오늘 첫 로그인이면 잔디를 심는다.', async () => {
      const loginRequestDto: LoginRequestDto = new LoginRequestDtoBuilder()
        .setEmail(internet.email())
        .setPassword(lorem.sentence())
        .build();

      const user: User = new UserBuilder()
        .setId(datatype.number())
        .setNickname(lorem.sentence())
        .setEmail(loginRequestDto.email)
        .setPassword(loginRequestDto.password)
        .setDevField(new DevField())
        .setIntroduction('')
        .setImageName('')
        .setImageURL(process.env.DEFAULT_IMG)
        .setHistorys([])
        .setIsSocial(false)
        .setLastCheckIn(LocalDate.now().minusDays(1))
        .build();
      const history: History = new HistoryBuilder().setCheckIn(LocalDate.now()).setUser(user).build();
      Bcrypt.compare = jest.fn().mockReturnValue(true);
      jest.spyOn(userRepository, 'findUserByEmailWithDev').mockResolvedValue(user);
      jest.spyOn(historyService, 'checkIn').mockResolvedValue(true);
      jest.spyOn(historyRepository, 'addHistory').mockResolvedValue(true);
      jest.spyOn(historyRepository, 'save').mockResolvedValue(history);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);
      await authService.login(loginRequestDto);

      expect(historyService.checkIn).toHaveBeenCalled();
      expect(userRepository.save).toHaveBeenCalled();
    });

    it('로그인이 성공적이면 jwt 토큰과 유저 정보를 반환한다.', async () => {
      const loginRequestDto: LoginRequestDto = new LoginRequestDtoBuilder()
        .setEmail(internet.email())
        .setPassword(lorem.sentence())
        .build();

      const findDevByIdResponseDevField = new DevFieldBuilder().setId(0).setName('Front-end').build();
      const user: User = new UserBuilder()
        .setId(datatype.number())
        .setNickname(lorem.sentence())
        .setEmail(loginRequestDto.email)
        .setPassword(loginRequestDto.password)
        .setDevField(findDevByIdResponseDevField)
        .setIntroduction('')
        .setImageName('')
        .setImageURL(process.env.DEFAULT_IMG)
        .setHistorys([])
        .setIsSocial(false)
        .setLastCheckIn(LocalDate.now())
        .build();

      const userResponse: UserResponseDto = new UserResponseDtoBuilder()
        .setId(user.id)
        .setNickname(user.nickname)
        .setEmail(user.email)
        .setDevField(user.devField)
        .setImageUrl(user.imageUrl)
        .build();

      Bcrypt.compare = jest.fn().mockReturnValue(true);
      jest.spyOn(userRepository, 'findUserByEmailWithDev').mockResolvedValue(user);
      const { token, userInfo } = await authService.login(loginRequestDto);

      expect(userInfo).toStrictEqual(userResponse);
    });
  });
});
