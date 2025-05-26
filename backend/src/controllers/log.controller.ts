import { Body, Controller, Post, Route, Tags } from "tsoa";
import { generarToken } from "../services/token.service";
import { validarCredenciales } from "../services/log.service";
import { LoginRequest, LoginResponse } from "../interfaces/log.interface";

@Route("auth")
@Tags("Autenticación")
export class AuthController extends Controller {
  @Post("login")
  public async login(@Body() body: LoginRequest): Promise<LoginResponse> {
    const usuario = await validarCredenciales(body.email, body.password);
    const token = generarToken(usuario);

    return {
      token,
      username: usuario.username,
      rol: usuario.rol,
      tipoUsuario: usuario.tipoUsuario,
      rolEquipo: usuario.rolEquipo,
    };
  }
}
