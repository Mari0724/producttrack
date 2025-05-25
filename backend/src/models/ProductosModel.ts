import { z } from "zod";

export const estadoEnum = z.enum(["DISPONIBLE", "AGOTADO", "RESERVADO", "VENCIDO"]);

// Esquema de validación con Zod
export const productoSchema = z.object({
  codigoBarras: z.string().min(3).trim(),
  codigoQR: z.string().min(3).trim(),
  nombre: z.string().min(1).trim(),
  descripcion: z.string().min(1).trim(),
  categoria: z.string().optional(),
  cantidad: z.number().int().nonnegative(),
  precio: z.string().refine((val) => /^\d+(\.\d{1,2})?$/.test(val), {
    message: "El precio debe ser un número válido con hasta 2 decimales",
  }),
  fechaAdquisicion: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "fechaAdquisicion debe ser una fecha válida (ISO string)",
  }),
  fechaVencimiento: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "fechaVencimiento debe ser una fecha válida (ISO string)",
  }),
  usuarioId: z.number().int().positive(),
  estado: estadoEnum,
  imagen: z.string().trim().url({ message: "imagen debe ser una URL válida" }),
});

// Tipo TypeScript para entrada de datos
export type ProductoInput = z.infer<typeof productoSchema>;
