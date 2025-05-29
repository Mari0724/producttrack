import { Controller, Get, Post, Put, Delete, Route, Tags, Body, Path, Query, Security, Request } from "tsoa";
import { EquipoService } from "../services/equipo.service";
import { EquipoDTO } from "../models/EquipoDTO";

const equipoService = new EquipoService();

@Route("equipo")
@Tags("Equipo")
export class EquipoController extends Controller {

  // Crear nuevo usuario tipo equipo
  @Security("jwt")
  @Post()
  async crearEquipo(@Body() data: EquipoDTO, @Request() req: any) {
    if (req.user.tipoUsuario !== "EMPRESARIAL") {
      this.setStatus(403);
      return { mensaje: "Acceso denegado. Solo las empresas pueden crear usuarios de equipo." };
    }

    return await equipoService.crearEquipo(data, req.user.idUsuario);
  }

  // Obtener todos los equipos
  @Security("jwt")
  @Get()
  async obtenerTodosLosEquipos(@Request() req: any) {
    if (req.user.tipoUsuario !== "EMPRESARIAL") {
      this.setStatus(403);
      return { mensaje: "Acceso denegado. Solo las empresas pueden ver su equipo." };
    }

    return await equipoService.obtenerTodosLosEquipos();
  }

  // Filtrar equipos por campos
  @Security("jwt")
  @Get("filtrar")
  async filtrarEquipos(
    @Query() nombreCompleto?: string,
    @Query() correo?: string,
    @Query() rolEquipo?: "LECTOR" | "COMENTARISTA" | "EDITOR",
    @Request() req?: any
  ) {
    if (req.user.tipoUsuario !== "EMPRESARIAL") {
      this.setStatus(403);
      return { mensaje: "Acceso denegado. Solo las empresas pueden filtrar su equipo." };
    }

    return await equipoService.filtrarEquipos({
      nombreCompleto,
      correo,
      rolEquipo,
      empresaId: req.user.idUsuario,
    });
  }

  // Obtener un equipo por ID
  @Security("jwt")
  @Get("{id}")
  async obtenerEquipoPorId(@Path() id: number, @Request() req: any) {
    if (req.user.tipoUsuario !== "EMPRESARIAL") {
      this.setStatus(403);
      return { mensaje: "Acceso denegado. Solo las empresas pueden ver miembros de su equipo." };
    }

    const equipo = await equipoService.obtenerEquipoPorId(id);

    if (equipo.empresaId !== req.user.idUsuario) {
      this.setStatus(403);
      return { mensaje: "Este equipo no pertenece a tu empresa." };
    }

    return equipo;
  }

  // Actualizar equipo
  @Security("jwt")
  @Put("{id}")
  async actualizarEquipo(@Path() id: number, @Body() data: Partial<EquipoDTO>, @Request() req: any) {
    if (req.user.tipoUsuario !== "EMPRESARIAL") {
      this.setStatus(403);
      return { mensaje: "Acceso denegado. Solo las empresas pueden actualizar su equipo." };
    }

    return await equipoService.actualizarEquipo(id, data, req.user.idUsuario);
  }

  // Eliminar equipo
  @Security("jwt")
  @Delete("{id}")
  async eliminarEquipo(@Path() id: number, @Request() req: any) {
    if (req.user.tipoUsuario !== "EMPRESARIAL") {
      this.setStatus(403);
      return { mensaje: "Acceso denegado. Solo las empresas pueden eliminar miembros del equipo." };
    }

    const equipo = await equipoService.obtenerEquipoPorId(id);

    if (equipo.empresaId !== req.user.idUsuario) {
      this.setStatus(403);
      return { mensaje: "Este equipo no pertenece a tu empresa." };
    }

    return await equipoService.eliminarEquipo(id);
  }
}
