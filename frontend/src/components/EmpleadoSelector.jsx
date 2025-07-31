import React, { useEffect, useState } from "react";
import { useTablaPaginada } from "../hooks/useTablaPaginada";
import { listarEmpleados } from "../services/empleadoService";

const EmpleadoSelector = ({ onSelect, empleadoSeleccionado }) => {
  const [busqueda, setBusqueda] = useState("");
  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  const {
    data: empleados,
    pagina,
    setPagina,
    total,
    loading,
    setFiltros,
  } = useTablaPaginada(listarEmpleados, { nombre: "" });

  useEffect(() => {
    setFiltros({ nombre: busqueda });
    setPagina(1);
  }, [busqueda]);

  const totalPaginas = Math.ceil(total / 10);

  const mostrarTexto = empleadoSeleccionado
    ? `${empleadoSeleccionado.nombre} — ${empleadoSeleccionado.fecha_ingreso}`
    : busqueda;

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Buscar empleado"
        value={mostrarTexto}
        onChange={(e) => {
          setBusqueda(e.target.value);
          onSelect(null);
        }}
        onFocus={() => setMostrarOpciones(true)}
        className="w-full border rounded px-3 py-2"
      />

      {mostrarOpciones && (
        <div className="absolute z-50 bg-white border w-full rounded mt-1 max-h-60 overflow-y-auto">
          {loading ? (
            <div className="p-2 text-gray-500 text-sm">Cargando...</div>
          ) : empleados.length === 0 ? (
            <div className="p-2 text-gray-500 text-sm">Sin resultados</div>
          ) : (
            empleados.map((emp) => (
              <div
                key={emp.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  onSelect(emp);
                  setBusqueda("");
                  setMostrarOpciones(false);
                }}
              >
                {emp.nombre} — {emp.fecha_ingreso}
              </div>
            ))
          )}

          <div className="flex justify-between p-2 text-xs border-t bg-gray-50">
            <button
              disabled={pagina === 1}
              onClick={() => setPagina((p) => Math.max(p - 1, 1))}
              className="text-blue-500 disabled:opacity-50"
            >
              Anterior
            </button>
            <span>
              Página {pagina} de {totalPaginas}
            </span>
            <button
              disabled={pagina === totalPaginas}
              onClick={() => setPagina((p) => Math.min(p + 1, totalPaginas))}
              className="text-blue-500 disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpleadoSelector;
