import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryService } from './service/history.service';
import { HistoryRepository } from './repository/history.repository';
import { AuthRepository } from '../auth/auth.repository';
import { VisitRepository } from './repository/visit.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryRepository, AuthRepository, VisitRepository])],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
