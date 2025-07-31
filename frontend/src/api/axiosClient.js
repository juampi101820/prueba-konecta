import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor de respuestas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    };
    return Promise.reject(customError);
  }
);

export default api;
