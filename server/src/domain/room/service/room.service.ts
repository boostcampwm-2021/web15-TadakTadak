import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room, RoomType } from '../room.entity';
import { Pagination, PaginationOptions } from '../../../paginate';
import { CreateRoomRequestDto } from '../dto/create-room-request.dto';
import { RtcRole, RtcTokenBuilder } from 'agora-access-token';
import { v4 as uuidv4 } from 'uuid';
import { RoomRepository } from '../repository/room.repository';
import { UserRepository } from '../../user/repository/user.repository';
import { CreateRoomResponseDto } from '../dto/create-room-response.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomRepository)
    private readonly roomRepository: RoomRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
  }

  async getRoomListAll(options: PaginationOptions, roomType: RoomType): Promise<Pagination<Room>> {
    const [results, total] = await this.roomRepository.findByKeywordAndCount(options, roomType);
    return new Pagination<Room>({
      results,
      total,
    });
  }

  async createRoom(createRoomRequestDto: CreateRoomRequestDto): Promise<CreateRoomResponseDto> {
    const { userId } = createRoomRequestDto;
    const uuid = uuidv4();
    const appID = process.env.AGORA_APP_ID;
    const token = this.createTokenWithChannel(userId, appID, uuid);
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: '사용자를 찾을 수 없습니다.',
      });
    }
    const newRoom = Room.builder(createRoomRequestDto);
    newRoom.setUUID(uuidv4().toString());
    newRoom.setAgoraAppId(appID);
    newRoom.setAgoraToken(token);
    newRoom.setOwner(user);
    newRoom.setNowHeadcount(1);
    const result = await this.roomRepository.createRoom(newRoom);
    if (!result) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '방 생성중 오류가 발생했습니다.',
      });
    }
    return new CreateRoomResponseDto(newRoom, appID, token, uuid);
  }

  createTokenWithChannel(userId: number, appID: string, uuid: string): string {
    const HOUR_TO_SECOND = 3600;
    const appCertificate = process.env.AGORA_APP_CERTIFICATE;
    const expirationTimeInSeconds = HOUR_TO_SECOND * 24;
    const role = RtcRole.PUBLISHER;
    const channel = uuid;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;
    return RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, userId, role, expirationTimestamp);
  }
}
