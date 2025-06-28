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
  });

  for (const recordatorio of productosConStockBajo) {
    const { producto } = recordatorio;
    const { usuario } = producto;
    const cantidadActual = producto.cantidad;
    const cantidadMinima = recordatorio.cantidadMinima;

    // Si el stock no está bajo, no hacemos nada
    if (cantidadActual >= cantidadMinima) continue;

    const titulo = `Reposición recomendada: ${producto.nombre}`;
    const mensaje = `El producto "${producto.nombre}" tiene ${cantidadActual} unidades, por debajo del mínimo recomendado (${cantidadMinima}).`;

    // 🔸 Notificación para usuario INDIVIDUAL (solo al dueño del producto)
    if (usuario.tipoUsuario === 'INDIVIDUAL') {
      await prisma.notificaciones.create({
        data: {
          idUsuario: usuario.idUsuario,
          tipo: TipoNotificacion.REPOSICION_RECOMENDADA,
          titulo,
          mensaje,
        },
      });
      continue;
    }

    // 🔹 Notificación para todos los miembros EMPRESARIALES
    if (usuario.tipoUsuario === 'EMPRESARIAL' && usuario.empresaId) {
      const miembros = await prisma.users.findMany({
        where: {
          empresaId: usuario.empresaId,
        },
      });

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
  }

  console.log('✅ Notificaciones de reposición recomendada enviadas correctamente');
}