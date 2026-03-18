import { Layout, Button, Typography, Space } from "@douyinfe/semi-ui";
import SideBar from "./Sidebar";
import { IconRefresh, IconMoon, IconUser } from "@douyinfe/semi-icons";
const { Text } = Typography;
export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { Header, Sider, Content } = Layout;
  const commonStyle = {
    height: 64,
    lineHeight: "64px",
    background: "#f8f9fa",
  };
  return (
    <Layout className="h-screen">
      <Sider style={{ background: "var(--semi-color-fill-2)" }}>
        <SideBar />
      </Sider>
      <Layout>
        <Header
          style={commonStyle}
          className="flex items-center justify-between px-6"
        >
          <Text strong className="text-lg">
            🖥️ Server Pulse
          </Text>
          <Space>
            <Text type="tertiary">💻 DESKTOP-XXX</Text>
            <Button icon={<IconRefresh />} theme="borderless" />
            <Button icon={<IconMoon />} theme="borderless" />
            <Button icon={<IconUser />} theme="borderless" />
          </Space>
        </Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};
