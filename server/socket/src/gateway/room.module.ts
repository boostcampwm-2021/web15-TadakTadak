import { Module } from '@nestjs/common';
import { RoomGateway } from './room.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [RoomGateway],
})
export class RoomModule {}
