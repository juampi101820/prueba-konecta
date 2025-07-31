import React, { useState } from "react";
import { crearSolicitud } from "../services/solicitudService";
import { toast } from "react-toastify";
import EmpleadoSelector from "./EmpleadoSelector";

const ModalSolicitudForm = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    id_empleado: null,
    tipo: "",
    fecha: "",
    descripcion: "",
  });

  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrores({});

    if (!form.id_empleado) {
      toast.error("Seleccione un empleado");
      return;
    }

    try {
      await crearSolicitud(form);
      toast.success("Solicitud registrada con éxito");
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
        toast.error("Error inesperado al registrar la solicitud");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Registrar Solicitud</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Empleado */}
          <div>
            <label className="block text-sm font-medium mb-1">Empleado</label>
            <EmpleadoSelector
              onSelect={(emp) => {
                if (emp) {
                  setForm((prev) => ({ ...prev, id_empleado: emp.id }));
                  setEmpleadoSeleccionado(emp);
                } else {
                  setForm((prev) => ({ ...prev, id_empleado: null }));
                  setEmpleadoSeleccionado(null);
                }
              }}
              empleadoSeleccionado={empleadoSeleccionado}
            />
            {errores.id_empleado && (
              <p className="text-red-600 text-sm mt-1">{errores.id_empleado}</p>
            )}
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm">Tipo</label>
            <input
              type="text"
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
            {errores.tipo && (
              <p className="text-red-600 text-sm mt-1">{errores.tipo}</p>
            )}
          </div>

          {/* Fecha */}
          <div>
            <label className="block text-sm">Fecha</label>
            <input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
            {errores.fecha && (
              <p className="text-red-600 text-sm mt-1">{errores.fecha}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm">Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border rounded px-3 py-2 resize-none"
            ></textarea>
            {errores.descripcion && (
              <p className="text-red-600 text-sm mt-1">
                {errores.descripcion}
              </p>
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

export default ModalSolicitudForm;
