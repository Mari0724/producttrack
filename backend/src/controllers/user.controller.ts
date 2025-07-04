import {
  Body, Delete, Controller, Get, Post, Route, Response, Tags,
  Query, SuccessResponse, Put, Path, Security
} from "tsoa";
import { userSchema } from "../models/UserModel";
import { zodValidate } from "../utils/zodValidate";
import {
  getAllUsers,
  changeUserPassword,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getEmpresaById,
  reactivarUsuario
} from "../services/user.service";
import { UserDTO, ChangePasswordDTO } from "../models/UserDTO";
import { ResponseMessage, ResponseMessageWithToken } from "../interfaces/ResponseMenssage";

@Route("usuarios")
@Tags("Usuarios")
export class UserController extends Controller {
  constructor() {
    super();
  }

  @Get("/")
  public async getAll(
    @Query() username?: string,
    @Query() correo?: string,
    @Query() nombreCompleto?: string,
    @Query() telefono?: string,
    @Query() nit?: string,
    @Query() estado?: string,
    @Query() rol?: string,
    @Query() tipoUsuario?: "INDIVIDUAL" | "EMPRESARIAL",
    @Query() rolEquipo?: "LECTOR" | "COMENTARISTA" | "EDITOR"
  ): Promise<any> {
    const filters: Partial<UserDTO> = {};

    if (username) filters.username = username;
    if (correo) filters.correo = correo;
    if (nombreCompleto) filters.nombreCompleto = nombreCompleto;
    if (telefono) filters.telefono = telefono;
    if (nit) filters.nit = nit;
    if (estado && ["activo", "inactivo"].includes(estado)) filters.estado = estado as "activo" | "inactivo";
    if (rol && ["USUARIO", "EQUIPO", "ADMIN", "DESARROLLADOR"].includes(rol)) filters.rol = rol as UserDTO["rol"];
    if (tipoUsuario && ["INDIVIDUAL", "EMPRESARIAL"].includes(tipoUsuario)) filters.tipoUsuario = tipoUsuario;
    if (rolEquipo && ["LECTOR", "COMENTARISTA", "EDITOR"].includes(rolEquipo)) filters.rolEquipo = rolEquipo;

    return await getAllUsers(filters);
  }

  @Get("/{id}")
  public async getById(id: string): Promise<any> {
    const numericId = Number(id);
    if (isNaN(numericId) || numericId <= 0) {
      return { message: "ID inválido" };
    }

    const user = await getUserById(numericId);
    if (!user) {
      this.setStatus(404);
      return { message: "Usuario no encontrado" };
    }

    return user;
  }

  @SuccessResponse("201", "Usuario creado correctamente")
  @Response("400", "Datos inválidos")
  @Post("/")
  public async create(@Body() requestBody: UserDTO): Promise<ResponseMessageWithToken> {
    const parsed = zodValidate(userSchema, requestBody);

    if (!parsed.success) {
      this.setStatus(400);
      return { message: "Datos inválidos", detalles: parsed.error };
    }

    if (parsed.data.rol === "EQUIPO" && !parsed.data.empresaId) {
      this.setStatus(400);
      return { message: "empresaId es obligatorio para usuarios con rol EQUIPO" };
    }

    if (parsed.data.rol !== "EQUIPO" && parsed.data.empresaId) {
      this.setStatus(400);
      return { message: "Solo se debe asignar empresaId a usuarios con rol EQUIPO" };
    }

    try {
      const { user, token } = await createUser(parsed.data);
      this.setStatus(201);
      return { message: "Usuario creado correctamente", token };
    } catch (error: any) {
      this.setStatus(400);
      return { message: error.message || "Error al crear usuario" };
    }
  }

  @Security("jwt")
  @Get("/empresa/{id}")
  public async getEmpresaByIdController(@Path() id: number): Promise<any> {
    try {
      const empresa = await getEmpresaById(id);
      return {
        idUsuario: empresa.idUsuario,
        nombreEmpresa: empresa.nombreEmpresa,
        nit: empresa.nit,
        correo: empresa.correo,
        direccion: empresa.direccion,
        telefono: empresa.telefono,
      };
    } catch (error: any) {
      this.setStatus(error.message.includes("no encontrada") ? 404 : 400);
      return { message: error.message };
    }
  }

  @Put("/cambiarContrasena")
  @Tags("Usuarios")
  public async cambiarContrasena(@Body() body: ChangePasswordDTO): Promise<{ message: string }> {
    try {
      const { id, currentPassword, newPassword } = body;
      return await changeUserPassword(id, currentPassword, newPassword);
    } catch (error: any) {
      console.error("Error en cambiarContrasena:", error);
      this.setStatus(400);
      return { message: error.message || "Error inesperado al cambiar la contraseña" };
    }
  }

  @Put("{id}")
  @SuccessResponse("200", "Usuario actualizado")
  @Response("404", "Usuario no encontrado")
  @Response("500", "Error del servidor")
  public async updateUsuario(@Path() id: number, @Body() body: Partial<UserDTO>): Promise<ResponseMessage> {
    try {
      if (body.rol && body.rol !== "EQUIPO" && body.empresaId) {
        this.setStatus(400);
        return { message: "No se puede asignar empresaId a usuarios que no son del rol EQUIPO" };
      }

      await updateUser(id, body);
      return { message: "Usuario actualizado correctamente" };
    } catch (error) {
      console.error(error);
      if (error instanceof Error && error.message.includes("no encontrado")) {
        this.setStatus(404);
        return { message: "Usuario no encontrado" };
      }

      this.setStatus(500);
      return { message: "Error al actualizar usuario" };
    }
  }

  @Put("/{id}/reactivar")
  @SuccessResponse("200", "Usuario reactivado")
  @Response("404", "Usuario no encontrado")
  @Response("400", "No se pudo reactivar el usuario")
  public async reactivarUsuario(@Path() id: number): Promise<ResponseMessage> {
    try {
      await reactivarUsuario(id);
      return { message: "Usuario reactivado correctamente" };
    } catch (error: any) {
      console.error(error);
      if (error.message.includes("no encontrado")) {
        this.setStatus(404);
        return { message: "Usuario no encontrado" };
      } else if (error.message.includes("ya está activo")) {
        this.setStatus(400);
        return { message: "El usuario ya está activo" };
      }

      this.setStatus(400);
      return { message: "No se pudo reactivar el usuario" };
    }
  }

  @Delete("{id}")
  @SuccessResponse("200", "Usuario eliminado")
  @Response("404", "Usuario no encontrado")
  @Response("500", "Error del servidor")
  public async deleteUsuario(@Path() id: number): Promise<ResponseMessage> {
    try {
      await deleteUser(id);
      return { message: "Usuario eliminado correctamente" };
    } catch (error) {
      console.error(error);
      if (error instanceof Error && error.message.includes("no encontrado")) {
        this.setStatus(404);
        return { message: "Usuario no encontrado" };
      }

      this.setStatus(500);
      return { message: "Error al eliminar usuario" };
    }
  }
}
