import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  // 加载中显示 loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  // 未登录跳转到登录页
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 已登录，渲染子组件
  return <>{children}</>;
}

export default ProtectedRoute;
