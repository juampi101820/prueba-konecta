import api from "../api/axiosClient";

export const listarSolicitudes = async (params = {}) => {
  const { data } = await api.get("/api/solicitudes", { params });
  return data;
};

export const crearSolicitud = async (datos) => {
  const { data } = await api.post("/api/solicitudes", datos);
  return data;
};