import { Controller, Get, Post, Path, Route, Tags, Put, Body, Delete } from 'tsoa';
import {
  obtenerComentariosPorProducto,
  crearComentario,
  actualizarComentario,
  eliminarComentario,
} from '../services/comentarios.service';
import { ComentarioDTO } from '../models/ComentarioDTO';

@Route('comentarios')
@Tags('Comentarios')
export class ComentariosController extends Controller {
  @Get('{productoId}')
  public async getComentariosPorProducto(
    @Path() productoId: number
  ): Promise<ComentarioDTO[]> {
    return await obtenerComentariosPorProducto(productoId); // ← usa el service
  }

  @Post('/')
  public async crearComentario(
    @Body() body: { idUsuario: number; idProducto: number; comentario: string }
  ): Promise<ComentarioDTO> {
    return await crearComentario(body.idUsuario, body.idProducto, body.comentario);
  }

  @Put('{idComentario}')
  public async actualizarComentario(
    @Path() idComentario: number,
    @Body() body: { comentario: string }
  ): Promise<ComentarioDTO> {
    return await actualizarComentario(idComentario, body.comentario);
  }

  @Delete('{idComentario}')
  public async eliminarComentario(@Path() idComentario: number): Promise<{ mensaje: string }> {
    return await eliminarComentario(idComentario);
  }
}
