import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/user/user.entity';
import { HistoryRepository } from '../repository/history.repository';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryRepository)
    private readonly historyRepository: HistoryRepository,
  ) {}

  checkIn(user: User): Promise<boolean> {
    return this.historyRepository.addHistory(user);
  }
}
