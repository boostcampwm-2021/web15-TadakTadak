import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from './room.service';
import { RoomRepository } from '../repository/room.repository';
import { UserRepository } from '../../user/repository/user.repository';
import { RoomBuilder, UserBuilder } from '../../../builder';
import { datatype, internet, lorem } from 'faker';
import { RoomType } from '../room.entity';
import { DevFieldBuilder } from '../../../builder/dev-field.builder';
import { RoomResponseDto } from '../dto/room-response.dto';
import { RoomException } from '../../../exception';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateResult } from 'typeorm';

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

  it('should be defined', () => {
    // expect(roomService).toBeDefined();
  });
});
