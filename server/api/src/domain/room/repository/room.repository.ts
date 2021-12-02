import { DeleteResult, EntityRepository, Repository, UpdateResult } from 'typeorm';
import { PaginationOptions } from '../../../paginate';
import { Room, RoomType } from '../room.entity';

export enum RoomProcessOption {
  Join = '+ 1',
  Leave = '- 1',
}

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {
  async findByKeywordAndCount(options: PaginationOptions, roomType: RoomType): Promise<[Room[], number]> {
    const { search, take, page } = options;
    return this.createQueryBuilder('room')
      .leftJoinAndSelect('room.owner', 'user')
      .leftJoinAndSelect('user.devField', 'devField')
      .where('title like :search', { search: `%${search}%` })
      .andWhere('room_type = :roomType', { roomType })
      .take(take)
      .skip(take * (page - 1))
      .getManyAndCount();
  }

  async createRoom(room: Room) {
    return this.save(room);
  }

  async findRoomByUUID(uuid: string): Promise<Room | undefined> {
    return this.createQueryBuilder('room')
      .leftJoinAndSelect('room.owner', 'user')
      .where('room.uuid = :uuid', { uuid })
      .getOne();
  }

  async roomProcess(uuid: string, option: RoomProcessOption): Promise<UpdateResult> {
    return await this.createQueryBuilder()
      .update(Room)
      .set({
        nowHeadcount: () => `now_headcount ${option}`,
      })
      .where('uuid = :uuid', { uuid })
      .execute();
  }

  async findRoomByUserEmail(email: string): Promise<Room | undefined> {
    return this.createQueryBuilder('room')
      .leftJoinAndSelect('room.owner', 'user')
      .where('user.email = :email', { email: email })
      .getOne();
  }

  async findRoomByUserEmailAndUUID(email: string, uuid: string): Promise<Room | undefined> {
    return this.createQueryBuilder('room')
      .leftJoinAndSelect('room.owner', 'user')
      .where('user.email = :email', { email: email })
      .where('uuid = :uuid', { uuid: uuid })
      .getOne();
  }

  async deleteRoomByRoomID(roomID: number): Promise<DeleteResult> {
    return this.delete({ id: roomID });
  }

  async deleteRoomByUUID(uuid: string): Promise<DeleteResult> {
    return this.delete({ uuid: uuid });
  }
}
