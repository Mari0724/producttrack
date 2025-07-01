import prisma from '../prismaClient';

export async function puedeNotificar(idUsuario: number, tipo: string): Promise<boolean> {
  const prefs = await prisma.preferenciasNotificaciones.findUnique({
    where: { idUsuario },
  });

  if (!prefs) return true; // Si no hay preferencia, asumimos que sí quiere

  switch (tipo) {
    case 'STOCK_BAJO':
      return prefs.stockBajo;
    case 'PRODUCTO_VENCIDO':
      return prefs.productoVencido;
    case 'COMENTARIOS':
      return prefs.comentarios;
    case 'REPOSICION':
      return prefs.reposicion;
    case 'ACTUALIZACION':
      return prefs.actualizacion;
    default:
      return true;
  }
}
