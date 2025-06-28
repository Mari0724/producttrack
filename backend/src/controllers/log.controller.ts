import { Body, Controller, Post, Route, Tags } from "tsoa";
import { validarCredenciales } from "../services/log.service";
import { LoginRequest, LoginResponse } from "../interfaces/log.interface";
import { LogService } from "../services/log.service";
import { SolicitudResetDTO, ConfirmacionResetDTO } from "../models/PasswordResetDTO";


@Route("auth")
@Tags("Autenticación")
export class AuthController extends Controller {
  @Post("login")
  public async login(@Body() body: LoginRequest): Promise<LoginResponse> {
    const { user, token, requiereCompletarPerfil } = await validarCredenciales(
      body.correo,
      body.password
    );

    return {
      token,
      requiereCompletarPerfil,
      user: {
        idUsuario: user.idUsuario,
        username: user.username,
        correo: user.correo,
        rol: user.rol,
        tipoUsuario: user.tipoUsuario,
        rolEquipo: user.rolEquipo || "",
        perfilCompleto: user.perfilCompleto,
        empresaId: user.empresaId,
      },
    };
  }



  @Post("solicitar-reset")
  public async solicitarReset(
    @Body() body: SolicitudResetDTO
  ): Promise<{ mensaje: string }> {
    const service = new LogService();
    return await service.solicitarReset(body.correo);
  }


  @Post("confirmar-reset")
  public async confirmarReset(
    @Body() body: ConfirmacionResetDTO
  ): Promise<{ mensaje: string }> {
    const service = new LogService();
    return await service.confirmarReset(body.token, body.nuevaContrasena);
  }
}

