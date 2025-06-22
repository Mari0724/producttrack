import prisma from '../utils/prismaClient';
import { ComentarioDTO } from '../models/ComentarioDTO';

export async function obtenerComentariosPorProducto(productoId: number): Promise<ComentarioDTO[]> {
  const comentarios = await prisma.comentarios.findMany({
    where: { idProducto: productoId },
    orderBy: { fechaComentario: 'desc' },
  });

  return comentarios.map((comentario) => ({
    idComentario: comentario.idComentario,
    idUsuario: comentario.idUsuario,
    idProducto: comentario.idProducto,
    comentario: comentario.comentario,
    fechaComentario: comentario.fechaComentario,
    estado: comentario.estado,
    createdAt: comentario.createdAt,
    updatedAt: comentario.updatedAt,
  }));
}

export async function crearComentario(
  idUsuario: number,
  idProducto: number,
  comentario: string
): Promise<ComentarioDTO> {
  const nuevo = await prisma.comentarios.create({
    data: {
      idUsuario,
      idProducto,
      comentario,
      fechaComentario: new Date(),
      estado: 'pendiente',
    },
  });

  return {
    idComentario: nuevo.idComentario,
    idUsuario: nuevo.idUsuario,
    idProducto: nuevo.idProducto,
    comentario: nuevo.comentario,
    fechaComentario: nuevo.fechaComentario,
    estado: nuevo.estado,
    createdAt: nuevo.createdAt,
    updatedAt: nuevo.updatedAt,
  };
}

export async function actualizarComentario(
  idComentario: number,
  nuevoTexto: string
): Promise<ComentarioDTO> {
  const actualizado = await prisma.comentarios.update({
    where: { idComentario },
    data: {
      comentario: nuevoTexto,
      updatedAt: new Date(),
    },
  });

  return {
    idComentario: actualizado.idComentario,
    idUsuario: actualizado.idUsuario,
    idProducto: actualizado.idProducto,
    comentario: actualizado.comentario,
    fechaComentario: actualizado.fechaComentario,
    estado: actualizado.estado,
    createdAt: actualizado.createdAt,
    updatedAt: actualizado.updatedAt,
  };
}

export async function eliminarComentario(idComentario: number): Promise<{ mensaje: string }> {
  await prisma.comentarios.delete({
    where: { idComentario },
  });

  return { mensaje: 'Comentario eliminado' };
}
