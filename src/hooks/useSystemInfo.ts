
import { useEffect, useState } from "react";

interface SystemInfo {
  hostname: string;
  platform: string;
  distro: string;
  release: string;
  cpuModel: string;
  cpuCores: number;
  uptime: number;
}

export function useSystemInfo() {
  const [info, setInfo] = useState<SystemInfo | null>(null);
 
  useEffect(() => {
    fetch("http://localhost:3000/metrics/system")
      .then((res) => res.json())
      .then(setInfo)
      .catch(console.error);
  }, []);

  return info
}
