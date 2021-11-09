import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { RoomService } from '../service/room.service';
import { Room, RoomType } from '../room.entity';
import { Pagination } from 'src/paginate';
import { CreateRoomRequestDto } from '../dto/create-room-request.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth-guard';
import { CreateRoomResponseDto } from '../dto/create-room-response.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {
  }

  @Get('tadak')
  async getBasicListAll(
    @Query('search') search: string,
    @Query('take') take: number,
    @Query('page') page: number,
  ): Promise<Pagination<Room>> {
    return await this.roomService.getRoomListAll({ search, take, page }, RoomType.TadakTadak);
  }

  @Get('camp')
  async getCampListAll(
    @Query('search') search: string,
    @Query('take') take: number,
    @Query('page') page: number,
  ): Promise<Pagination<Room>> {
    return await this.roomService.getRoomListAll({ search, take, page }, RoomType.CampFire);
  }

  @Get('live')
  async getLiveListAll(
    @Query('search') search: string,
    @Query('take') take: number,
    @Query('page') page: number,
  ): Promise<Pagination<Room>> {
    return await this.roomService.getRoomListAll({ search, take, page }, RoomType.CodingLive);
  }
}
