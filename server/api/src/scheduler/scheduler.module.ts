import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulerService } from './scheduler.service';
import { UserRepository } from '../domain/user/repository/user.repository';
import { VisitRepository } from '../domain/history/repository/visit.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, VisitRepository])],
  providers: [SchedulerService],
})
export class SchedulerModule {}
