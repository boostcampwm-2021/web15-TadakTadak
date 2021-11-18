import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth-guard';
import { HistoryService } from 'src/domain/history/service/history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserInfo() {
    return { result: await this.historyService.getLastVisitCount() };
  }
}
