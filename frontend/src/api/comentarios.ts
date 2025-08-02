import axios from 'axios';

export const getComentariosPorProducto = (productoId: number) => {
  return axios.get(`producttrack-production.up.railway.app/comentarios/${productoId}`);
};

export const crearComentario = (comentario: { idUsuario: number, idProducto: number, comentario: string }) => {
  return axios.post(`producttrack-production.up.railway.app/comentarios`, comentario);
};