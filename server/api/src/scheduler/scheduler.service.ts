import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/domain/user/repository/user.repository';
import { VisitRepository } from 'src/domain/history/repository/visit.repository';

@Injectable()
export class SchedulerService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(VisitRepository)
    private readonly visitRepository: VisitRepository,
  ) {}
  @Cron('0 0 * * *')
  async handleCron() {
    const count = await this.userRepository.getLastVisitCount();
    this.visitRepository.addVisitCount(count);
  }
}
