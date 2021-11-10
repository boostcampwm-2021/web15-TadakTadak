import { BuilderCommon } from './builder';
import { User } from '../domain/user/user.entity';
import { Room, RoomType } from '../domain/room/room.entity';

export class RoomBuilder extends BuilderCommon<Room> {
  constructor() {
    super(Room);
  }

  setUUID(uuid: string): RoomBuilder {
    this.object.uuid = uuid;
    return this;
  }

  setAgoraAppID(agoraAppId: string): RoomBuilder {
    this.object.agoraAppId = agoraAppId;
    return this;
  }

  setAgoraToken(agoraToken: string): RoomBuilder {
    this.object.agoraToken = agoraToken;
    return this;
  }

  setTitle(title: string): RoomBuilder {
    this.object.title = title;
    return this;
  }

  setDescription(description: string): RoomBuilder {
    this.object.description = description;
    return this;
  }

  setMaxHeadcount(maxHeadcount: number): RoomBuilder {
    this.object.maxHeadcount = maxHeadcount;
    return this;
  }

  setNowHeadcount(nowHeadcount: number): RoomBuilder {
    this.object.nowHeadcount = nowHeadcount;
    return this;
  }

  setOwner(owner: User): RoomBuilder {
    this.object.owner = owner;
    return this;
  }

  setRoomType(roomType: RoomType): RoomBuilder {
    this.object.roomType = roomType;
    return this;
  }
}
