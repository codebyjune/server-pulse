import { Controller, Get, Query } from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private metricsService: MetricsService) {}

  @Get('system')
  async getSystemInfo() {
    return this.metricsService.getSystemInfo();
  }
  @Get('history')
  async getHistory(@Query('hours') hours?: number) {
    return this.metricsService.getHistory(hours || 1);
  }
}
