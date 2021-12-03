import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalDate } from 'js-joda';
import { UserException } from '../../../exception';
import { User } from '../../user/user.entity';
import { UserRepository } from '../../user/repository/user.repository';
import { HistoryRepository } from '../repository/history.repository';
import { VisitRepository } from '../repository/visit.repository';
import { HistoryResponseDto } from '../dto/history-response.dto';

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

  async getYearHistory(email: string) {
    const user: User = await this.userRepository.findUserByUserEmail(email);
    if (!user) throw UserException.userNotFound();
    const year = LocalDate.now().year();
    return await this.historyRepository.getYearHistoryByUser(user, year);
  }

  async getMonthHistory(email: string) {
    const user: User = await this.userRepository.findUserByUserEmail(email);
    if (!user) throw UserException.userNotFound();
    const year = LocalDate.now().year();
    return new HistoryResponseDto(await this.historyRepository.getMonthHistoryByUser(user, year));
  }

  async getLastVisitCount() {
    const visitCount = await this.visitRepository.getVisitCount();
    if (visitCount) return visitCount.totalVisit;
    return 0;
  }
}
