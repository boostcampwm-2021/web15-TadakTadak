import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryRepository } from './repository/history.repository';
import { HistoryService } from './service/history.service';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryRepository])],
  providers: [HistoryService],
})
export class HistoryModule {}
