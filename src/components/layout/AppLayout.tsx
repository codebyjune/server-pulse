import {
  Layout,
  Button,
  Typography,
  Space,
  Avatar,
  Toast,
} from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";
import SideBar from "./Sidebar";
import { IconRefresh, IconMoon } from "@douyinfe/semi-icons";
import { useAuth } from "../../hooks/useAuth";
const { Text } = Typography;
export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { Header, Sider, Content } = Layout;
  const commonStyle = {
    height: 64,
    lineHeight: "64px",
    background: "#f8f9fa",
  };
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout(); // 清理登录状态
    Toast.success("登出成功");
    navigate("/login"); // 跳转到登录页
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
            <Avatar src={user?.avatar} alt={user?.username}>
              {user?.username?.[0]} {/* 如果头像加载失败显示首字母 */}
            </Avatar>
            <button onClick={handleLogout}>log out</button>
          </Space>
        </Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};
