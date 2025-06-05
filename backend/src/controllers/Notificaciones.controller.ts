import { Controller, Post, Route, Tags } from 'tsoa';
import { notificarStockBajo } from '../services/notificaciones/notificar.StockBajo';

@Route('notificaciones')
@Tags('Notificaciones')
export class NotificacionesController extends Controller {
  @Post('/stock-bajo')
  public async enviarNotificacionStockBajo(): Promise<{ mensaje: string }> {
    await notificarStockBajo();
    return { mensaje: 'Notificaciones de stock bajo enviadas correctamente' };
  }
}
