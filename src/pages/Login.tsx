import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Tabs, TabPane, Button, Toast } from "@douyinfe/semi-ui";
import type { FormApi } from "@douyinfe/semi-ui/lib/es/form";
import { IconUser, IconLock } from "@douyinfe/semi-icons";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const registerFormApi = useRef<FormApi | null>(null);

  // 登录表单提交
  const handleLogin = async (values: { username: string; password: string }) => {
    setLoading(true);
    const result = await login(values.username, values.password);
    setLoading(false);

    if (result.success) {
      Toast.success("登录成功");
      navigate("/");
    } else {
      Toast.error(result.message || "登录失败");
    }
  };

  // 注册表单提交
  const handleRegister = async (values: { username: string; password: string; confirmPassword: string }) => {
    setLoading(true);
    const result = await register(values.username, values.password);
    setLoading(false);

    if (result.success) {
      Toast.success(result.message || "注册成功");
      setActiveTab("login"); // 切换到登录
    } else {
      Toast.error(result.message || "注册失败");
    }
  };

  // 密码确认校验
  const validateConfirmPassword = (value: string) => {
    const formApi = registerFormApi.current;
    if (!formApi) return "";

    const password = formApi.getValue("password");
    if (value !== password) {
      return "两次密码输入不一致";
    }
    return "";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 to-purple-600">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Server Pulse</h1>
          <p className="text-gray-500 mt-2">服务器监控系统</p>
        </div>

        {/* 登录/注册切换 */}
        <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)} size="large">
          {/* 登录表单 */}
          <TabPane tab="登录" itemKey="login">
            <Form onSubmit={handleLogin} layout="vertical">
              <Form.Input
                field="username"
                label="用户名"
                placeholder="请输入用户名"
                prefix={<IconUser />}
                size="large"
                rules={[
                  { required: true, message: "请输入用户名" },
                  { min: 3, message: "用户名至少3个字符" },
                  { max: 20, message: "用户名最多20个字符" },
                ]}
              />
              <Form.Input
                field="password"
                label="密码"
                mode="password"
                placeholder="请输入密码"
                prefix={<IconLock />}
                size="large"
                rules={[
                  { required: true, message: "请输入密码" },
                  { min: 6, message: "密码至少6个字符" },
                ]}
              />
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
                className="mt-4"
              >
                登录
              </Button>
            </Form>
          </TabPane>

          {/* 注册表单 */}
          <TabPane tab="注册" itemKey="register">
            <Form
              onSubmit={handleRegister}
              layout="vertical"
              getFormApi={(api) => (registerFormApi.current = api)}
            >
              <Form.Input
                field="username"
                label="用户名"
                placeholder="请输入用户名"
                prefix={<IconUser />}
                size="large"
                rules={[
                  { required: true, message: "请输入用户名" },
                  { min: 3, message: "用户名至少3个字符" },
                  { max: 20, message: "用户名最多20个字符" },
                ]}
              />
              <Form.Input
                field="password"
                label="密码"
                mode="password"
                placeholder="请输入密码"
                prefix={<IconLock />}
                size="large"
                rules={[
                  { required: true, message: "请输入密码" },
                  { min: 6, message: "密码至少6个字符" },
                  { max: 20, message: "密码最多20个字符" },
                ]}
              />
              <Form.Input
                field="confirmPassword"
                label="确认密码"
                mode="password"
                placeholder="请再次输入密码"
                prefix={<IconLock />}
                size="large"
                rules={[{ required: true, message: "请确认密码" }]}
                validate={validateConfirmPassword}
              />
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
                className="mt-4"
              >
                注册
              </Button>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Login;
