import { Layout } from "@douyinfe/semi-ui";
import SideBar from "./Sidebar";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { Header, Footer, Sider, Content } = Layout;
  const commonStyle = {
    height: 64,
    lineHeight: "64px",
    background: "var(--semi-color-fill-0)",
  };
  return (
    <Layout className="h-screen">
      <Sider style={{ background: "var(--semi-color-fill-2)" }}>
        <SideBar />
      </Sider>
      <Layout>
        <Header style={commonStyle}>Header</Header>
        <Content >
          {children}
        </Content>
       
      </Layout>
    </Layout>
  );
};
