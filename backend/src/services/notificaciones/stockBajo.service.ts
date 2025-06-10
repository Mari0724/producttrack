import prisma from '../../utils/prismaClient';
import { TipoNotificacion, EstadoRecordatorio } from '@prisma/client';

export async function notificarStockBajo() {
  const recordatoriosPendientes = await prisma.recorStock.findMany({
    where: {
      estado: EstadoRecordatorio.PENDIENTE, // Acceso correcto al enum
    },
    include: {
      producto: {
        include: {
          usuario: true, // para acceder al tipo de usuario y empresaId si es necesario
        },
      },
    },
  });

  for (const recordatorio of recordatoriosPendientes) {
    if (
      recordatorio.producto &&
      recordatorio.producto.cantidad <= recordatorio.cantidadMinima
    ) {
      const { producto } = recordatorio;
      const { usuario } = producto;

      const titulo = `Stock bajo: ${producto.nombre}`;
      const mensaje = `El producto "${producto.nombre}" tiene solo ${producto.cantidad} unidades disponibles.`;

      if (usuario.tipoUsuario === 'INDIVIDUAL') {
        // No enviar notificación a usuarios individuales
        continue; // Salta a la siguiente iteración
      } else if (usuario.tipoUsuario === 'EMPRESARIAL') {
        const miembros = await prisma.users.findMany({
          where: {
            empresaId: usuario.empresaId,
          },
        });

        for (const miembro of miembros) {
          await prisma.notificaciones.create({
            data: {
              idUsuario: miembro.idUsuario,
              tipo: TipoNotificacion.STOCK_BAJO,
              titulo,
              mensaje,
            },
          });
        }
      }

      // Marcar el recordatorio como ATENDIDO
      await prisma.recorStock.update({
        where: {
          idRecordatorio: recordatorio.idRecordatorio,
        },
        data: {
          estado: EstadoRecordatorio.ENVIADO, // Acceso correcto al enum
        },
      });
    }
  }
}