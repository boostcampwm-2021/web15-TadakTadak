import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserException } from '../../../exception/index';
import { User } from '../../user/user.entity';
import { UserRepository } from '../../user/repository/user.repository';
import { HistoryRepository } from '../repository/history.repository';
import { VisitRepository } from '../repository/visit.repository';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryRepository)
    private readonly historyRepository: HistoryRepository,
    @InjectRepository(VisitRepository)
    private readonly visitRepository: VisitRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  checkIn(user: User): Promise<boolean> {
    return this.historyRepository.addHistory(user);
  }

  async getHistory(nickname: string) {
    const user: User = await this.userRepository.findUserByNickname(nickname);
    if (!user) throw UserException.userNotFound();
    return await this.historyRepository.getHistoryByNickname(user);
  }

  async getLastVisitCount() {
    const visitCount = await this.visitRepository.getVisitCount();
    return visitCount.totalVisit ?? 0;
  }
}
