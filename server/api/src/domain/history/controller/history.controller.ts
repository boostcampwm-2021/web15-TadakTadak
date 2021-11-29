import { Controller, Get } from '@nestjs/common';
import { HistoryService } from 'src/domain/history/service/history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  async getUserInfo() {
    return { result: await this.historyService.getLastVisitCount() };
  }
}
