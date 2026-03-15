import { Card, Progress, Typography } from "@douyinfe/semi-ui";
const { Title, Text } = Typography;

interface MetricCardProps {
  title: string;
  value: number;
  unit?: string;
}

const MetricCard = ({title,value,unit='%'}:MetricCardProps) => {
  const getColor =(val:number)=>{
     if (val >= 90) return "#ef4444";
    if (val >= 70) return "#f59e0b";
    return "#22c55e";
  }
  return (
    <Card className=" text-center">
      
      <Text type="secondary">{title}</Text>
      <Title heading={1} style={{ margin: "8px 0" }} weight={"semibold"}>
        {value}{ unit}
      </Title>
      <Progress
        type="circle"
        percent={value}
        stroke={getColor(value)}
        width={120}
        showInfo={false}
      />
    </Card>
  );
};

export default MetricCard;
