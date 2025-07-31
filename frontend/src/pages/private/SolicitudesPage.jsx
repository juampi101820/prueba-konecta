import React, { useState } from "react";
import { useTablaPaginada } from "../../hooks/useTablaPaginada";
import { listarSolicitudes } from "../../services/solicitudService";
import ModalSolicitudForm from "../../components/ModalSolicitudForm";

const SolicitudesPage = () => {
  const {
    data: solicitudes,
    pagina,
    limite,
    total,
    loading,
    setPagina,
    setFiltros,
    filtros,
    refetch,
  } = useTablaPaginada(listarSolicitudes, {
    tipo: "",
    nombre_empleado: "",
    fecha: "",
    fecha_inicio: "",
    fecha_fin: "",
  });

  const totalPaginas = Math.ceil(total / limite);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleChangeFiltro = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
    setPagina(1);
  };

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Gestión de Solicitudes
        </h1>
        <button
          onClick={() => setMostrarModal(true)}
          className="bg-cyan-600 text-white px-5 py-2 rounded hover:bg-cyan-700 transition"
        >
          Crear nuevo
        </button>

        {mostrarModal && (
          <ModalSolicitudForm
            onClose={() => setMostrarModal(false)}
            onSuccess={() => {
              setPagina(1);
              refetch();
            }}
          />
        )}
      </div>

      {/* Filtros */}
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Filtros de búsqueda
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Tipo
            </label>
            <input
              type="text"
              name="tipo"
              placeholder="Tipo de solicitud"
              value={filtros.tipo}
              onChange={handleChangeFiltro}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Nombre Empleado
            </label>
            <input
              type="text"
              name="nombre_empleado"
              placeholder="Nombre Empleado"
              value={filtros.nombre_empleado}
              onChange={handleChangeFiltro}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Fecha exacta
            </label>
            <input
              type="date"
              name="fecha"
              value={filtros.fecha}
              onChange={handleChangeFiltro}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Fecha inicio
            </label>
            <input
              type="date"
              name="fecha_inicio"
              value={filtros.fecha_inicio}
              onChange={handleChangeFiltro}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Fecha fin
            </label>
            <input
              type="date"
              name="fecha_fin"
              value={filtros.fecha_fin}
              onChange={handleChangeFiltro}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Empleado
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Descripción
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-6">
                  Cargando...
                </td>
              </tr>
            ) : solicitudes.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  Sin resultados
                </td>
              </tr>
            ) : (
              solicitudes.map((s) => (
                <tr key={s.id}>
                  <td className="px-6 py-4">{s.id}</td>
                  <td className="px-6 py-4">{s.tipo}</td>
                  <td className="px-6 py-4">{s.fecha}</td>
                  <td className="px-6 py-4">{s.Empleado?.nombre}</td>
                  <td className="px-6 py-4">{s.descripcion}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-600">
          Página <strong>{pagina}</strong> de <strong>{totalPaginas}</strong>
        </span>
        <div className="space-x-2">
          <button
            onClick={() => setPagina((p) => Math.max(p - 1, 1))}
            disabled={pagina === 1}
            className="px-4 py-1.5 border rounded disabled:opacity-50 hover:bg-gray-100"
          >
            Anterior
          </button>
          <button
            onClick={() => setPagina((p) => Math.min(p + 1, totalPaginas))}
            disabled={pagina === totalPaginas}
            className="px-4 py-1.5 border rounded disabled:opacity-50 hover:bg-gray-100"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolicitudesPage;
