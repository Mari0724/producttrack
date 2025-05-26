import prisma from '../utils/prismaClient'; // cliente separado
import bcrypt from 'bcryptjs';


export async function validarCredenciales(email: string, password: string) {
  const usuario = await prisma.users.findUnique({
    where: { correo: email },
  });

  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  const esValida = await bcrypt.compare(password, usuario.password);
  if (!esValida) {
    throw new Error("Contraseña incorrecta");
  }

  return {
    id: usuario.idUsuario,
    username: usuario.username,
    rol: usuario.rol,
    tipoUsuario: usuario.tipoUsuario || undefined,
    rolEquipo: usuario.rolEquipo || undefined,
  };
}
