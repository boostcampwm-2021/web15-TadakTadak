import { Controller, Delete, Get, Post } from '@nestjs/common';
import { RoomService } from '../service/room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {
  }

  @Get('tadak')
  getTDTDListAll(): void {
    return;
  }

  @Get('camp')
  getCampListAll(): void {
    return;
  }

  @Get('live')
  getLiveListAll(): void {
    return;
  }

  @Post()
  createRoom(): void {
    return;
  }

  @Delete()
  deleteRoom(): void {
    return;
  }
}
