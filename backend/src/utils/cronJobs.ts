import cron from 'node-cron';
import { notificarStockBajo } from '../services/notificaciones/stockBajo.service';

// Ejecuta todos los días a las 8:00 AM
cron.schedule('0 8 * * *', async () => {
  console.log('Ejecutando notificación de stock bajo...');
  await notificarStockBajo();
});
