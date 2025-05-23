import prisma from '../utils/prismaClient'; // cliente separado
import { v2 as cloudinary } from 'cloudinary';
import { UserDTO } from "../models/UserDTO"; 


// 🔍 Obtener 
export async function getAllUsers(filters: Partial<UserDTO>) {
  return await prisma.users.findMany({
    where: {
      ...(filters.username && { username: { contains: filters.username, mode: 'insensitive' } }),
      ...(filters.correo && { correo: { contains: filters.correo, mode: 'insensitive' } }),
      ...(filters.nombreCompleto && { nombreCompleto: { contains: filters.nombreCompleto, mode: 'insensitive' } }),
      ...(filters.telefono && { telefono: { contains: filters.telefono } }),
      ...(filters.nit && { nit: { contains: filters.nit } }),
      ...(filters.estado && { estado: filters.estado }),
      ...(filters.rol && { rol: filters.rol }),
      ...(filters.tipoUsuario && { tipoUsuario: filters.tipoUsuario }),
      ...(filters.rolEquipo && { rolEquipo: filters.rolEquipo }),
    },
  });
}


// 🔍 Obtener un usuario por ID
export async function getUserById(id: number) {
  return await prisma.users.findUnique({
    where: { idUsuario: id },
  });
}


// 🆕 Crear usuario
export async function createUser(data: UserDTO) {
  if (data.rol === "EQUIPO") {
    if (!data.empresaId) throw new Error("empresaId es obligatorio para rol EQUIPO");

    const empresa = await prisma.users.findUnique({
      where: { idUsuario: data.empresaId },
    });

    if (!empresa || empresa.tipoUsuario !== "EMPRESARIAL") {
      throw new Error("La empresa especificada no existe o no es de tipo EMPRESARIAL");
    }
  }

  return await prisma.users.create({
    data: {
      ...data,
      estado: "activo",
    },
  });
}


// 🆙 Actualizar usuario
export async function updateUser(id: number, data: Partial<UserDTO>) {
  const user = await prisma.users.findUnique({
    where: { idUsuario: id },
  });

  if (!user) throw new Error("Usuario no encontrado");

  // ❌ No permitir cambiar el rol
  if (data.rol && data.rol !== user.rol) {
    throw new Error("No está permitido cambiar el rol del usuario.");
  }

  // 🔄 Si hay una nueva fotoPerfil y la antigua existe, eliminarla de Cloudinary
  if (data.fotoPerfil && user.fotoPerfil) {
    const oldUrl = user.fotoPerfil;
    const parts = oldUrl.split('/upload/');
    if (parts.length > 1) {
      const pathWithExt = parts[1];
      const publicId = pathWithExt.replace(/\.[^/.]+$/, "");

      try {
        await cloudinary.uploader.destroy(publicId);
        console.log(`Imagen antigua eliminada: ${publicId}`);
      } catch (error) {
        console.error("Error eliminando imagen antigua:", error);
      }
    }
  }

  // ✅ Actualizar usuario
  return await prisma.users.update({
    where: { idUsuario: id },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });
}


// ✖️ Eliminar usuario
export async function deleteUser(id: number) {
  const user = await prisma.users.findUnique({
    where: { idUsuario: id },
  });

  if (!user) throw new Error("Usuario no encontrado");

  return await prisma.users.update({
    where: { idUsuario: id },
    data: {
      deletedAt: new Date(),
      estado: "inactivo",  // Opcional: para reflejar que está eliminado/inactivo
      updatedAt: new Date(),
    },
  });
}


