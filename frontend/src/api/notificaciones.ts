import axiosInstance from "../utils/axiosInstance";
import { puedeNotificar } from "../utils/enviarNotificacion"; // ✅ nuevo

export async function getNotificacionesUsuario(idUsuario: number) {
  const response = await axiosInstance.get(`/notificaciones/usuario/${idUsuario}`);
  return response.data;
}

export async function marcarNotificacionLeida(idNotificacion: number) {
  const response = await axiosInstance.patch(`/notificaciones/${idNotificacion}`);
  return response.data;
}

export async function getProductosDelUsuario(idUsuario: number) {
  const response = await axiosInstance.get(`/productos/nombres/${idUsuario}`);
  return response.data;
}

export const enviarNotificacionActualizacion = (data: {
  titulo: string;
  mensaje: string;
}) => {
  if (!puedeNotificar("actualizacion")) return Promise.resolve(); // ✅ filtro de preferencia

  return axiosInstance.post('/notificaciones/actualizacion-app', data);
};

export const enviarNotificacionReposicion = (data: {
  tipo: string;
  titulo: string;
  mensaje: string;
  idUsuario: number;
}) => {
  if (!puedeNotificar("reposicion")) return Promise.resolve(); // ✅ filtro de preferencia

  return axiosInstance.post("/notificaciones", data);
};
