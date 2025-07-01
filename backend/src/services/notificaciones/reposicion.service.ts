import prisma from '../../utils/prismaClient';
import { TipoNotificacion, productos as Producto } from '@prisma/client';
import { puedeNotificar } from '../../utils/notificaciones/preferenciasNotificaciones';

/**
 * Envía notificaciones de reposición recomendada, ya sea general o para productos específicos.
 * @param productosOpcionales Arreglo opcional de productos a verificar.
 */
export async function notificarReposicionRecomendada(productosOpcionales?: Producto[]) {
  let recordatorios: any[] = [];

  if (productosOpcionales && productosOpcionales.length > 0) {
    recordatorios = await prisma.recorStock.findMany({
      where: {
        productoId: {
          in: productosOpcionales.map((p) => p.id),
        },
      },
      include: {
        producto: {
          include: {
            usuario: true,
          },
        },
      },
    });
  } else {
    recordatorios = await prisma.recorStock.findMany({
      include: {
        producto: {
          include: {
            usuario: true,
          },
        },
      },
    });
  }

  for (const recordatorio of recordatorios) {
    const { producto } = recordatorio;
    const { usuario } = producto;
    const cantidadActual = producto.cantidad;
    const cantidadMinima = recordatorio.cantidadMinima;

    if (cantidadActual >= cantidadMinima) continue;

    const titulo = `Reposición recomendada: ${producto.nombre}`;
    const mensaje = `El producto "${producto.nombre}" tiene ${cantidadActual} unidades, por debajo del mínimo recomendado (${cantidadMinima}).`;

    if (usuario.tipoUsuario === 'INDIVIDUAL') {
      if (await puedeNotificar(usuario.idUsuario, 'reposicion')) {
        await prisma.notificaciones.create({
          data: {
            idUsuario: usuario.idUsuario,
            tipo: TipoNotificacion.REPOSICION_RECOMENDADA,
            titulo,
            mensaje,
          },
        });
      }
      continue;
    }

    if (usuario.tipoUsuario === 'EMPRESARIAL' && usuario.empresaId) {
      const miembros = await prisma.users.findMany({
        where: {
          empresaId: usuario.empresaId,
        },
      });

      for (const miembro of miembros) {
        if (await puedeNotificar(miembro.idUsuario, 'reposicion')) {
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
  }

  console.log('✅ Notificaciones de reposición recomendada enviadas correctamente');
}