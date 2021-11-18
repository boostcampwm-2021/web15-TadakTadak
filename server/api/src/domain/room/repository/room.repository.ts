import { DeleteResult, EntityRepository, Like, Repository } from 'typeorm';
import { PaginationOptions } from '../../../paginate';
import { Room, RoomType } from '../room.entity';

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {
  async findByKeywordAndCount(options: PaginationOptions, roomType: RoomType): Promise<[Room[], number]> {
    const { search, take, page } = options;
    return this.findAndCount({
      where: { title: Like('%' + search + '%'), roomType: roomType },
      order: { nowHeadcount: 'DESC' },
      take: take,
      skip: take * (page - 1),
    });
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
}
