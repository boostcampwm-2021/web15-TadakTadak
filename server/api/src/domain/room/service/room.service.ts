import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { RtcRole, RtcTokenBuilder } from 'agora-access-token';
import { RoomBuilder, UserBuilder } from '../../../builder';
import { RoomException, UserException } from '../../../exception';
import { Pagination, PaginationOptions } from '../../../paginate';
import { Connection, DeleteResult } from 'typeorm';
import { Room, RoomType } from '../room.entity';
import { RoomProcessOption, RoomRepository } from '../repository/room.repository';
import { UserRepository } from '../../user/repository/user.repository';
import { CreateRoomRequestDto } from '../dto/create-room-request.dto';
import { RoomResponseDto } from '../dto/room-response.dto';

@Injectable()
export class RoomService {
  constructor(
    private connection: Connection,
    @InjectRepository(RoomRepository)
    private readonly roomRepository: RoomRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
  }

  async getRoomByUUID(uuid: string): Promise<RoomResponseDto> {
    const findRoom = await this.roomRepository.findRoomByUUID(uuid);
    if (!findRoom) throw RoomException.roomNotFound();
    return new RoomResponseDto(findRoom);
  }

  async joinRoom(uuid: string): Promise<boolean> {
    const findRoom = await this.roomRepository.findRoomByUUID(uuid);
    if (!findRoom) throw RoomException.roomNotFound();
    if (findRoom.nowHeadcount === findRoom.maxHeadcount) throw RoomException.roomFullError();
    const updateResult = await this.roomRepository.roomProcess(uuid, RoomProcessOption.Join);
    if (!updateResult) throw RoomException.roomJoinError();
    return true;
  }

  async leaveRoom(uuid: string): Promise<boolean> {
    const findRoom = await this.roomRepository.findRoomByUUID(uuid);
    if (!findRoom) throw RoomException.roomNotFound();
    if (findRoom.nowHeadcount < 1) throw RoomException.roomLeaveError();
    const updateResult = await this.roomRepository.roomProcess(uuid, RoomProcessOption.Leave);
    if (!updateResult) throw RoomException.roomLeaveError();
    return true;
  }

  async getRoomListAll(options: PaginationOptions, roomType: RoomType): Promise<Pagination<RoomResponseDto>> {
    const [results, total] = await this.roomRepository.findByKeywordAndCount(options, roomType);
    const newResult = results.map((room) => new RoomResponseDto(room));
    return new Pagination<RoomResponseDto>({
      results: newResult,
      total,
    });
  }

  async createRoom(createRoomRequestDto: CreateRoomRequestDto, email: string): Promise<RoomResponseDto> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    const { title, description, maxHeadcount, roomType } = createRoomRequestDto;
    const uuid = uuidv4();
    const user = await this.userRepository.findUserByUserEmail(email);
    if (!user) throw UserException.userNotFound();
    const agoraAppID: string = process.env.AGORA_APP_ID ?? '';
    const agoraToken = this.createTokenWithChannel(agoraAppID, uuid);
    const existRoom = await this.roomRepository.findRoomByUserEmail(user.email);
    if (existRoom) throw RoomException.roomExistError();
    const newRoom = new RoomBuilder()
      .setTitle(title)
      .setDescription(description)
      .setNowHeadcount(1)
      .setMaxHeadcount(maxHeadcount)
      .setRoomType(roomType)
      .setUUID(uuid)
      .setAgoraAppID(agoraAppID)
      .setAgoraToken(agoraToken)
      .setOwner(user)
      .build();

    try {
      await queryRunner.startTransaction();
      await this.roomRepository.createRoom(newRoom);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw RoomException.roomCreateError();
    } finally {
      await queryRunner.release();
    }
    return new RoomResponseDto(newRoom);
  }

  async deleteRoom(email: string, uuid: string): Promise<boolean> {
    const user = await this.userRepository.findUserByUserEmail(email);
    if (!user) throw UserException.userNotFound();
    const findRoom = await this.roomRepository.findRoomByUserEmailAndUUID(email, uuid);
    if (!findRoom) throw RoomException.roomNotFound();
    if (user.id != findRoom.owner.id) throw UserException.userUnauthorized();
    const deleteResult: DeleteResult = await this.roomRepository.deleteRoomByRoomID(findRoom.id);
    if (!deleteResult) throw RoomException.roomDeleteError();
    return true;
  }

  createTokenWithChannel(appID: string, uuid: string): string {
    const HOUR_TO_SECOND = 3600;
    const appCertificate: string = process.env.AGORA_APP_CERTIFICATE ?? '';
    const expirationTimeInSeconds = HOUR_TO_SECOND * 24;
    const role = RtcRole.PUBLISHER;
    const channel = uuid;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;
    return RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, 0, role, expirationTimestamp);
  }
}
