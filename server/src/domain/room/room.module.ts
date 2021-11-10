import { Module } from '@nestjs/common';
import { RoomService } from './service/room.service';
import { RoomController } from './controller/room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomRepository } from './repository/room.repository';
import { UserRepository } from '../user/repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoomRepository, UserRepository])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
