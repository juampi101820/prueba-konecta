import api from "../api/axiosClient";

export const listarEmpleados = async (params = {}) => {
  const { data } = await api.get("/api/empleados", { params });
  return data;
};