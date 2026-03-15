import { Injectable } from '@nestjs/common';
import * as si from 'systeminformation';

@Injectable()
export class MetricsService {
  async getMetrics() {
    const [cpu, mem, disk, network] = await Promise.all([
      si.currentLoad(),      // CPU
      si.mem(),              // 内存
      si.fsSize(),           // 磁盘
      si.networkStats(),     // 网络
    ]);

    return {
      cpu: cpu.currentLoad,
      memory: {
        used: mem.used,
        total: mem.total,
        percent: (mem.used / mem.total) * 100,
      },
      disk: disk[0]?.use || 0,
      network: {
        rx: network[0]?.rx_sec || 0,
        tx: network[0]?.tx_sec || 0,
      },
      timestamp: Date.now(),
    };
  }
}
