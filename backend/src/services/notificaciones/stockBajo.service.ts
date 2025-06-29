// stockBajo.service.ts
import prisma from '../../utils/prismaClient';
import { TipoNotificacion, EstadoRecordatorio, productos as Producto } from '@prisma/client';

/**
 * Envía notificaciones de stock bajo de forma general o para productos específicos.
 * @param productosOpcionales Arreglo opcional de productos a verificar (usado desde el update).
 */
export async function notificarStockBajo(productosOpcionales?: Producto[]) {
  if (productosOpcionales && productosOpcionales.length > 0) {
    // Modo directo (desde updateProducto, etc.)
    for (const producto of productosOpcionales) {
      const recordatorio = await prisma.recorStock.findFirst({
        where: {
          productoId: producto.id,
          estado: EstadoRecordatorio.PENDIENTE,
        },
        include: {
          producto: {
            include: {
              usuario: true,
            },
          },
        },
      });

      if (
        recordatorio &&
        producto.cantidad <= recordatorio.cantidadMinima
      ) {
        const { usuario } = recordatorio.producto;

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
        } else {
          const miembros = await prisma.users.findMany({
            where: { empresaId: usuario.empresaId },
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

        await prisma.recorStock.update({
          where: {
            idRecordatorio: recordatorio.idRecordatorio,
          },
          data: {
            estado: EstadoRecordatorio.ENVIADO,
          },
        });
      }
    }
  } else {
    // 🕒 Modo general (manual o programado)
    const recordatoriosPendientes = await prisma.recorStock.findMany({
      where: {
        estado: EstadoRecordatorio.PENDIENTE,
      },
      include: {
        producto: {
          include: {
            usuario: true,
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
          await prisma.notificaciones.create({
            data: {
              idUsuario: usuario.idUsuario,
              tipo: TipoNotificacion.STOCK_BAJO,
              titulo,
              mensaje,
            },
          });
        } else {
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

        await prisma.recorStock.update({
          where: {
            idRecordatorio: recordatorio.idRecordatorio,
          },
          data: {
            estado: EstadoRecordatorio.ENVIADO,
          },
        });
      }
    }
  }
}
