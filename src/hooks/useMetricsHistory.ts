import { useEffect, useState } from "react";
import { useMetrics } from "./useMetrics";

interface HistoryPoint {
  time: string;
  cpu: number;
  memory: number;
}

export function useMetricsHistory(maxPoints = 30) {
  const metrics = useMetrics();
  const [history, setHistory] = useState<HistoryPoint[]>([]);

  useEffect(() => {
    if (!metrics) return;

    const time = new Date().toLocaleTimeString();
    setHistory((prev) => {
      const newHistory = [
        ...prev,
        {
          time,
          cpu: metrics.cpu,
          memory: metrics.memory.percent,
        },
      ];
      return newHistory.slice(-maxPoints);
    });
   
  }, [metrics, maxPoints]);

  return history;
}
