import {useState} from "react";
import { useTablaPaginada } from "../../hooks/useTablaPaginada";
import { listarEmpleados } from "../../services/empleadoService";
import ModalEmpleadoForm from "../../components/ModalEmpleadoForm";

const EmpleadosPage = () => {
  const {
    data: empleados,
    pagina,
    limite,
    total,
    loading,
    setPagina,
    setFiltros,
    filtros,
    refetch
  } = useTablaPaginada(listarEmpleados, {
    nombre: "",
    fecha_ingreso: "",
    salario: "",
  });
  const [mostrarModal, setMostrarModal] = useState(false);

  const totalPaginas = Math.ceil(total / limite);

  const handleChangeFiltro = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
    setPagina(1);
  };

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Gestión de Empleados
        </h1>
        <button
          onClick={() => setMostrarModal(true)}
          className="bg-cyan-600 text-white px-5 py-2 rounded hover:bg-cyan-700 transition"
        >
          Crear nuevo
        </button>

        {/* Modal */}
        {mostrarModal && (
          <ModalEmpleadoForm
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
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Buscar por nombre"
              value={filtros.nombre}
              onChange={handleChangeFiltro}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Fecha de ingreso
            </label>
            <input
              type="date"
              name="fecha_ingreso"
              value={filtros.fecha_ingreso}
              onChange={handleChangeFiltro}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Salario
            </label>
            <input
              type="number"
              name="salario"
              placeholder="Buscar por salario"
              value={filtros.salario}
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
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Fecha Ingreso
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Salario
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center p-6">
                  Cargando...
                </td>
              </tr>
            ) : empleados.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  Sin resultados
                </td>
              </tr>
            ) : (
              empleados.map((emp) => (
                <tr key={emp.id}>
                  <td className="px-6 py-4">{emp.id}</td>
                  <td className="px-6 py-4">{emp.nombre}</td>
                  <td className="px-6 py-4">{emp.fecha_ingreso}</td>
                  <td className="px-6 py-4">
                    ${Number(emp.salario).toLocaleString()}
                  </td>
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

export default EmpleadosPage;
