import prisma from '../../utils/prismaClient';
import { TipoNotificacion, EstadoRecordatorio, productos as Producto } from '@prisma/client';
import { puedeNotificar } from '../../utils/notificaciones/preferenciasNotificaciones';

/**
 * Envía notificaciones de stock bajo de forma general o para productos específicos.
 * @param productosOpcionales Arreglo opcional de productos a verificar (usado desde el update).
 */
export async function notificarStockBajo(productosOpcionales?: Producto[]) {
  const productosVerificar = productosOpcionales && productosOpcionales.length > 0
    ? productosOpcionales
    : null;

  const recordatorios = productosVerificar
    ? await Promise.all(
        productosVerificar.map((producto) =>
          prisma.recorStock.findFirst({
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
          })
        )
      )
    : await prisma.recorStock.findMany({
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

  for (const recordatorio of recordatorios) {
    if (
      recordatorio &&
      recordatorio.producto &&
      recordatorio.producto.cantidad <= recordatorio.cantidadMinima
    ) {
      const { producto } = recordatorio;
      const { usuario } = producto;

      const titulo = `Stock bajo: ${producto.nombre}`;
      const mensaje = `El producto "${producto.nombre}" tiene solo ${producto.cantidad} unidades disponibles.`;

      if (usuario.tipoUsuario === 'INDIVIDUAL') {
        const permitido = await puedeNotificar(usuario.idUsuario, 'STOCK_BAJO');
        if (!permitido) continue;

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
          const permitido = await puedeNotificar(miembro.idUsuario, 'STOCK_BAJO');
          if (!permitido) continue;

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
