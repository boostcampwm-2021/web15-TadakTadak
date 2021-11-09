import { Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { RoomService } from '../service/room.service';
import { Room, RoomType } from '../room.entity';
import { Pagination } from 'src/paginate';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth-guard';

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
  @UseGuards(JwtAuthGuard)
  createRoom(): void {
    return;
  }

  @Delete('/:roomId')
  @UseGuards(JwtAuthGuard)
  deleteRoom(@Param('roomId') id): void {
    return;
  }
}
