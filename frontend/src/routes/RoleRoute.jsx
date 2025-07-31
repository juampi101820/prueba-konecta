import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRoute = ({ role, children }) => {
  const { isAuthenticated, hasRole } = useAuth();
  if (!isAuthenticated()) return <Navigate to="/login" />;
  return hasRole(role) ? children : <Navigate to="/empleados" />;
};

export default RoleRoute;
