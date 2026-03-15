import MetricCard from "../components/dashboard/MetricCard";
import { Col, Row } from "@douyinfe/semi-ui";
import mockMetrics  from "../mock/metrics";
const Dashboard = () => {
  
  return (
    <div>
      DASHBOARD
      <Row>
        {mockMetrics.map((d) => (
          <Col span={6}>
            <div >
              <MetricCard title={d.title} value={d.value} unit={d.unit} />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
