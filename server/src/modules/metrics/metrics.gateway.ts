import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MetricsService } from './metrics.service';
import { Injectable, OnModuleInit } from '@nestjs/common';

@WebSocketGateway({ cors: true })
@Injectable()
export class MetricsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private metricsService: MetricsService) {}

  onModuleInit() {
    // 每2秒推送一次数据
    setInterval(async () => {
      const data = await this.metricsService.getMetrics();
      this.server.emit('metrics', data);
    }, 2000);
  }
}
