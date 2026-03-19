import { Card, Typography, Tooltip } from "@douyinfe/semi-ui";
import type { ReactNode } from "react";

const { Title, Text } = Typography;

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  color: string;
  tooltip?: string;
}

export function StatCard({
  label,
  value,
  icon,
  color,
  tooltip,
}: StatCardProps) {
  const card = (
    <Card>
      <div className="flex items-center gap-3">
        <span style={{ color }}>{icon}</span>
        <div>
          <Text type="tertiary">{label}</Text>
          <Title heading={4} style={{ margin: 0 }}>
            {value}
          </Title>
        </div>
      </div>
    </Card>
  );

  if (tooltip) {
    return (
      <Tooltip content={tooltip} position="top">
        {card}
      </Tooltip>
    );
  }
  return card;
}
