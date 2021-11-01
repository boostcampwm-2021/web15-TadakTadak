import { Module } from '@nestjs/common';
import { RoomService } from './room.service';

@Module({
  providers: [RoomService]
})
export class RoomModule {}
