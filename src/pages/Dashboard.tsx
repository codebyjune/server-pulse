import MetricCard from "../components/dashboard/MetricCard";
import { useSystemInfo } from "../hooks/useSystemInfo";
import { useMetrics } from "../hooks/useMetrics";
import { Card, Typography } from "@douyinfe/semi-ui";
import MetricsChart from '../components/dashboard/MetricsChart';
import { useMetricsHistory } from '../hooks/useMetricsHistory';

const { Title, Text } = Typography;
function formatUptime(seconds: number) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return `${days}天 ${hours}小时 ${mins}分`;
}
const Dashboard = () => {
  const metrics = useMetrics();
  const systemInfo = useSystemInfo();
   const history = useMetricsHistory();
  if (!metrics) return <div>连接中...</div>;
  return (
    <div className="p-4">
       {systemInfo && (
        <Card className="mb-4" shadows="hover">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <Text type="secondary">主机名</Text>
              <Title heading={5}>{systemInfo.hostname}</Title>
            </div>
            <div>
              <Text type="secondary">系统</Text>
              <Title heading={5}>{systemInfo.distro}</Title>
            </div>
            <div>
              <Text type="secondary">CPU</Text>
              <Title heading={5}>{systemInfo.cpuCores} 核心</Title>
            </div>
            <div>
              <Text type="secondary">运行时长</Text>
              <Title heading={5}>{formatUptime(systemInfo.uptime)}</Title>
            </div>
          </div>
        </Card>
      )}
      <div className="grid grid-cols-4 gap-4 mt-4">
        <MetricCard title="CPU" value={metrics.cpu.toFixed(1)} />
        <MetricCard title="内存" value={metrics.memory.percent.toFixed(1)} />
        <MetricCard title="磁盘" value={metrics.disk.toFixed(1)} />
        <MetricCard
          title="网络"
          value={(metrics.network.rx / 1024).toFixed(1)}
          unit="KB/s"
        />
      </div>
       <div className="mt-4">
        <MetricsChart data={history} />
      </div>
    </div>
  );
};

export default Dashboard;
