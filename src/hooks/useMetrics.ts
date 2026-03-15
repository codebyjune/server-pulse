import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Metrics {
  cpu: number;
  memory: { used: number; total: number; percent: number };
  disk: number;
  network: { rx: number; tx: number };
  timestamp: number;
}

export function useMetrics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    const socket: Socket = io('http://localhost:3000');
    
    socket.on('metrics', (data: Metrics) => {
      setMetrics(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return metrics;
}
