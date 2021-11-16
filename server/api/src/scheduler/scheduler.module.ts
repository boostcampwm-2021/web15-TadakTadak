import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulerService } from './scheduler.service';
import { AuthRepository } from 'src/domain/auth/auth.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuthRepository])],
  providers: [SchedulerService],
})
export class SchedulerModule {}
