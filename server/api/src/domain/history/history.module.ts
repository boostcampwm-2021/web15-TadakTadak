import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryController } from './controller/history.controller';
import { HistoryService } from './service/history.service';
import { AuthRepository } from '../auth/auth.repository';
import { HistoryRepository } from './repository/history.repository';
import { VisitRepository } from './repository/visit.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryRepository, AuthRepository, VisitRepository])],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
