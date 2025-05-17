import { Body, Controller, Get, Post, Route, Response, Tags, Query, SuccessResponse } from "tsoa";
import { userSchema } from "../models/UserModel";
import { zodValidate } from "../utils/zodValidate";
import { getAllUsers, getUserById, createUser } from "../services/user.service";
import { UserDTO } from "../models/UserDTO";



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
  @Query() rolEquipo?: "LECTOR" | "COMENTARISTA" | "EDITOR" | "ADMIN"
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

  if (rolEquipo && ["LECTOR", "COMENTARISTA", "EDITOR", "ADMIN"].includes(rolEquipo)) {
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
    this.setStatus(400);
    return { message: "ID inválido" };
  }

  // Llamar servicio con id numérico
  const user = await getUserById(numericId);

  if (!user) {
    this.setStatus(404);
    return { message: "Usuario no encontrado" };
  }

  return user;
}




   // 🆕 Crear usuario
  @SuccessResponse("201", "Usuario creado correctamente")
  @Response("400", "Datos inválidos")
  @Post("/")
  public async create(@Body() requestBody: UserDTO): Promise<any> {
    console.log("Request body recibido:", requestBody);
    const parsed = zodValidate(userSchema, requestBody);

    if (!parsed.success) {
      this.setStatus(400);
      return {
        message: "Datos inválidos",
        detalles: parsed.error, // Esto es el ZodError transformado, ya lo manejas
    };
}

    await createUser(parsed.data);
    this.setStatus(201);
    return { message: "Usuario creado correctamente" };
  }


}