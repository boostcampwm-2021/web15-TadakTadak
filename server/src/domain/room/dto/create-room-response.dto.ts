import { Room } from '../room.entity';

export class CreateRoomResponseDto {
  constructor(room: Room, appID: string, token: string) {
    this.appId = appID;
    this.token = token;
    this.ownerId = room.owner.id;
    this.title = room.title;
    this.maxHeadcount = room.maxHeadcount;
    this.roomType = room.roomType;
  }

  appId: string;
  token: string;
  ownerId: number;
  title: string;
  maxHeadcount: number;
  roomType: string;
}
