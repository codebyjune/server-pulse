import { useMetricsHistory } from "../hooks/useMetricsHistory";
import MetricsChart from "../components/dashboard/MetricsChart";
import { Select } from "@douyinfe/semi-ui";

const History = () => {
  const { history, loading } = useMetricsHistory(2);
  if (loading) return <div>加载中</div>;
  const chartData = history.map((item) => ({
    time: new Date(item.createdAt).toLocaleTimeString(),
    cpu: item.cpu,
    memory: item.memory,
  }));
  return (
    <div>
      <div className=" mt-4 mr-10 justify-end flex">  
        <Select>
          <Select.Option value="1">抖音</Select.Option>
          <Select.Option value="3">轻颜相机</Select.Option>
          <Select.Option value="7" disabled>
            剪映
          </Select.Option>
          <Select.Option value="xigua">7</Select.Option>
        </Select>
      </div>
      <div className=" mr-10">
 <MetricsChart data={chartData} />
      </div>
     
    </div>
  );
};

export default History;
