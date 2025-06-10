import { Controller, Post, Route, Tags, Body } from 'tsoa';
import { notificarStockBajo } from '../services/notificaciones/stockBajo.service';
import { notificarProductoVencido } from '../services/notificaciones/productoVencido.service';
import { notificarComentarioProducto } from '../services/notificaciones/comentarioProducto.service';
import { notificarReposicionRecomendada } from '../services/notificaciones/reposicion.service';
import { notificarActualizacionApp } from '../services/notificaciones/actualizacion.service';

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
}