import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from '../../user/repository/user.repository';
import { DevFieldRepository } from '../../field/repository/dev-field.repository';
import { HistoryService } from '../../history/service/history.service';
import { HistoryRepository } from '../../history/repository/history.repository';
import { VisitRepository } from '../../history/repository/visit.repository';
import { JoinRequestDto } from '../dto/join-request.dto';
import { JoinRequestDtoBuilder } from '../../../builder/auth/join-request.dto.builder';
import { datatype, lorem, internet } from 'faker';
import { DevFieldBuilder } from '../../../builder/dev-field.builder';
import { LoginRequestDtoBuilder, UserBuilder } from '../../../builder';
import { BadRequestException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { UserException } from '../../../exception';
import { LoginRequestDto } from '../dto/login-request.dto';
import { Bcrypt } from '../../../utils/bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UserRepository;
  let devFieldRepository: DevFieldRepository;

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

      jest.spyOn(userRepository, 'exists').mockResolvedValue(false);
      jest.spyOn(devFieldRepository, 'findDevById').mockResolvedValue(findDevByIdResponseDevField);
      jest.spyOn(userRepository, 'save').mockResolvedValue(saveResponseUser);
      const result = await authService.join(joinRequestDto);
      expect(result).toEqual(true);
    });

    it('동일한 닉네임 혹은 이메일로 회원가입을 할 수 없다.', async () => {
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

      jest.spyOn(userRepository, 'exists').mockResolvedValue(true);
      jest.spyOn(devFieldRepository, 'findDevById').mockResolvedValue(findDevByIdResponseDevField);
      jest.spyOn(userRepository, 'save').mockResolvedValue(saveResponseUser);
      let result;
      try {
        result = await authService.join(joinRequestDto);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.message).toBe(UserException.userIsExist().message);
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

      Bcrypt.compare = jest.fn().mockReturnValue(false);
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
  });
});
