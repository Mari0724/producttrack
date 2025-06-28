import prisma from '../../utils/prismaClient';
import { TipoNotificacion } from '@prisma/client';

export async function notificarProductoVencido() {
  const hoy = new Date();

  // 1. Buscar todos los productos vencidos sin eliminar
  const productos = await prisma.productos.findMany({
    where: {
      fechaVencimiento: { lt: hoy },
      eliminadoEn: null,
    },
    include: {
      usuario: true,
    },
  });

  // 2. Recorrer productos
  for (const producto of productos) {
    const usuario = producto.usuario;

    // Mensaje de la notificación
    const titulo = `Producto vencido: ${producto.nombre}`;
    const mensaje = `El producto "${producto.nombre}" ha vencido el ${producto.fechaVencimiento?.toLocaleDateString()}.`;

    // 3. Si es usuario individual
    if (usuario.tipoUsuario === 'INDIVIDUAL') {
      await prisma.notificaciones.create({
        data: {
          idUsuario: usuario.idUsuario,
          tipo: TipoNotificacion.PRODUCTO_VENCIDO,
          titulo,
          mensaje,
        },
      });
      continue;
    }

    // 4. Si es empresarial y tiene empresa asociada
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
            tipo: TipoNotificacion.PRODUCTO_VENCIDO,
            titulo,
            mensaje,
          },
        });
      }
    }
  }

  console.log('✅ Notificaciones de productos vencidos enviadas.');
}
