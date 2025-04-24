// src/components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  userRole: "client" | "freelancer";
  requiredRole: "client" | "freelancer";
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ userRole, requiredRole, children }) => {
  if (userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
