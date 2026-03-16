import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsGateway } from './metrics.gateway';
import { MetricsController } from './metrics.controller';

@Module({
  controllers: [MetricsController],
  providers: [MetricsService, MetricsGateway],
})
export class MetricsModule {}
