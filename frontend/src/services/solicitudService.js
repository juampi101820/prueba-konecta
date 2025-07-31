import api from "../api/axiosClient";

export const listarSolicitudes = async (params = {}) => {
  const { data } = await api.get("/api/solicitudes", { params });
  return data;
};