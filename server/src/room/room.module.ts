import { Module } from '@nestjs/common';
import { RoomService } from './service/room.service';
import { RoomController } from './controller/room.controller';

@Module({
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
