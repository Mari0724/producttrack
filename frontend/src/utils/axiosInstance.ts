import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000", // según tu entorno
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
