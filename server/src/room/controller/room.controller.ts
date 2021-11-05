import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { RoomService } from '../service/room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {
  }

  @Get('tadak')
  getTDTDListAll(@Query('page') page: number, @Query('search') search: string): void {
    return;
  }

  @Get('camp')
  getCampListAll(@Query('page') page: number, @Query('search') search: string): void {
    return;
  }

  @Get('live')
  getLiveListAll(@Query('page') page: number, @Query('search') search: string): void {
    return;
  }

  @Post()
  createRoom(): void {
    return;
  }

  @Delete('/:roomId')
  deleteRoom(@Param('roomId') id): void {
    return;
  }
}
