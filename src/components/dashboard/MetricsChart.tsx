import ReactECharts from "echarts-for-react";

interface HistoryPoint {
  time: string;
  cpu: number;
  memory: number;
  
}

interface Props {
  data: HistoryPoint[];
}

function MetricsChart({ data }: Props) {
  const option = {
    title: { text: "CPU / 内存 趋势" },
    tooltip: { trigger: "axis" },
    legend: { data: ["CPU", "内存"] },
    xAxis: {
      type: "category",
      data: data.map((h) => h.time),
    },
    yAxis: {
      type: "value",
      max: 100,
    },
    series: [
      {
        name: "CPU",
        type: "line",
        smooth: true,
        data: data.map((h) => h.cpu),
        color: "#7950f2",
      },
      {
        name: "内存",
        type: "line",
        smooth: true,
        data: data.map((h) => h.memory),
        color: "#228be6",
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 500}} />;
}

export default MetricsChart;
