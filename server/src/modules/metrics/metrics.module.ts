import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricsService } from './metrics.service';
import { MetricsGateway } from './metrics.gateway';
import { MetricsController } from './metrics.controller';
import { Metrics } from './entities/metric.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Metrics])],
  controllers: [MetricsController],
  providers: [MetricsService, MetricsGateway],
})
export class MetricsModule { }
