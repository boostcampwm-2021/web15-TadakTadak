import { Module } from '@nestjs/common';
import { RoomGateway } from './gateway/room.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [RoomGateway],
})
export class AppModule {}
