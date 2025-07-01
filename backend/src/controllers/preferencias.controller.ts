import { Controller, Get, Put, Path, Body, Route, Tags } from 'tsoa';
import prisma from '../utils/prismaClient';

@Route('preferencias-notificaciones')
@Tags('Preferencias de Notificaciones')
export class PreferenciasNotificacionesController extends Controller {
  @Get('{idUsuario}')
  public async obtenerPreferencias(
    @Path() idUsuario: number
  ): Promise<{
    stockBajo: boolean;
    productoVencido: boolean;
    comentarios: boolean;
    reposicion: boolean;
    actualizacion: boolean;
  }> {
    const prefs = await prisma.preferenciasNotificaciones.findUnique({
      where: { idUsuario },
    });

    return {
      stockBajo: prefs?.stockBajo ?? true,
      productoVencido: prefs?.productoVencido ?? true,
      comentarios: prefs?.comentarios ?? true,
      reposicion: prefs?.reposicion ?? true,
      actualizacion: prefs?.actualizacion ?? true,
    };
  }

  @Put('{idUsuario}')
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
    // Crea o actualiza
    await prisma.preferenciasNotificaciones.upsert({
      where: { idUsuario },
      update: body,
      create: {
        idUsuario,
        stockBajo: body.stockBajo ?? true,
        productoVencido: body.productoVencido ?? true,
        comentarios: body.comentarios ?? true,
        reposicion: body.reposicion ?? true,
        actualizacion: body.actualizacion ?? true,
      },
    });

    return { mensaje: 'Preferencias actualizadas correctamente' };
  }
}
