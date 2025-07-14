import { Controller, Post, Get, Path, Route, Tags, Body, Patch } from 'tsoa';
import { notificarStockBajo } from '../services/notificaciones/stockBajo.service';
import { notificarProductoVencido } from '../services/notificaciones/productoVencido.service';
import { notificarComentarioProducto } from '../services/notificaciones/comentarioProducto.service';
import { notificarReposicionRecomendada } from '../services/notificaciones/reposicion.service';
import { notificarActualizacionApp } from '../services/notificaciones/actualizacion.service';
import prisma from '../utils/prismaClient';
import { TipoNotificacion } from '@prisma/client';

@Route('notificaciones')
@Tags('Notificaciones')
export class NotificacionesController extends Controller {
  @Post('/stock-bajo')
  public async enviarNotificacionStockBajo(
    @Body() body?: { productos?: { id: number }[] }
  ): Promise<{ mensaje: string }> {
    const productos = body?.productos;
    await notificarStockBajo(productos as any);
    return { mensaje: 'Notificaciones de stock bajo enviadas correctamente' };
  }

  @Post('/producto-vencido')
  public async enviarNotificacionProductoVencido(
    @Body() body?: { productos?: { id: number }[] }
  ): Promise<{ mensaje: string }> {
    const productos = body?.productos;

    if (productos && productos.length > 0) {
      await notificarProductoVencido(productos as any); // También puedes tipar mejor si quieres
    } else {
      await notificarProductoVencido(); // Si no se pasan productos, notifica todos los vencidos
    }

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
  public async enviarNotificacionReposicionRecomendada(
    @Body() body?: { productos?: { id: number }[] }
  ): Promise<{ mensaje: string }> {
    const productos = body?.productos;
    await notificarReposicionRecomendada(productos as any); // puedes tiparlo mejor si quieres
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
    const preferencias = await prisma.preferenciasNotificaciones.findFirst({
      where: { idUsuario },
    });

    console.log("🎯 Preferencias obtenidas del backend:", preferencias);

    if (!preferencias) {
      await prisma.preferenciasNotificaciones.create({
        data: {
          idUsuario,
          stockBajo: true,
          productoVencido: true,
          comentarios: true,
          reposicion: true,
          actualizacion: true,
        },
      });
    }

    const tiposPermitidos: TipoNotificacion[] = [
      ...(preferencias?.stockBajo ? [TipoNotificacion.STOCK_BAJO] : []),
      ...(preferencias?.productoVencido ? [TipoNotificacion.PRODUCTO_VENCIDO] : []),
      ...(preferencias?.comentarios ? [TipoNotificacion.COMENTARIO_EQUIPO] : []),
      ...(preferencias?.reposicion ? [TipoNotificacion.REPOSICION_RECOMENDADA] : []),
      ...(preferencias?.actualizacion ? [TipoNotificacion.ACTUALIZACION_APP] : []),
    ];

    const notificaciones = await prisma.notificaciones.findMany({
      where: {
        idUsuario,
        tipo: { in: tiposPermitidos },
      },
      orderBy: { fechaEnvio: 'desc' },
      take: 20,
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

  @Patch('/preferencias/{idUsuario}')
  public async actualizarPreferencias(
    @Path() idUsuario: number,
    @Body()
    body: {
      stockBajo?: boolean;
      productoVencido?: boolean;
      comentarios?: boolean;
      reposicion?: boolean;
      actualizacion?: boolean;
    }
  ): Promise<{ mensaje: string }> {
    await prisma.preferenciasNotificaciones.update({
      where: { idUsuario },
      data: {
        ...body,
      },
    });

    return { mensaje: 'Preferencias actualizadas correctamente' };
  }
}