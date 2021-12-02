import { BadRequestException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DevFieldBuilder, UserBuilder, UserUpdateDtoBuilder } from '../../../builder';
import { JwtStrategy } from '../../auth/strategy/jwt.strategy';
import { User } from '../user.entity';
import { DevField } from '../../field/dev-field.entity';
import { UserService } from './user.service';
import { ImageService } from '../../image/service/image.service';
import { DevFieldRepository } from '../../field/repository/dev-field.repository';
import { UserRepository } from '../repository/user.repository';
import { UserResponseDto } from '../dto/user-response.dto';
import { UserUpdateDto } from '../dto/user-update.dto';
import { lorem } from 'faker';
import 'dotenv/config';

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

  it('의존성이 주입된다.', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(imageService).toBeDefined();
    expect(devFieldRepository).toBeDefined();
  });

  it('존재하지 않는 사용자를 조회하면 404 예외를 발생한다.', async () => {
    //given
    const userNickname = lorem.sentence();
    jest.spyOn(userRepository, 'findUserByNicknameWithDev').mockResolvedValue(undefined);

    try {
      //when
      const result = await userService.getUserInfo(userNickname);
    } catch (e) {
      //then
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.message).toBe('사용자를 찾을 수 없습니다.');
      expect(e.status).toBe(HttpStatus.NOT_FOUND);
    }
  });

  it('존재하는 사용자를 조회하면 해당 사용자가 조회된다.', async () => {
    //given
    const userNickname = lorem.sentence();
    const toBeFindedUser: User = new UserBuilder().setNickname(userNickname).build();

    jest.spyOn(userRepository, 'findUserByNicknameWithDev').mockResolvedValue(toBeFindedUser);

    //when
    const findedUser: UserResponseDto = await userService.getUserInfo(userNickname);

    //then
    expect(findedUser).toBeInstanceOf(UserResponseDto);
    expect(findedUser.nickname).toBe(userNickname);
  });

  it('존재하지 않는 사용자의 정보를 수정하면 404 예외를 발생한다.', async () => {
    //given
    const userNickname = lorem.sentence();

    jest.spyOn(userRepository, 'findUserByNickname').mockResolvedValue(undefined);

    try {
      //when
      const result = await userService.updateUserInfo(userNickname, new UserUpdateDto());
    } catch (e) {
      //then
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.message).toBe('사용자를 찾을 수 없습니다.');
      expect(e.status).toBe(HttpStatus.NOT_FOUND);
    }
  });

  it('중복되는 닉네임으로 사용자의 정보를 수정하면 404 예외를 발생한다.', async () => {
    //given
    const userNickname = lorem.sentence();

    jest.spyOn(userRepository, 'findUserByNickname').mockResolvedValue(new User());
    jest.spyOn(userRepository, 'isExistNickname').mockResolvedValue(true);

    try {
      //when
      const result = await userService.updateUserInfo(userNickname, new UserUpdateDto());
    } catch (e) {
      //then
      expect(e).toBeInstanceOf(BadRequestException);
      expect(e.message).toBe('이미 존재하는 회원입니다.');
      expect(e.status).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('존재하지 않는 개발 필드로 사용자의 정보를 수정하면 예외를 발생한다.', async () => {
    //given
    const userNickname = lorem.sentence();

    jest.spyOn(userRepository, 'findUserByNickname').mockResolvedValue(new User());
    jest.spyOn(userRepository, 'isExistNickname').mockResolvedValue(false);
    jest.spyOn(devFieldRepository, 'findDevById').mockResolvedValue(undefined);
    try {
      //when
      const result = await userService.updateUserInfo(userNickname, new UserUpdateDto());
    } catch (e) {
      //then
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.message).toBe('해당되는 개발 분야를 찾을 수 없습니다.');
      expect(e.status).toBe(HttpStatus.NOT_FOUND);
    }
  });

  it('사용자의 닉네임 수정이 성공한다.', async () => {
    //given
    const originalNickname = lorem.sentence();
    const changedNickname = lorem.sentence();
    const userUpdateDto: UserUpdateDto = new UserUpdateDtoBuilder().setNickname(changedNickname).setDevField(1).build();

    jest.spyOn(userRepository, 'findUserByNickname').mockResolvedValue(new User());
    jest.spyOn(userRepository, 'isExistNickname').mockResolvedValue(false);
    jest.spyOn(devFieldRepository, 'findDevById').mockResolvedValue(new DevField());
    jest.spyOn(userRepository, 'save').mockResolvedValue(new User());

    //when
    const result: UserResponseDto = await userService.updateUserInfo(originalNickname, userUpdateDto);

    //then
    expect(result.nickname).toBe(changedNickname);
  });

  it('사용자의 개발 분야 수정이 성공한다.', async () => {
    //given
    const userNickname = lorem.sentence();

    const userUpdateDto: UserUpdateDto = new UserUpdateDtoBuilder().setNickname(userNickname).setDevField(1).build();

    const updateDevField: DevField = new DevFieldBuilder().setId(1).setName('Back-end').build();

    jest.spyOn(userRepository, 'findUserByNickname').mockResolvedValue(new User());
    jest.spyOn(userRepository, 'isExistNickname').mockResolvedValue(false);
    jest.spyOn(devFieldRepository, 'findDevById').mockResolvedValue(updateDevField);
    jest.spyOn(userRepository, 'save').mockResolvedValue(new User());

    //when
    const result = await userService.updateUserInfo(userNickname, userUpdateDto);

    //then
    expect(result.devField.id).toBe(1);
  });
});
