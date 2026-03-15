import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsGateway } from './metrics.gateway';

@Module({
  providers: [MetricsService, MetricsGateway],
})
export class MetricsModule {}
