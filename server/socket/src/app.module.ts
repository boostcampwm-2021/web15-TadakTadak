import { Module } from '@nestjs/common';
import { RoomGateway } from './gateway/room.gateway';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [RoomGateway],
})
export class AppModule {}
