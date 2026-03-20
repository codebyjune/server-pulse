import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";
export interface Metrics {
  cpu: number;
  memory: { used: number; total: number; percent: number };
  disk: number;
  network: { rx: number; tx: number };
  timestamp: number;
}

export function useMetrics() {
  const [metricsData, setMetricsData] = useState<Metrics | null>(null);

  useEffect(() => {
    const socket: Socket = io("http://localhost:3000");
    socket.on("metrics", (data: Metrics) => {
      setMetricsData(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return  metricsData
}
