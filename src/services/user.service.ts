import prisma from '../utils/prismaClient'; // cliente separado
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
  return await prisma.users.create({
    data: {
      ...data,
      estado: "activo", // Asignación directa desde backend
    },
  });
}

