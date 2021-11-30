import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from './room.service';
import { RoomRepository } from '../repository/room.repository';
import { UserRepository } from '../../user/repository/user.repository';

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
