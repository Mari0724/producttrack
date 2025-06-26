import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../utils/prismaClient";
import { JWT_SECRET, TOKEN_EXPIRES_IN } from "../config/token";

export class LogService {
  async login(correo: string, password: string) {
    const user = await prisma.users.findUnique({
      where: { correo },
    });

    if (!user) throw new Error("Usuario no encontrado");

    const passwordValido = await compare(password, user.password);
    if (!passwordValido) throw new Error("Contraseña incorrecta");

    // Generar token
    const token = jwt.sign(
      {
        id: user.idUsuario,
        rol: user.rol,
        tipoUsuario: user.tipoUsuario,
        rolEquipo: user.rolEquipo,
        perfilCompleto: user.perfilCompleto,
        empresaId: user.empresaId, // 👈 este faltaba
      },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES_IN }
    );

    // Verificar si necesita completar perfil
    let requiereCompletarPerfil = false;
    if (user.rol === "EQUIPO") {
      if (!user.telefono || !user.direccion) {
        requiereCompletarPerfil = true;
      }
    }

    // ✅ Solo retornar los datos relevantes del usuario
    return {
      user: {
        idUsuario: user.idUsuario,
        username: user.username,
        correo: user.correo,
        rol: user.rol,
        tipoUsuario: user.tipoUsuario,
        rolEquipo: user.rolEquipo,
        perfilCompleto: user.perfilCompleto,
        empresaId: user.empresaId,
      },
      token,
      requiereCompletarPerfil,
    };
  }
}

export const validarCredenciales = async (email: string, password: string) => {
  const service = new LogService();
  return await service.login(email, password);
};
