import { Body, Delete,Controller, Get, Post, Route, Response, Tags, Query, SuccessResponse, Put, Path } from "tsoa";
import { userSchema } from "../models/UserModel";
import { zodValidate } from "../utils/zodValidate";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../services/user.service";
import { UserDTO } from "../models/UserDTO";
import { ResponseMessage, ResponseMessageWithToken } from "../interfaces/ResponseMenssage";


@Route("usuarios")//Todas las rutas dentro del controlador comenzarán con /usuarios.
@Tags("Usuarios")//Agrupa todas las rutas de este controlador bajo el tag Usuarios
export class UserController extends Controller {
  constructor() {
    super();
  }


  // 🔍 Obtener 
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

    if (estado && ["activo", "inactivo"].includes(estado)) {
      filters.estado = estado as "activo" | "inactivo";
    }

    if (rol && ["USUARIO", "EQUIPO", "ADMIN", "DESARROLLADOR"].includes(rol)) {
      filters.rol = rol as UserDTO["rol"];
    }

    if (tipoUsuario && ["INDIVIDUAL", "EMPRESARIAL"].includes(tipoUsuario)) {
      filters.tipoUsuario = tipoUsuario;
    }

    if (rolEquipo && ["LECTOR", "COMENTARISTA", "EDITOR"].includes(rolEquipo)) {
      filters.rolEquipo = rolEquipo;
    }

    const users = await getAllUsers(filters);
    return users;
  }


  // 🔍 Obtener un usuario por ID
  @Get("/{id}")
  public async getById(id: string): Promise<any> {
    // Intentar convertir el id a número entero
    const numericId = Number(id);

    // Validar si no es número o es NaN o menor o igual a 0 (opcional)
    if (isNaN(numericId) || numericId <= 0) {
      const res: ResponseMessage = { message: "ID inválido" };
      return res;
    }

    // Llamar servicio con id numérico
    const user = await getUserById(numericId);

    if (!user) {
      this.setStatus(404);
      const res: ResponseMessage = { message: "Usuario no encontrado" };
      return res;
    }
    return user;
  }

   // 🆕 Crear usuario
  @SuccessResponse("201", "Usuario creado correctamente")
  @Response("400", "Datos inválidos")
  @Post("/")
  public async create(@Body() requestBody: UserDTO): Promise<ResponseMessageWithToken> {
    const parsed = zodValidate(userSchema, requestBody);
    
    if (!parsed.success) {
      this.setStatus(400);
      return {
        message: "Datos inválidos",
        detalles: parsed.error,
      };
    }

    if (parsed.data.rol === "EQUIPO" && !parsed.data.empresaId) {
      this.setStatus(400);
      return {
        message: "empresaId es obligatorio para usuarios con rol EQUIPO",
      };
    }

    if (parsed.data.rol !== "EQUIPO" && parsed.data.empresaId) {
      this.setStatus(400);
      return {
        message: "Solo se debe asignar empresaId a usuarios con rol EQUIPO",
      };
    }
    

    try {
      const { user, token } = await createUser(parsed.data);
      this.setStatus(201);
      return {
        message: "Usuario creado correctamente",
        token, // <--- devuelvo token aquí
      };
    } catch (error: any) {
      this.setStatus(400);
      return {
        message: error.message || "Error al crear usuario",
      };
    }
  }


  //🐉 Modificar usuaro con su ID
  @Put("{id}")
  @SuccessResponse("200", "Usuario actualizado")
  @Response("404", "Usuario no encontrado")
  @Response("500", "Error del servidor")
  public async updateUsuario(
    @Path() id: number,
    @Body() body: Partial<UserDTO>
  ): Promise<ResponseMessage> {
    
    // 🚫 Validación especial para evitar mal uso del campo empresaId
    try {
      if (body.rol && body.rol !== "EQUIPO" && body.empresaId) {
        this.setStatus(400);
        return {
          message: "No se puede asignar empresaId a usuarios que no son del rol EQUIPO",
        };
    }
    
      // ✅ Actualizar usuario (incluye hash de contraseña si se envía)
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
  
  
  //🛑 Eliminar (soft delete) un usuario por su ID

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