import { useState, useEffect, useCallback } from "react";

interface User {
  id: number;
  username: string;
}

interface AuthResult {
  success: boolean;
  message?: string;
}

const API_BASE = "http://localhost:3000";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 初始化时检查 token
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // 登录
  const login = useCallback(
    async (username: string, password: string): Promise<AuthResult> => {
      try {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          return { success: false, message: data.message || "登录失败" };
        }

        // 存储 token 和用户信息
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);

        return { success: true };
      } catch (error) {
        return { success: false, message: "网络错误，请稍后重试" };
      }
    },
    [],
  );

  // 注册
  const register = useCallback(
    async (username: string, password: string): Promise<AuthResult> => {
      try {
        const res = await fetch(`${API_BASE}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          return { success: false, message: data.message || "注册失败" };
        }

        return { success: true, message: "注册成功，请登录" };
      } catch (error) {
        return { success: false, message: "网络错误，请稍后重试" };
      }
    },
    [],
  );

  // 登出
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  // 获取 token
  const getToken = useCallback(() => {
    return localStorage.getItem("token");
  }, []);

  // 检查是否登录
  const isAuthenticated = !!user;

  return {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    getToken,
  };
}
