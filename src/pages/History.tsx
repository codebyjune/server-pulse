import { useMetricsHistory } from "../hooks/useMetricsHistory";
import MetricsChart from "../components/dashboard/MetricsChart";
import { Select } from "@douyinfe/semi-ui";
import { useMemo, useState } from "react";
const formatTime = (dateStr: string, days: number) => {
  const date = new Date(dateStr);
  if (days === 1) {
    // 1天：只显示时:分
    return date.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    // 多天：显示 月/日 时:分
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
  }
};
const DAY_OPTIONS = [
  { value: 1, label: "1" },
  { value: 3, label: "3" },
  { value: 7, label: "7" },
];
const History = () => {
  const [days, setDays] = useState(1);
  const { history, loading } = useMetricsHistory(days * 24); // 天数转小时
  const chartData = useMemo(
    () =>
      history.map((item) => ({
        time: formatTime(item.createdAt, days),
        cpu: item.cpu,
        memory: item.memory,
      })),
    [history, days],
  );

  if (loading) return <div>加载中</div>;

  return (
    <div>
      <div className=" mt-4 ml-10  flex ">
        <Select
          value={days}
          onChange={(value) => setDays(value as number)}
          suffix="天"
          style={{ width: 120 }}
          optionList={DAY_OPTIONS}
        ></Select>
      </div>
      <div className=" mr-10">
        <MetricsChart data={chartData} />
      </div>
    </div>
  );
};

export default History;
