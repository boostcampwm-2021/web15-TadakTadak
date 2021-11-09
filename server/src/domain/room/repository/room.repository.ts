import { EntityRepository, Like, Repository } from 'typeorm';
import { Room, RoomType } from '../room.entity';
import { PaginationOptions } from '../../../paginate';

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {
  async findByKeywordAndCount(options: PaginationOptions, roomType: RoomType): Promise<[Room[], number]> {
    const { search, take, page } = options;
    return this.findAndCount({
      where: { title: Like('%' + search + '%'), roomType: roomType },
      order: { title: 'DESC' },
      take: take,
      skip: take * (page - 1),
    });
  }

  async createRoom(room: Room) {
    return this.save(room);
  }
}
