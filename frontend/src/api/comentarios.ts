import axios from 'axios';

export const getComentariosPorProducto = (productoId: number) => {
  return axios.get(`https://producttrack-production.up.railway.app/comentarios/${productoId}`);
};

export const crearComentario = (comentario: { idUsuario: number, idProducto: number, comentario: string }) => {
  return axios.post(`https://producttrack-production.up.railway.app/comentarios`, comentario);
};