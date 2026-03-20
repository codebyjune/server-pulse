import { useEffect, useState } from "react";

interface HistoryPoint {
  id: number;
  cpu: number;
  memory: number;
  disk: number;
  networkRx: number;
  networkTx: number;
  createdAt: string;
}

export function useMetricsHistory(hours: number = 1) {
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/metrics/history?hours=${hours}`,
        );
        const data = await res.json();
        setHistory(data);
      } catch (error) {
        console.error("Failed to fetch metrics history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [hours]);
  return { history, loading };
}
