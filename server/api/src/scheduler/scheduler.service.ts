import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from 'src/domain/auth/auth.repository';
import { VisitRepository } from 'src/domain/history/repository/visit.repository';

@Injectable()
export class SchedulerService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    @InjectRepository(VisitRepository)
    private readonly visitRepository: VisitRepository,
  ) {}
  @Cron('0 0 * * *')
  async handleCron() {
    const count = await this.authRepository.getLastVisitCount();
    this.visitRepository.addVisitCount(count);
  }
}
