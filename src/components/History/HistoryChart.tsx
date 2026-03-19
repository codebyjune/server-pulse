import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

interface HistoryPoint {
  time: string;
  cpu: number;
  memory: number;
}

interface Props {
  data: HistoryPoint[];
}

interface TooltipParam {
  axisValue: string;
  value: number;
  seriesName: string;
  marker: string;
}

function HistoryChart({ data }: Props) {
  const option: EChartsOption = {
    title: { text: "CPU / 内存 趋势" },
    tooltip: {
      trigger: "axis",
      formatter: (params) => {
        const items = params as unknown as TooltipParam[];
        if (!items || items.length === 0) return "";
        const time = items[0].axisValue;
        let result = `<div style="font-weight:bold">${time}</div>`;
        items.forEach((item) => {
          const value = item.value.toFixed(2);
          result += `<div>${item.marker} ${item.seriesName}: ${value}%</div>`;
        });
        return result;
      },
    },
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

  return <ReactECharts option={option} style={{ height: 500 }} />;
}

export default HistoryChart;
