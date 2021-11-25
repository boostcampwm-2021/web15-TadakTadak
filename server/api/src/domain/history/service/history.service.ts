import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalDate } from 'js-joda';
import { UserException } from '../../../exception/index';
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
    return await this.historyRepository.getHistoryByNickname(user);
  }

  async getMonthHistory(email: string) {
    const user: User = await this.userRepository.findUserByUserEmail(email);
    if (!user) throw UserException.userNotFound();
    const today = LocalDate.now().year();
    const result: HistoryResponseDto = new HistoryResponseDto(
      await this.historyRepository.getMonthByNickname(user, today),
    );
    return result;
  }

  async getLastVisitCount() {
    const visitCount = await this.visitRepository.getVisitCount();
    return visitCount.totalVisit ?? 0;
  }
}
