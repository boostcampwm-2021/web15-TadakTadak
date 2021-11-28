import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { RoomAPIDocs } from '../room.docs';
import { Pagination } from 'src/paginate';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth-guard';
import { RoomType} from '../room.entity';
import { RoomService } from '../service/room.service';
import { CreateRoomRequestDto } from '../dto/create-room-request.dto';
import { RoomResponseDto } from '../dto/room-response.dto';

@ApiTags('Room API / 방 API')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  @ApiOperation(RoomAPIDocs.getRoomListByTypeOperation())
  @ApiQuery(RoomAPIDocs.getRoomListByTypeQueryType())
  @ApiQuery(RoomAPIDocs.getRoomListByTypeQuerySearch())
  @ApiQuery(RoomAPIDocs.getRoomListByTypeQueryTake())
  @ApiQuery(RoomAPIDocs.getRoomListByTypeQueryPage())
  async getRoomListByType(
    @Query('type') type: RoomType,
    @Query('search') search: string,
    @Query('take') take: number,
    @Query('page') page: number,
  ): Promise<{ result: Pagination<RoomResponseDto> }> {
    return { result: await this.roomService.getRoomListAll({ search, take, page }, type) };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createRoom(
    @Req() req: Request,
    @Body() createRoomRequestDto: CreateRoomRequestDto,
  ): Promise<{ result: RoomResponseDto }> {
    const userEmail = req.user['email'];
    return { result: await this.roomService.createRoom(createRoomRequestDto, userEmail) };
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'UUID로 방 조회', description: '방의 고유 UUID로 정보를 조회합니다.' })
  @ApiParam(RoomAPIDocs.getRoomByUUIDParamUUID())
  async getRoomByUUID(@Param('uuid') uuid: string): Promise<{ result: RoomResponseDto }> {
    return { result: await this.roomService.getRoomByUUID(uuid) };
  }

  @Post(':uuid/join')
  @UseGuards(JwtAuthGuard)
  async joinRoom(@Param('uuid') uuid: string): Promise<{ result: boolean }> {
    return { result: await this.roomService.joinRoom(uuid) };
  }

  @Post(':uuid/leave')
  @UseGuards(JwtAuthGuard)
  async leaveRoom(@Param('uuid') uuid: string): Promise<{ result: boolean }> {
    return { result: await this.roomService.leaveRoom(uuid) };
  }

  @Delete(':uuid')
  @UseGuards(JwtAuthGuard)
  async deleteRoom(@Req() req: Request, @Param('uuid') uuid: string): Promise<{ result: boolean }> {
    const userEmail = req.user['email'];
    return { result: await this.roomService.deleteRoomByEmail(userEmail, uuid) };
  }
  }
}
