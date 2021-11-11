import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryRepository } from './repository/history.repository';
@Module({
  imports: [TypeOrmModule.forFeature([HistoryRepository])],
})
export class HistoryModule {}
