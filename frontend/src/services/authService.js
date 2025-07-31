import api from "../api/axiosClient";

export const loginUser = async (credentials) => {
  const { data } = await api.post("/api/auth/login", credentials);
  return data;
};

export const registerUser = async (info) => {
  const { data } = await api.post("/api/auth/register", info);
  return data;
};
