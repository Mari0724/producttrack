import prisma from "../utils/prismaClient";
import { NutriScanSchema } from "../models/NutriScanModel";

export class NutriScanService {
 async create(data: unknown) {
  try {
    const parsedData = NutriScanSchema.parse(data);

    // Validamos que respuesta esté presente
    if (parsedData.respuesta === undefined || parsedData.respuesta === null) {
      throw new Error("El campo 'respuesta' es obligatorio y no puede estar vacío.");
    }

    const nuevoRegistro = await prisma.nutriScan.create({
     data: {
    ...parsedData,
    respuesta: parsedData.respuesta ?? {}, // o un valor válido
  }
    });
    return nuevoRegistro;
  } catch (error) {
    throw new Error(`Error al crear el registro: ${(error as Error).message}`);
  }
}


  async findAll() {
    return prisma.nutriScan.findMany();
  }

  async findById(id: number) {
    return prisma.nutriScan.findUnique({
      where: { id },
    });
  }

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

  async delete(id: number) {
    await prisma.nutriScan.delete({
      where: { id },
    });
    return { message: `Registro con id ${id} eliminado.` };
  }
}
