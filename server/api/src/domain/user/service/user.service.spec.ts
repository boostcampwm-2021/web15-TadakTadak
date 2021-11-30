import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from '../../auth/strategy/jwt.strategy';
import { UserService } from './user.service';
import { ImageService } from '../../image/service/image.service';
import { DevFieldRepository } from '../../field/repository/dev-field.repository';
import { UserRepository } from '../repository/user.repository';

import 'dotenv/config';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { UserException } from '../../../exception';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let imageService: ImageService;
  let devFieldRepository: DevFieldRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository, DevFieldRepository, ImageService, JwtStrategy],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    imageService = module.get<ImageService>(ImageService);
    devFieldRepository = module.get<DevFieldRepository>(DevFieldRepository);
  });

  it('각 객체가 정의된다.', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(imageService).toBeDefined();
    expect(devFieldRepository).toBeDefined();
  });

  it('존재하지 않는 사용자를 조회하면 404 예외를 발생한다.', async () => {
    const userNickname = 'zaehuun';
    jest.spyOn(userRepository, 'findUserByNicknameWithDev').mockResolvedValue(null);

    try {
      const result = await userService.getUserInfo(userNickname);
    } catch (e) {
      //   console.log(e.statusCode);
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.message).toBe('사용자를 찾을 수 없습니다.');
      expect(e.status).toBe(HttpStatus.NOT_FOUND);
    }
  });
});
