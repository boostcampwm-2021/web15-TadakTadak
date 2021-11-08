import { Module } from '@nestjs/common';
import { RoomService } from './service/room.service';
import { RoomController } from './controller/room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
