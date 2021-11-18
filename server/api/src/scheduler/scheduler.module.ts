import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulerService } from './scheduler.service';
import { UserRepository } from 'src/domain/user/repository/user.repository';
import { VisitRepository } from 'src/domain/history/repository/visit.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, VisitRepository])],
  providers: [SchedulerService],
})
export class SchedulerModule {}
