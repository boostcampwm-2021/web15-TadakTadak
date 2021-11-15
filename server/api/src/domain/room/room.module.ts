import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from './controller/room.controller';
import { RoomService } from './service/room.service';
import { RoomRepository } from './repository/room.repository';
import { UserRepository } from '../user/repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoomRepository, UserRepository])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
