import prisma from "../utils/prismaClient";
import { NutriScanSchema } from "../models/NutriScanModel";

export class NutriScanService {
  // ✅ Crear registro con isTest y usuarioId
  async create(data: unknown, usuarioId: number, isTest: boolean) {
    try {
      const parsedData = NutriScanSchema.parse(data);

      if (parsedData.respuesta === undefined || parsedData.respuesta === null) {
        throw new Error("El campo 'respuesta' es obligatorio y no puede estar vacío.");
      }

      const nuevoRegistro = await prisma.nutriScan.create({
        data: {
          ...parsedData,
          usuarioId,
          isTest,
          respuesta: parsedData.respuesta ?? {}, // o un valor válido
        },
      });
      return nuevoRegistro;
    } catch (error) {
      throw new Error(`Error al crear el registro: ${(error as Error).message}`);
    }
  }

  // ✅ ADMIN: ver todos los registros de prueba
  async findTestsOnly() {
    return prisma.nutriScan.findMany({
      where: { isTest: true },
    });
  }

  // ✅ DESARROLLADOR: ver sus propios registros de prueba
  async findTestsByUser(usuarioId: number) {
    return prisma.nutriScan.findMany({
      where: {
        isTest: true,
        usuarioId,
      },
    });
  }

  // ✅ Buscar por ID (solo ADMIN en controller)
  async findById(id: number) {
    return prisma.nutriScan.findUnique({
      where: { id },
    });
  }

  // ✅ Actualizar (solo ADMIN en controller)
  async update(id: number, data: unknown) {
    try {
      const parsedData = NutriScanSchema.partial().parse(data);
      const actualizado = await prisma.nutriScan.update({
        where: { id },
        data: parsedData,
      });
      return actualizado;
    } catch (error) {
      throw new Error(`Error al actualizar el registro: ${(error as Error).message}`);
    }
  }

  // ✅ Eliminar (solo ADMIN en controller)
  async delete(id: number) {
    await prisma.nutriScan.delete({
      where: { id },
    });
    return { message: `Registro con id ${id} eliminado.` };
  }
}
