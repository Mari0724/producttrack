import { z } from "zod";

// Esquema completo (incluye usuarioId)
export const NutriScanSchema = z.object({
  usuarioId: z.number().int().positive(), // Se usará en el backend
  esAlimento: z.boolean(),
  consulta: z.string().min(1, "La consulta no puede estar vacía"),
  respuesta: z.any(),
  tipoAnalisis: z.enum(["ocr-gpt-only", "ocr-openfoodfacts-gpt"]),
});

// Esquema para el formulario de entrada (frontend no envía usuarioId)
export const NutriScanSchemaWithoutUserId = NutriScanSchema.omit({ usuarioId: true });

// Tipos generados a partir de los esquemas
export type NutriScanDTO = z.infer<typeof NutriScanSchema>; // completo (backend)
export type NutriScanDTOInput = z.infer<typeof NutriScanSchemaWithoutUserId>; // solo lo que viene del frontend
