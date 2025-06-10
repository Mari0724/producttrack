import {
  Controller, Get, Post, Put, Delete, Route, Tags,
  Body, Path, Query, Security, Request
} from "tsoa";
import { EquipoService } from "../services/equipo.service";
import { EquipoDTO } from "../models/EquipoDTO";

const equipoService = new EquipoService();

@Route("equipo")
@Tags("Equipo")
export class EquipoController extends Controller {

  @Security("jwt")
  @Post()
  async crearEquipo(@Body() data: EquipoDTO, @Request() req: any) {
    if (!(req.user.tipoUsuario === "EMPRESARIAL" || req.user.rol === "ADMIN")) {
      this.setStatus(403);
      return { mensaje: "Acceso denegado. Solo empresas o administradores pueden crear usuarios de equipo." };
    }

    let empresaId: number;

    if (req.user.rol === "ADMIN") {
      if (!data.empresaId) {
        this.setStatus(400);
        return { mensaje: "El campo empresaId es obligatorio cuando el usuario es ADMIN." };
      }
      empresaId = data.empresaId;
    } else {
      empresaId = req.user.idUsuario;
    }

    return await equipoService.crearEquipo(data, empresaId);
  }

  @Security("jwt")
  @Get()
  async obtenerTodosLosEquipos(@Request() req: any) {
    if (!(req.user.tipoUsuario === "EMPRESARIAL" || req.user.rol === "ADMIN")) {
      this.setStatus(403);
      return { mensaje: "Acceso denegado. Solo empresas o administradores pueden ver el equipo." };
    }

    return await equipoService.obtenerTodosLosEquipos();
  }

  @Security("jwt")
  @Get("filtrar")
  async filtrarEquipos(
    @Query() nombreCompleto?: string,
    @Query() correo?: string,
    @Query() rolEquipo?: "LECTOR" | "COMENTARISTA" | "EDITOR",
    @Request() req?: any
  ) {
    if (!(req.user.tipoUsuario === "EMPRESARIAL" || req.user.rol === "ADMIN")) {
      this.setStatus(403);
      return { mensaje: "Acceso denegado. Solo empresas o administradores pueden filtrar el equipo." };
    }

    const empresaId = req.user.rol === "ADMIN" ? undefined : req.user.idUsuario;

    return await equipoService.filtrarEquipos({
      nombreCompleto,
      correo,
      rolEquipo,
      empresaId,
    });
  }

  @Security("jwt")
  @Get("{id}")
  async obtenerEquipoPorId(@Path() id: number, @Request() req: any) {
    if (!(req.user.tipoUsuario === "EMPRESARIAL" || req.user.rol === "ADMIN")) {
      this.setStatus(403);
      return { mensaje: "Acceso denegado. Solo empresas o administradores pueden ver miembros del equipo." };
    }

    const equipo = await equipoService.obtenerEquipoPorId(id);

    if (req.user.rol !== "ADMIN" && equipo.empresaId !== req.user.idUsuario) {
      this.setStatus(403);
      return { mensaje: "Este equipo no pertenece a tu empresa." };
    }

    return equipo;
  }

  @Security("jwt")
  @Put("{id}")
  async actualizarEquipo(@Path() id: number, @Body() data: Partial<EquipoDTO>, @Request() req: any) {
    if (!(req.user.tipoUsuario === "EMPRESARIAL" || req.user.rol === "ADMIN")) {
      this.setStatus(403);
      return { mensaje: "Acceso denegado. Solo empresas o administradores pueden actualizar el equipo." };
    }

    const empresaId = req.user.rol === "ADMIN" ? undefined : req.user.idUsuario;

    return await equipoService.actualizarEquipo(id, data, empresaId);
  }

  @Security("jwt")
  @Delete("{id}")
  async eliminarEquipo(@Path() id: number, @Request() req: any) {
    if (!(req.user.tipoUsuario === "EMPRESARIAL" || req.user.rol === "ADMIN")) {
      this.setStatus(403);
      return { mensaje: "Acceso denegado. Solo empresas o administradores pueden eliminar miembros del equipo." };
    }

    const equipo = await equipoService.obtenerEquipoPorId(id);

    if (req.user.rol !== "ADMIN" && equipo.empresaId !== req.user.idUsuario) {
      this.setStatus(403);
      return { mensaje: "Este equipo no pertenece a tu empresa." };
    }

    const empresaId = req.user.rol === "ADMIN" ? undefined : req.user.idUsuario;

    return await equipoService.eliminarEquipo(id, empresaId);
  }

  @Security("jwt")
  @Delete("todos/{empresaId}")
  async eliminarTodoElEquipo(@Path() empresaId: number, @Request() req: any) {
    if (req.user.rol !== "ADMIN" && req.user.idUsuario !== empresaId) {
      this.setStatus(403);
      return { mensaje: "Acceso denegado. No puedes eliminar todos los usuarios de otra empresa." };
    }

    return await equipoService.eliminarTodoElEquipo(empresaId);
  }
}
