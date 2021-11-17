import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulerService } from './scheduler.service';
import { AuthRepository } from 'src/domain/auth/auth.repository';
import { VisitRepository } from 'src/domain/history/repository/visit.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuthRepository, VisitRepository])],
  providers: [SchedulerService],
})
export class SchedulerModule {}
