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

  it('[getRoomByUUID] 잘못된 UUID를 요정하면 조회가 불가능하다.', async () => {
    jest.spyOn(roomRepository, 'findRoomByUUID').mockResolvedValue(undefined);
    try {
      await roomService.getRoomByUUID(lorem.sentence());
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.message).toBe(RoomException.roomNotFound().message);
    }
  });

  it('[joinRoom] UUID로 방에 접속할 수 있다.', async () => {
    jest.spyOn(roomRepository, 'findRoomByUUID').mockResolvedValue(mockRoom);
    jest.spyOn(roomRepository, 'roomProcess').mockResolvedValue(new UpdateResult());
    const result = await roomService.joinRoom(lorem.sentence());
    expect(result).toBe(true);
  });

  it('[joinRoom] 잘못된 UUID를 요청하면 방에 접속이 불가능하다.', async () => {
    jest.spyOn(roomRepository, 'findRoomByUUID').mockResolvedValue(undefined);
    jest.spyOn(roomRepository, 'roomProcess').mockResolvedValue(new UpdateResult());
    try {
      await roomService.joinRoom(lorem.sentence());
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.message).toBe(RoomException.roomNotFound().message);
    }
  });

  it('[joinRoom] 현재 방의 이용자가 최대 이용자면 접속이 불가능하다.', async () => {
    const fullRoomMock = { ...mockRoom };
    fullRoomMock.nowHeadcount = 9;
    fullRoomMock.maxHeadcount = 9;
    jest.spyOn(roomRepository, 'findRoomByUUID').mockResolvedValue(fullRoomMock);
    try {
      await roomService.joinRoom(lorem.sentence());
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
      expect(e.message).toBe(RoomException.roomFullError().message);
    }
  });

  it('[leaveRoom] UUID로 방에 퇴장할 수 있다.', async () => {
    jest.spyOn(roomRepository, 'findRoomByUUID').mockResolvedValue(mockRoom);
    jest.spyOn(roomRepository, 'roomProcess').mockResolvedValue(new UpdateResult());
    const result = await roomService.leaveRoom(lorem.sentence());
    expect(result).toBe(true);
  });

  it('[leaveRoom] 잘못된 UUID를 요청하면 방에 퇴장이 불가능하다.', async () => {
    jest.spyOn(roomRepository, 'findRoomByUUID').mockResolvedValue(undefined);
    jest.spyOn(roomRepository, 'roomProcess').mockResolvedValue(new UpdateResult());
    try {
      await roomService.leaveRoom(lorem.sentence());
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.message).toBe(RoomException.roomNotFound().message);
    }
  });

  it('[leaveRoom] 현재 방의 이용자가 최소 이용자면 퇴장이 불가능하다.', async () => {
    const fullRoomMock = { ...mockRoom };
    fullRoomMock.nowHeadcount = 0;
    jest.spyOn(roomRepository, 'findRoomByUUID').mockResolvedValue(fullRoomMock);
    try {
      await roomService.leaveRoom(lorem.sentence());
    } catch (e) {
      expect(e).toBeInstanceOf(InternalServerErrorException);
      expect(e.message).toBe(RoomException.roomLeaveError().message);
    }
  });
});
