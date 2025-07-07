import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../utils/prismaClient";
import { JWT_SECRET, TOKEN_EXPIRES_IN } from "../config/token";
import { randomBytes } from "crypto";
import { sendPasswordResetEmail } from "./email.service";

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

  async solicitarReset(correo: string) {
    const usuario = await prisma.users.findUnique({
      where: { correo },
    });

    if (!usuario) {
      throw new Error("No existe una cuenta con ese correo");
    }

    const token = randomBytes(3).toString("hex"); // 6 caracteres (corto para ingresar manual)
    const ahora = new Date();
    const expiracion = new Date(ahora.getTime() + 15 * 60 * 1000); // 15 minutos

    await prisma.passwordReset.create({
      data: {
        idUsuario: usuario.idUsuario,
        token,
        fechaSolicitud: ahora,
        fechaExpiracion: expiracion,
      },
    });

    await sendPasswordResetEmail(usuario.correo, token);

    return {
      mensaje: "Solicitud registrada. Revisa tu correo para continuar.",

    };
  }


  async confirmarReset(token: string, nuevaContrasena: string) {
    const intento = await prisma.passwordReset.findFirst({
      where: {
        token,
        usado: false,
        fechaExpiracion: { gt: new Date() }, // no expirado
      },
      orderBy: { fechaSolicitud: "desc" }, // por si hay varios
    });

    if (!intento) {
      throw new Error("Token inválido o expirado");
    }

    const nuevaClaveHasheada = await hash(nuevaContrasena, 10);

    const resultado = await prisma.$transaction(async (tx) => {
      // Intentamos marcar como usado dentro de la transacción
      const actualizacion = await tx.passwordReset.updateMany({
        where: {
          idSeguridad: intento.idSeguridad,
          usado: false,
        },
        data: {
          usado: true,
        },
      });

      if (actualizacion.count === 0) {
        throw new Error("Este token ya fue utilizado.");
      }

      await tx.users.update({
        where: { idUsuario: intento.idUsuario },
        data: { password: nuevaClaveHasheada },
      });

      return { mensaje: "Contraseña restablecida con éxito." };
    });

    return resultado;
  }


}

export const validarCredenciales = async (email: string, password: string) => {
  const service = new LogService();
  return await service.login(email, password);
};
