import { Controller, Post, Route, Tags, Body } from 'tsoa';
import { notificarStockBajo } from '../services/notificaciones/notificar.StockBajo';
import { notificarProductoVencido } from '../services/notificaciones/notificar.ProductoVencido';
import { notificarComentarioProducto } from '../services/notificaciones/notificarComentarioProducto';
import { notificarReposicionRecomendada } from '../services/notificaciones/notificarReposicion';
import { notificarActualizacionApp } from '../services/notificaciones/notificarActualizacion';

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