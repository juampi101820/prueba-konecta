import api from "../api/axiosClient";

export const listarEmpleados = async (params = {}) => {
  const { data } = await api.get("/api/empleados", { params });
  return data;
};

export const crearEmpleado = async (datos) => {
  const response = await api.post('/api/empleados', datos);
  return response.data;
};
