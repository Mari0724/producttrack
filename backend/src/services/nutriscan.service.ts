import prisma from "../utils/prismaClient";
import { NutriScanSchemaWithoutUserId } from "../models/NutriScanModel";
import { OpenFoodFactsService } from "./openfoodfacts.service";
import { gptService } from "./gpt.service";

export class NutriScanService {
  async create(data: unknown, usuarioId: number, isTest: boolean) {
    try {
      const parsed = NutriScanSchemaWithoutUserId.parse(data);
      const nombreProducto = parsed.consulta.trim();

      // Consultar OpenFoodFacts
      const resultadosOpenFood = await OpenFoodFactsService.buscarAlimentoPorNombre(nombreProducto);

      // Generar respuesta nutricional
      const respuestaGenerada = {
        mensaje: await gptService.generarMensajeNutricional(nombreProducto, resultadosOpenFood),
        generadoPor: isTest ? "simulado" : "gpt",
      };

      // Guardar en la base de datos
      const nuevo = await prisma.nutriScan.create({
        data: {
          usuarioId,
          isTest,
          esAlimento: parsed.esAlimento,
          consulta: nombreProducto,
          tipoAnalisis: "auto",
          respuesta: respuestaGenerada,
        },
      });

      return nuevo;
    } catch (error) {
      console.error("❌ Error en NutriScanService:", error);
      throw new Error(`Error al crear el análisis: ${(error as Error).message}`);
    }
  }

  async findTestsOnly() {
    return prisma.nutriScan.findMany({ where: { isTest: true } });
  }

  async findTestsByUser(usuarioId: number) {
    return prisma.nutriScan.findMany({ where: { isTest: true, usuarioId } });
  }

  async findById(id: number) {
    return prisma.nutriScan.findUnique({ where: { id } });
  }

  async update(id: number, data: unknown) {
    const parsed = NutriScanSchemaWithoutUserId.partial().parse(data);
    return prisma.nutriScan.update({ where: { id }, data: parsed });
  }

  async delete(id: number) {
    await prisma.nutriScan.delete({ where: { id } });
    return { message: `Registro con id ${id} eliminado.` };
  }
}
