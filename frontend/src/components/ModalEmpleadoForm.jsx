import React, { useState } from "react";
import { crearEmpleado } from "../services/empleadoService";
import { toast } from "react-toastify";

const ModalEmpleadoForm = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    nombre: "",
    fecha_ingreso: "",
    salario: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearEmpleado(form);
      onSuccess();
      onClose();
      toast.success("Registro exitoso");
    } catch (error) {
        console.log(error)
      alert("Error al registrar empleado");
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Registrar Empleado</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          </div>
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
          </div>
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
          </div>

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
