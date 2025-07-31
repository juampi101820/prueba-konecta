import React, { useState } from "react";
import { crearEmpleado } from "../services/empleadoService";
import { toast } from "react-toastify";

const ModalEmpleadoForm = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    nombre: "",
    fecha_ingreso: "",
    salario: "",
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: null }); // Limpia error individual
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrores({}); // Limpia todos los errores

    try {
      await crearEmpleado(form);
      toast.success("Registro exitoso");
      onSuccess();
      onClose();
    } catch (error) {
      const res = error;

      if (res?.status === 400) {
        if (Array.isArray(res.data?.errores)) {
          const nuevoErrores = {};
          for (const err of res.data.errores) {
            if (err.path) {
              nuevoErrores[err.path] = err.msg;
            }
          }
          setErrores(nuevoErrores);
        } else if (res.data?.mensaje) {
          toast.error(res.data.mensaje);
        } else {
          toast.error("Error de validación desconocido");
        }
      } else if (res?.data?.mensaje) {
        toast.error(res.data.mensaje);
      } else {
        toast.error("Error inesperado al registrar el empleado");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Registrar Empleado</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
            {errores.nombre && (
              <p className="text-red-600 text-sm mt-1">{errores.nombre}</p>
            )}
          </div>

          {/* Fecha ingreso */}
          <div>
            <label className="block text-sm">Fecha Ingreso</label>
            <input
              type="date"
              name="fecha_ingreso"
              value={form.fecha_ingreso}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
            {errores.fecha_ingreso && (
              <p className="text-red-600 text-sm mt-1">{errores.fecha_ingreso}</p>
            )}
          </div>

          {/* Salario */}
          <div>
            <label className="block text-sm">Salario</label>
            <input
              type="number"
              name="salario"
              value={form.salario}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
            {errores.salario && (
              <p className="text-red-600 text-sm mt-1">{errores.salario}</p>
            )}
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEmpleadoForm;