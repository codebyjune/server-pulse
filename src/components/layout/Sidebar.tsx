import { Nav } from "@douyinfe/semi-ui";
import { IconHome ,IconHistory,IconAlertCircle, IconPulse,  IconSetting, IconServer} from "@douyinfe/semi-icons";


const SideBar = () => {
  return (
    <Nav
      className=" h-full"
      items={[
        { itemKey: "/", text: "仪表盘", icon: <IconHome /> },
        { itemKey: "/realtime", text: "实时监控", icon: <IconPulse /> },
        { itemKey: "/history", text: "历史数据", icon: <IconHistory /> },
        { itemKey: "/alerts", text: "告警中心", icon: <IconAlertCircle /> },
        { itemKey: "/settings", text: "系统设置", icon: <IconSetting /> },
      ]}
      header={{
        logo: <IconServer style={{ height: "36px", fontSize: 36 }} />,
        text: "Server Pulse",
      }}
      footer={{
        collapseButton: true,
      }}
      onSelect={(data) => console.log("trigger onSelect: ", data)}
      onClick={(data) => console.log("trigger onClick: ", data)}
    />
  );
};

export default SideBar