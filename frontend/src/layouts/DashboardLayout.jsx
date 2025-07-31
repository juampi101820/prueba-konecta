import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="mx-2 px-4 sm:px-6 lg:px-8 sticky top-2 z-30 shadow backdrop-blur-2xl backdrop-saturate-200 bg-white bg-opacity-90 rounded-lg">
        <div className="flex h-16 items-center justify-between">
          <div className="hidden sm:flex items-center space-x-3">
            <Link to="/">
              <img
                src="https://www.angeco.com/wp-content/uploads/2020/04/logo-konecta-fondo-trasparente-fondo-claro-png-1.png"
                alt="Logo Konecta"
                className="h-8"
              />
            </Link>
          </div>

          {/* Navegacion */}
          <div className="flex space-x-6 items-center">
            <Link
              to="/empleados"
              className="text-[#00264D] font-medium hover:underline"
            >
              Empleados
            </Link>

            {auth?.rol === "ADMINISTRADOR" && (
              <Link
                to="/solicitudes"
                className="text-[#00264D] font-medium hover:underline"
              >
                Solicitudes
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-[#00264D] text-white px-4 py-1.5 rounded hover:bg-[#001c3a] transition text-sm"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;