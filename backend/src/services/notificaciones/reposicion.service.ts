import prisma from '../../utils/prismaClient';
import { TipoNotificacion } from '@prisma/client';

export async function notificarReposicionRecomendada() {
  const productosConStockBajo = await prisma.recorStock.findMany({
    include: {
      producto: {
        include: {
          usuario: true, // dueño del producto
        },
      },
    },
    where: {
      producto: {
        eliminadoEn: null,
        usuario: {
          tipoUsuario: 'EMPRESARIAL',
        },
      },
    },
  });

  for (const recordatorio of productosConStockBajo) {
    const producto = recordatorio.producto;
    const cantidadActual = producto.cantidad;
    const cantidadMinima = recordatorio.cantidadMinima;

    if (cantidadActual >= cantidadMinima) continue;

    const empresaId = producto.usuario.empresaId;
    if (!empresaId) continue;

    const miembros = await prisma.users.findMany({
      where: { empresaId },
    });

    const titulo = `Reposición recomendada: ${producto.nombre}`;
    const mensaje = `El producto "${producto.nombre}" tiene ${cantidadActual} unidades, por debajo del mínimo recomendado (${cantidadMinima}).`;

    for (const miembro of miembros) {
      await prisma.notificaciones.create({
        data: {
          idUsuario: miembro.idUsuario,
          tipo: TipoNotificacion.REPOSICION_RECOMENDADA,
          titulo,
          mensaje,
        },
      });
    }
  }

  console.log('✅ Notificaciones de reposición recomendada enviadas');
}
