import { Controller, Post, Route, Tags, Body } from 'tsoa';
import { notificarStockBajo } from '../services/notificaciones/notificar.StockBajo';
import { notificarProductoVencido } from '../services/notificaciones/notificar.ProductoVencido';
import { notificarComentarioProducto } from '../services/notificaciones/notificarComentarioProducto';

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
}