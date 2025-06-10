import prisma from '../../utils/prismaClient';
import { TipoNotificacion } from '@prisma/client';

export async function notificarProductoVencido() {
  const hoy = new Date();

  const productosVencidos = await prisma.productos.findMany({
    where: {
      fechaVencimiento: { lt: hoy },
      eliminadoEn: null,
      usuario: {
        tipoUsuario: 'EMPRESARIAL',
      },
    },
    include: {
      usuario: true,
    },
  });

  for (const producto of productosVencidos) {
    const { usuario } = producto;

    if (!usuario.empresaId) continue;

    const miembros = await prisma.users.findMany({
      where: {
        empresaId: usuario.empresaId,
      },
    });

    const titulo = `Producto vencido: ${producto.nombre}`;
    const mensaje = `El producto "${producto.nombre}" ha vencido el ${producto.fechaVencimiento?.toLocaleDateString()}.`;

    for (const miembro of miembros) {
      await prisma.notificaciones.create({
        data: {
          idUsuario: miembro.idUsuario,
          tipo: TipoNotificacion.PRODUCTO_VENCIDO,
          titulo,
          mensaje,
        },
      });
    }
  }
}
