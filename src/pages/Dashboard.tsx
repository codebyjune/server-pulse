import MetricCard from "../components/dashboard/MetricCard";

import { useMetrics } from "../hooks/useMetrics";
const Dashboard = () => {
  const metrics = useMetrics();
  if (!metrics) return <div>连接中...</div>;
  return (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-4">
        <MetricCard title="CPU" value={metrics.cpu.toFixed(1)} />
        <MetricCard title="内存" value={metrics.memory.percent.toFixed(1)} />
        <MetricCard title="磁盘" value={metrics.disk.toFixed(1)} />
        <MetricCard
          title="网络"
          value={(metrics.network.rx / 1024).toFixed(1)}
          unit="KB/s"
        />
      </div>
    </div>
  );
};

export default Dashboard;
