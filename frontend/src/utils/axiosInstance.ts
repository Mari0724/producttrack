import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000", // según tu entorno
  headers: {
    "Content-Type": "application/json",
  },
});

// Inyecta token automáticamente
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
    console.log("📤 Enviando token en header:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
