import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    usuario: "",
    contrasena: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(form);
      toast.success("Bienvenido");
      navigate("/");
    } catch (err) {
      if (err.status === 401 || err.status === 400) {
        setError("Credenciales invalidas");
      } else {
        setError("Ocurrio un error inesperado");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Iniciar sesión</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  autoComplete="off"
                  id="usuario"
                  name="usuario"
                  type="text"
                  value={form.usuario}
                  onChange={handleChange}
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                  placeholder="Usuario"
                />
                <label
                  htmlFor="usuario"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                >
                  Usuario
                </label>
              </div>
              <div className="relative">
                <input
                  autoComplete="off"
                  id="contrasena"
                  name="contrasena"
                  type="password"
                  value={form.contrasena}
                  onChange={handleChange}
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                  placeholder="Contraseña"
                />
                <label
                  htmlFor="contrasena"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                >
                  Contraseña
                </label>
              </div>

              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

              <div className="relative">
                <button
                  type="submit"
                  className="w-full bg-cyan-500 text-white rounded-md px-4 py-2 cursor-pointer"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm">
              ¿No tienes una cuenta?{" "}
              <a href="/register" className="text-cyan-600 hover:underline">
                Regístrate
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
