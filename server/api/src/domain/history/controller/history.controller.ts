import { Controller, Get } from '@nestjs/common';
import { HistoryService } from '../service/history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  async getUserInfo() {
    return { result: await this.historyService.getLastVisitCount() };
  }
}
