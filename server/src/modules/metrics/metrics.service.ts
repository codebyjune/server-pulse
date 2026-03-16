import { Injectable } from '@nestjs/common';
import * as si from 'systeminformation';

@Injectable()
export class MetricsService {
  async getMetrics() {
    const [cpu, mem, disk, network] = await Promise.all([
      si.currentLoad(), // CPU
      si.mem(), // 内存
      si.fsSize(), // 磁盘
      si.networkStats(), // 网络
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

async getSystemInfo() {
  const [osInfo, cpuInfo, time] = await Promise.all([
    si.osInfo(),       // 系统信息
    si.cpu(),          // CPU 信息
    si.time(),         // 运行时间
  ]);

  return {
    hostname: osInfo.hostname,
    platform: osInfo.platform,
    distro: osInfo.distro,
    release: osInfo.release,
    cpuModel: cpuInfo.brand,
    cpuCores: cpuInfo.cores,
    uptime: time.uptime,  // 秒
  };
}

}
