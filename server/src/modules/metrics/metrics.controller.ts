import { Controller, Get } from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private metricsService: MetricsService) {}

  @Get('system')
  async getSystemInfo() {
    return this.metricsService.getSystemInfo();
  }
}
