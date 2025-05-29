import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../utils/prismaClient";
import { JWT_SECRET } from "../config/token"; // ✅ Importaste desde tu config central

export class LogService {
  async login(correo: string, password: string) {
    const user = await prisma.users.findUnique({
      where: { correo },
    });

    if (!user) throw new Error("Usuario no encontrado");

    const passwordValido = await compare(password, user.password);
    if (!passwordValido) throw new Error("Contraseña incorrecta");

    // Generar token
    const token = jwt.sign({ id: user.idUsuario, rol: user.rol }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // Verificar si necesita completar perfil
    let requiereCompletarPerfil = false;

    if (user.rol === "EQUIPO") {
      if (!user.telefono || !user.direccion) {
        requiereCompletarPerfil = true;
      }
    }

    return {
      user,
      token,
      requiereCompletarPerfil,
    };
  }
}

export const validarCredenciales = async (email: string, password: string) => {
  const service = new LogService();
  return await service.login(email, password);
};