import { useMetricsHistory } from "../hooks/useMetricsHistory";
import HistoryChart from "../components/History/HistoryChart";
import { Select, Row, Col } from "@douyinfe/semi-ui";
import { IconPulse, IconServer, IconList } from "@douyinfe/semi-icons";
import { useMemo, useState } from "react";
import { useStats } from "../hooks/useStats";
import { StatCard } from "../components/History/StatCard";
import {
  IllustrationNoResult,
  IllustrationNoResultDark,
} from "@douyinfe/semi-illustrations";
import { Empty } from "@douyinfe/semi-ui";
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
  const { stats, loading: statsLoading } = useStats(days * 24);
  const { history, loading } = useMetricsHistory(days * 24); // 天数转小时
  const statConfig = useMemo(() => {
    if (!stats) return [];
    const formatTime = (dateStr?: number) => {
      if (!dateStr) return undefined;
      const date = new Date(dateStr);
      return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
    };
    return [
      {
        label: "CPU 峰值",
        value: `${stats.cpu.max.toFixed(1)}%`,
        icon: <IconPulse size="extra-large" />,
        color: "var(--semi-color-primary)",
      },
      {
        label: "CPU 均值",
        value: `${stats.cpu.avg.toFixed(1)}%`,
        icon: <IconPulse size="extra-large" />,
        color: "var(--semi-color-success)",
      },
      {
        label: "内存峰值",
        value: `${stats.memory.max.toFixed(1)}%`,
        icon: <IconServer size="extra-large" />,
        color: "var(--semi-color-danger)",
        tooltip: formatTime(stats.memory.maxAt),
      },
      {
        label: "数据量",
        value: stats.count,
        icon: <IconList size="extra-large" />,
        color: "var(--semi-color-info)",
      },
    ];
  }, [stats]);
  const chartData = useMemo(
    () =>
      history.map((item) => ({
        time: formatTime(item.createdAt, days),
        cpu: item.cpu,
        memory: item.memory,
      })),
    [history, days],
  );
  if (loading || statsLoading) {
    return (
      <div className=" flex  justify-center items-center h-full">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
      </div>
    );
  }

  if (!history.length)
    return (
      <div className="flex justify-center items-center" style={{ height: 400 }}>
        <Empty
          image={<IllustrationNoResult style={{ width: 150, height: 150 }} />}
          darkModeImage={
            <IllustrationNoResultDark style={{ width: 150, height: 150 }} />
          }
          title="暂无数据"
          description="当前时间段内没有监控数据，请稍后再试"
        />
      </div>
    );
  return (
    <div>
      <div className=" mt-4 ml-10  flex ">
        <Select
          value={days}
          onChange={(value) => setDays(value as number)}
          suffix="天"
          optionList={DAY_OPTIONS}
        ></Select>
      </div>

      {stats && (
        <div className=" mt-6 px-6 mb-4">
          <Row gutter={16}>
            {statConfig.map((item, index) => (
              <Col span={6} key={index}>
                <StatCard
                  label={item.label}
                  value={item.value}
                  icon={item.icon}
                  color={item.color}
                  tooltip={
                    item.tooltip ? `峰值时间: ${item.tooltip}` : undefined
                  }
                />
              </Col>
            ))}
          </Row>
        </div>
      )}
      <div className=" mr-10">
        <HistoryChart data={chartData} />
      </div>
    </div>
  );
};

export default History;
