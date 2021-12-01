import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../domain/user/repository/user.repository';
import { VisitRepository } from '../domain/history/repository/visit.repository';

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
    await this.visitRepository.addVisitCount(count);
  }
}
