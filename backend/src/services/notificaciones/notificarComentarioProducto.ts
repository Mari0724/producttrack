import prisma from '../../utils/prismaClient';
import { TipoNotificacion } from '@prisma/client';

export async function notificarComentarioProducto(idComentario: number) {
  const comentario = await prisma.comentarios.findUnique({
    where: { idComentario },
    include: {
      producto: {
        include: {
          usuario: true, // el dueño del producto
        },
      },
    },
  });

  if (!comentario || !comentario.producto || !comentario.producto.usuario) {
    console.warn('❌ No se encontró el comentario, producto o su usuario.');
    return;
  }

  const usuarioProducto = comentario.producto.usuario;

  // Verifica si el dueño del producto pertenece a una empresa
  if (!usuarioProducto.empresaId) {
    console.warn('⚠️ El usuario dueño del producto no pertenece a una empresa.');
    return;
  }

  const miembros = await prisma.users.findMany({
    where: {
      empresaId: usuarioProducto.empresaId,
    },
  });

  const titulo = `Nuevo comentario en producto: ${comentario.producto.nombre}`;
  const mensaje = `Se ha comentado el producto "${comentario.producto.nombre}": "${comentario.comentario}"`;

  const notificaciones = miembros.map((miembro) => ({
    idUsuario: miembro.idUsuario,
    tipo: TipoNotificacion.COMENTARIO_EQUIPO,
    titulo,
    mensaje,
    leida: false,
  }));

  await prisma.notificaciones.createMany({
    data: notificaciones,
  });

  console.log('✅ Notificaciones creadas para el comentario', idComentario);
}
