import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from 'src/domain/auth/auth.repository';

@Injectable()
export class SchedulerService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
  ) {}
  @Cron('0 0 * * *')
  handleCron() {
    this.authRepository.updateCheckIn();
  }
}
