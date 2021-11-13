import { Module } from '@nestjs/common';
import { AuthModule } from 'src/domain/auth/auth.module';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [AuthModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
