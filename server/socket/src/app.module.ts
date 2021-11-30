import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoomModule } from './gateway/room.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RoomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
