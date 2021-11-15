import { Room } from '../room.entity';

export class CreateRoomResponseDto {
  private room: Room;

  constructor(room: Room) {
    //Todo: Owner(User) password hide
    this.room = room;
  }
}
