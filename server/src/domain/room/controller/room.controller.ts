import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { RoomService } from '../service/room.service';
import { Pagination } from 'src/paginate';
import { CreateRoomRequestDto } from '../dto/create-room-request.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth-guard';
import { CreateRoomResponseDto } from '../dto/create-room-response.dto';
import { Request } from 'express';
import { Type } from 'class-transformer';

@Controller('room')
export class RoomController {

  async getRoomListByType(
    @Query('type') type: RoomType,
    @Query('search') search: string,
    @Query('take') take: number,
    @Query('page') page: number,
  ): Promise<{ result: Pagination<Room> }> {
    return { result: await this.roomService.getRoomListAll({ search, take, page }, type) };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createRoom(@Body() createRoomRequestDto: CreateRoomRequestDto): Promise<{ result: CreateRoomResponseDto }> {
    return { result: await this.roomService.createRoom(createRoomRequestDto) };
  }

  @Delete(':roomId')
  deleteRoom(@Param('roomId') id): number {
    return 0;
  }
}
