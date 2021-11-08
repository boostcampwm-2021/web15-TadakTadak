import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { RoomService } from '../service/room.service';
import { Room, RoomType } from '../room.entity';
import { Pagination } from 'src/paginate';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('tadak')
  getBasicListAll(
    @Query('search') search: string,
    @Query('take') take: number,
    @Query('page') page: number,
  ): Promise<Pagination<Room>> {
    return this.roomService.getRoomListAll({ search, take, page }, RoomType.TadakTadak);
  }

  @Get('camp')
  getCampListAll(
    @Query('search') search: string,
    @Query('take') take: number,
    @Query('page') page: number,
  ): Promise<Pagination<Room>> {
    return this.roomService.getRoomListAll({ search, take, page }, RoomType.CampFire);
  }

  @Get('live')
  getLiveListAll(
    @Query('search') search: string,
    @Query('take') take: number,
    @Query('page') page: number,
  ): Promise<Pagination<Room>> {
    return this.roomService.getRoomListAll({ search, take, page }, RoomType.CodingLive);
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
