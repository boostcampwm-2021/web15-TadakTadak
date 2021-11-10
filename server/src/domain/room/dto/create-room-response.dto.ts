import { Room } from '../room.entity';

export class CreateRoomResponseDto {
  appId: string;
  token: string;
  uuid: string;
  ownerId: number;
  title: string;
  description: string;
  nowHeadcount: number;
  maxHeadcount: number;
  roomType: string;

  constructor(room: Room, appID: string, token: string, uuid: string) {
    this.appId = appID;
    this.token = token;
    this.uuid = uuid;
    this.ownerId = room.owner.id;
    this.title = room.title;
    this.description = room.description;
    this.nowHeadcount = room.nowHeadcount;
    this.maxHeadcount = room.maxHeadcount;
    this.roomType = room.roomType;
  }
}
