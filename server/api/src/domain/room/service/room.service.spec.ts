import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from './room.service';
import { RoomRepository } from '../repository/room.repository';
import { UserRepository } from '../../user/repository/user.repository';
import { lorem } from 'faker';
import { RoomResponseDto } from '../dto/room-response.dto';
import { RoomException } from '../../../exception';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { mockRoom } from '../../../../test/mock.object';

describe('RoomService', () => {
  let roomService: RoomService;
  let roomRepository: RoomRepository;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomService, RoomRepository, UserRepository],
    }).compile();

    roomService = module.get<RoomService>(RoomService);
    roomRepository = module.get<RoomRepository>(RoomRepository);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('[getRoomByUUID] UUID로 방의 정보를 조회할 수 있다.', async () => {
    jest.spyOn(roomRepository, 'findRoomByUUID').mockResolvedValue(mockRoom);
    const result = await roomService.getRoomByUUID(lorem.sentence());
    expect(result).toStrictEqual(new RoomResponseDto(mockRoom));
  });

  });
});
