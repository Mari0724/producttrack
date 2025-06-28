import axiosInstance from "../utils/axiosInstance";

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
