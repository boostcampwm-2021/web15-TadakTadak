import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserException, DevFieldException } from '../../../exception';
import { HistoryRepository } from '../repository/history.repository';
import { User } from 'src/domain/user/user.entity';
import { History } from 'src/domain/history/history.entity';
import { HistoryBuilder } from 'src/builder/history.builder';
import { LocalDate } from 'js-joda';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryRepository)
    private readonly historyRepository: HistoryRepository,
  ) {}

  checkIn(user: User): void {
    const history: History = new HistoryBuilder().setCheckIn(LocalDate.now()).setUser(user).build();
    this.historyRepository.save(history);
  }
}
