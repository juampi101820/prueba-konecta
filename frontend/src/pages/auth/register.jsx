import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    usuario: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: "",
    id_rol: "",
  });

  const [mostrarClave, setMostrarClave] = useState(false);
  const [errores, setErrores] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrores([]);

    if (form.contrasena !== form.confirmarContrasena) {
      setErrores([{ msg: "Las contraseñas no coinciden" }]);
      return;
    }

    if (!form.id_rol) {
      setErrores([{ msg: "Por favor selecciona un rol" }]);
      return;
    }

    try {
      const { confirmarContrasena, ...datos } = form;
      await register(datos);
      toast.success("Registro exitoso. Ahora puedes iniciar sesion");
      navigate("/login");
    } catch (error) {
      if (error.status === 400 && Array.isArray(error.data?.errores)) {
        setErrores(error.data.errores);
      } else if (error.status === 409 && error.data?.mensaje) {
        setErrores([{ msg: error.data.mensaje }]);
      } else {
        setErrores([{ msg: "Ocurrrio un error inesperado" }]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Registro</h1>
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
                  id="correo"
                  name="correo"
                  type="email"
                  value={form.correo}
                  onChange={handleChange}
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                  placeholder="Correo electrónico"
                />
                <label
                  htmlFor="correo"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                >
                  Correo electrónico
                </label>
              </div>

              <div className="relative">
                <select
                  id="id_rol"
                  name="id_rol"
                  value={form.id_rol}
                  onChange={handleChange}
                  className="h-10 w-full border-b-2 border-gray-300 text-gray-700 focus:outline-none bg-transparent"
                >
                  <option value="">Selecciona un rol</option>
                  <option value="1">Empleado</option>
                  <option value="2">Administrador</option>
                </select>
              </div>

              <div className="relative">
                <input
                  autoComplete="off"
                  id="contrasena"
                  name="contrasena"
                  type={mostrarClave ? "text" : "password"}
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

              <div className="relative">
                <input
                  autoComplete="off"
                  id="confirmarContrasena"
                  name="confirmarContrasena"
                  type={mostrarClave ? "text" : "password"}
                  value={form.confirmarContrasena}
                  onChange={handleChange}
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                  placeholder="Confirmar contraseña"
                />
                <label
                  htmlFor="confirmarContrasena"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                >
                  Confirmar contraseña
                </label>
              </div>

              <div className="flex justify-end text-sm text-gray-600">
                <button
                  type="button"
                  onClick={() => setMostrarClave(!mostrarClave)}
                  className="hover:underline"
                >
                  {mostrarClave ? "Ocultar contraseña" : "Mostrar contraseña"}
                </button>
              </div>

              <div className="relative">
                <button
                  type="submit"
                  className="w-full bg-cyan-500 text-white rounded-md px-4 py-2 cursor-pointer"
                >
                  Registrarse
                </button>
              </div>
            </form>

            {errores.length > 0 && (
              <ul className="text-sm text-red-600 space-y-1 mt-4">
                {errores.map((err, i) => (
                  <li key={i}>• {err.msg}</li>
                ))}
              </ul>
            )}

            <div className="mt-6 text-center text-sm">
              ¿Ya tienes una cuenta?{" "}
              <a href="/login" className="text-cyan-600 hover:underline">
                Inicia sesión
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
