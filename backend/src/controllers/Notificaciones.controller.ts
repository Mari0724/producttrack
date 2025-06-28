import { Controller, Post, Get, Path, Route, Tags, Body, Patch } from 'tsoa';
import { notificarStockBajo } from '../services/notificaciones/stockBajo.service';
import { notificarProductoVencido } from '../services/notificaciones/productoVencido.service';
import { notificarComentarioProducto } from '../services/notificaciones/comentarioProducto.service';
import { notificarReposicionRecomendada } from '../services/notificaciones/reposicion.service';
import { notificarActualizacionApp } from '../services/notificaciones/actualizacion.service';
import prisma from '../utils/prismaClient';

@Route('notificaciones')
@Tags('Notificaciones')
export class NotificacionesController extends Controller {
  @Post('/stock-bajo')
  public async enviarNotificacionStockBajo(): Promise<{ mensaje: string }> {
    await notificarStockBajo();
    return { mensaje: 'Notificaciones de stock bajo enviadas correctamente' };
  }

  @Post('/producto-vencido')
  public async enviarNotificacionProductoVencido(): Promise<{ mensaje: string }> {
    await notificarProductoVencido();
    return { mensaje: 'Notificaciones de producto vencido enviadas correctamente' };
  }

  @Post('/comentario-producto')
  public async enviarNotificacionComentarioProducto(
    @Body() body: { idComentario: number }
  ): Promise<{ mensaje: string }> {
    await notificarComentarioProducto(body.idComentario);
    return { mensaje: 'Notificaciones de comentario enviadas correctamente' };
  }

  @Post('/reposicion-recomendada')
  public async enviarNotificacionReposicionRecomendada(): Promise<{ mensaje: string }> {
    await notificarReposicionRecomendada();
    return { mensaje: 'Notificaciones de reposición recomendada enviadas correctamente' };
  }
  
  @Post('/actualizacion-app')
  public async enviarNotificacionActualizacionApp(
    @Body() body: { titulo: string; mensaje: string }
  ): Promise<{ mensaje: string }> {
    const { titulo, mensaje } = body;
    await notificarActualizacionApp(titulo, mensaje);
    return { mensaje: 'Notificaciones de actualización de la app enviadas correctamente' };
  }

  @Get('/usuario/{idUsuario}')
  public async obtenerNotificacionesPorUsuario(
    @Path() idUsuario: number
  ): Promise<
    {
      idNotificacion: number;
      tipo: string;
      titulo: string;
      mensaje: string;
      leida: boolean;
      fechaEnvio: Date;
    }[]
  > {
    const notificaciones = await prisma.notificaciones.findMany({
      where: {
        idUsuario,
      },
      orderBy: {
        fechaEnvio: 'desc',
      },
      take: 20, // puedes ajustar el límite
    });

    return notificaciones.map((n) => ({
      idNotificacion: n.idNotificacion,
      tipo: n.tipo,
      titulo: n.titulo,
      mensaje: n.mensaje,
      leida: n.leida,
      fechaEnvio: n.fechaEnvio,
    }));
  }

  @Patch('/{idNotificacion}')
  public async marcarComoLeida(
    @Path() idNotificacion: number
  ): Promise<{ mensaje: string }> {
    await prisma.notificaciones.update({
      where: {
        idNotificacion,
      },
      data: {
        leida: true,
      },
    });

    return { mensaje: 'Notificación marcada como leída' };
  }
}