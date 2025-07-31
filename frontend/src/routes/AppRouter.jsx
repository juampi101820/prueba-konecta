import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

// Lazy load de paginas privadas
const EmpleadosPage = lazy(() => import("../pages/private/EmpleadosPage"));
const SolicitudesPage = lazy(() => import("../pages/private/SolicitudesPage"));

const AppRouter = () => (
  <BrowserRouter>
    <Suspense fallback={<div className="p-4 text-center">Cargando...</div>}>
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
    </Suspense>
  </BrowserRouter>
);

export default AppRouter;