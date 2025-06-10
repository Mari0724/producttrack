import prisma from '../../utils/prismaClient';
import { TipoNotificacion } from '@prisma/client';

/**
 * Envía una notificación de tipo ACTUALIZACION_APP a todos los usuarios registrados.
 * @param titulo Título de la notificación.
 * @param mensaje Mensaje de la notificación.
 */
export async function notificarActualizacionApp(titulo: string, mensaje: string) {
  const usuarios = await prisma.users.findMany({
    where: {
      deletedAt: null, // si usas soft delete
    },
  });

  if (usuarios.length === 0) {
    console.warn('⚠️ No hay usuarios para notificar.');
    return;
  }

  const notificaciones = usuarios.map((usuario) => ({
    idUsuario: usuario.idUsuario,
    tipo: TipoNotificacion.ACTUALIZACION_APP,
    titulo,
    mensaje,
    leida: false,
  }));

  await prisma.notificaciones.createMany({
    data: notificaciones,
  });

  console.log(`✅ Se notificó a ${usuarios.length} usuarios sobre la actualización de la app`);
}
