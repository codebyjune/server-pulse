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
    setInterval(() => {
      this.metricsService
        .getMetrics()
        .then((data) => {
          this.server.emit('metrics', data);
        })
        .catch(console.error);
    }, 2000);

    // 每10秒存一次数据库
    setInterval(() => {
      this.metricsService.collectAndSave().catch(console.error);
    }, 10000);
  }
}
