import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/register";
import EmpleadosPage from "../pages/private/EmpleadosPage";
import SolicitudesPage from "../pages/private/SolicitudesPage";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route path="empleados" element={<EmpleadosPage />} />
        <Route
          path="solicitudes"
          element={
            <RoleRoute role="ADMINISTRADOR">
              <SolicitudesPage />
            </RoleRoute>
          }
        />
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;