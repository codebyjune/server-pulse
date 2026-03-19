import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as si from 'systeminformation';
import { Metrics } from './entities/metric.entity';
import { Repository } from 'typeorm';
@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(Metrics)
    private metricRepo: Repository<Metrics>,
  ) {}

  // 私有方法：采集原始数据
  private async collect() {
    const [cpu, mem, disk, network] = await Promise.all([
      si.currentLoad(),
      si.mem(),
      si.fsSize(),
      si.networkStats(),
    ]);
    return { cpu, mem, disk, network };
  }

  // 采集并保存到数据库
  async collectAndSave() {
    const { cpu, mem, disk, network } = await this.collect();

    const metric = this.metricRepo.create({
      cpu: cpu.currentLoad,
      memory: (mem.used / mem.total) * 100,
      disk: disk[0]?.use || 0,
      networkRx: network[0]?.rx_sec || 0,
      networkTx: network[0]?.tx_sec || 0,
    });

    return this.metricRepo.save(metric);
  }

  // 查询历史数据
  async getHistory(hours: number = 1) {
    const since = new Date(Date.now() - hours * 60 * 60 * 1000); //Date.now(拿到的是是时间戳 毫秒)
    return this.metricRepo
      .createQueryBuilder('m') //创建查询构造器 m是别名
      .where('m.createdAt > :since', { since })
      .orderBy('m.createdAt', 'ASC')
      .getMany();
  }

  // 获取实时指标（返回给前端）
  async getMetrics() {
    const { cpu, mem, disk, network } = await this.collect();

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
    const [osInfo, cpuInfo] = await Promise.all([
      si.osInfo(), // 系统信息
      si.cpu(), // CPU 信息
    ]);
    const time = si.time(); // 获取系统运行时间
    return {
      hostname: osInfo.hostname,
      platform: osInfo.platform,
      distro: osInfo.distro,
      release: osInfo.release,
      cpuModel: cpuInfo.brand,
      cpuCores: cpuInfo.cores,
      uptime: time.uptime, // 秒
    };
  }

  async getStats(hours: number = 1) {
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);

    const result = await this.metricRepo
      .createQueryBuilder('m')
      .select('MIN(m.cpu)', 'cpuMin')
      .addSelect('MAX(m.cpu)', 'cpuMax')
      .addSelect('AVG(m.cpu)', 'cpuAvg')
      .addSelect('MIN(m.memory)', 'memMin')
      .addSelect('MAX(m.memory)', 'memMax')
      .addSelect('AVG(m.memory)', 'memAvg')
      .addSelect('COUNT(*)', 'count')
      .where('m.createdAt > :since', { since })
      .getRawOne<{
        cpuMin: string | null;
        cpuMax: string | null;
        cpuAvg: string | null;
        memMin: string | null;
        memMax: string | null;
        memAvg: string | null;
        count: string | null;
      }>();
    // 查询内存峰值的时间
    const memMaxRecord = await this.metricRepo
      .createQueryBuilder('m')
      .where('m.createdAt > :since', { since })
      .orderBy('m.memory', 'DESC')
      .limit(1)
      .getOne();
    return {
      cpu: {
        min: Number(result?.cpuMin) || 0,
        max: Number(result?.cpuMax) || 0,
        avg: Number(result?.cpuAvg) || 0,
      },
      memory: {
        min: Number(result?.memMin) || 0,
        max: Number(result?.memMax) || 0,
        avg: Number(result?.memAvg) || 0,
        maxAt: memMaxRecord?.createdAt,
      },
      count: Number(result?.count) || 0,
    };
  }
}
