import prisma from '../../utils/prismaClient';
import { TipoNotificacion } from '@prisma/client';

// Función para obtener productos cuyo stock esté por debajo del mínimo
async function obtenerProductosConStockBajo() {
  const recordatorios = await prisma.recorStock.findMany({
    where: {
      estado: 'pendiente',
    },
    include: {
      producto: {
        include: {
          usuario: true,
        },
      },
    },
  });

  return recordatorios.filter((recordatorio) => {
    return (
      recordatorio.producto &&
      recordatorio.producto.cantidad <= recordatorio.cantidadMinima
    );
  });
}

// Función principal para crear notificaciones
export async function notificarStockBajo() {
  const productosConStockBajo = await obtenerProductosConStockBajo();

  for (const recordatorio of productosConStockBajo) {
    const { producto } = recordatorio;
    const { usuario } = producto;

    const titulo = `Stock bajo: ${producto.nombre}`;
    const mensaje = `El producto "${producto.nombre}" tiene solo ${producto.cantidad} unidades disponibles.`;

    if (usuario.tipoUsuario === 'INDIVIDUAL') {
      await prisma.notificaciones.create({
        data: {
          idUsuario: usuario.idUsuario,
          tipo: TipoNotificacion.STOCK_BAJO,
          titulo,
          mensaje,
        },
      });
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

    // Opcional: cambiar estado a 'enviado' para evitar notificaciones repetidas
    await prisma.recorStock.update({
      where: { idRecordatorio: recordatorio.idRecordatorio },
      data: { estado: 'atendido' },
    });
  }
}
