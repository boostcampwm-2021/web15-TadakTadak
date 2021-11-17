import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserException } from 'src/exception';
import { User } from 'src/domain/user/user.entity';
import { AuthRepository } from 'src/domain/auth/auth.repository';
import { HistoryRepository } from '../repository/history.repository';
import { VisitRepository } from '../repository/visit.repository';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryRepository)
    private readonly historyRepository: HistoryRepository,
    @InjectRepository(VisitRepository)
    private readonly visitRepository: VisitRepository,
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
  ) {}

  checkIn(user: User): Promise<boolean> {
    return this.historyRepository.addHistory(user);
  }

  async getHistory(nickname: string) {
    const user: User = await this.authRepository.findUserByNickname(nickname);
    if (!user) throw UserException.userNotFound();
    return await this.historyRepository.getHistoryByNickname(user);
  }

  async getLastVisitCount() {
    const visitCount = await this.visitRepository.getVisitCount();
    return visitCount ? visitCount.totalVisit : 0;
  }
}
