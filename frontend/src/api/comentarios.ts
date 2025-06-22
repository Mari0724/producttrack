import axios from 'axios';

export const getComentariosPorProducto = (productoId: number) => {
  return axios.get(`http://localhost:3000/comentarios/${productoId}`);
};

export const crearComentario = (comentario: { idUsuario: number, idProducto: number, comentario: string }) => {
  return axios.post(`http://localhost:3000/comentarios`, comentario);
};
