import { Module } from '@nestjs/common';
import { RoomGateway } from './room.gateway';
import { RoomService } from './room.service';

@Module({
  imports: [],
  controllers: [],
  providers: [RoomGateway, RoomService],
})
export class RoomModule {}
