import { useEffect, useState } from "react";
interface Stats {
  cpu: {
    min: number;
    max: number;
    avg: number;
  };
  memory: {
    min: number;
    max: number;
    avg: number;
    maxAt:number
  };
  count: number;
}
export function useStats(hours: number = 1) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3000/metrics/stats?hours=${hours}`,
      );
      const data = await res.json();
      setStats(data);
      setLoading(false);
    }

    fetchStats();
  }, [hours]);

  return { stats, loading };
}
