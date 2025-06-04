import { z } from "zod";

export const NutriScanSchema = z.object({
  usuarioId: z.number().int().positive(),  // id positivo y entero
  esAlimento: z.boolean(),
  consulta: z.string().min(1, "La consulta no puede estar vacía"),  // texto obligatorio
  respuesta: z.any(),  // podría hacerse más específico si sabes la estructura del JSON
  tipoAnalisis: z.enum(["ocr-gpt-only", "ocr-openfoodfacts-gpt"]),
});

// Para usarlo:
type NutriScanDTO = z.infer<typeof NutriScanSchema>;
