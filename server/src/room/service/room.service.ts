import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room, RoomType } from '../room.entity';
import { Like, Repository } from 'typeorm';
import { Pagination, PaginationOptions } from '../../paginate';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async getRoomListAll(options: PaginationOptions, roomType: RoomType): Promise<Pagination<Room>> {
    const { search, take, page } = options;
    const [results, total] = await this.roomRepository.findAndCount({
      where: { title: Like('%' + search + '%'), roomType: roomType },
      order: { title: 'DESC' },
      take: take,
      skip: take * (page - 1),
    });
    return new Pagination<Room>({
      results,
      total,
    });
  }
}
