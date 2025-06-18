---
id: NutriScanModel
title: NutriScan Model
sidebar_label: NutriScan Model
---


Este archivo define el esquema de validación de datos para el módulo **NutriScan** utilizando la biblioteca [`zod`](https://zod.dev/). Sirve para validar y tipar la información tanto del **backend** como del **frontend** que se utiliza al realizar un análisis nutricional a partir de una imagen procesada por OCR.

---

## 🔍 Ubicación

`src/models/NutriScanModel.ts`

---

## 📌 Propósito

Establecer un esquema robusto para validar los datos que llegan al backend desde formularios o servicios. Esto evita errores comunes y garantiza la integridad del objeto `NutriScanDTO`.

---

## 🧩 Esquema completo (`NutriScanSchema`)

```ts
export const NutriScanSchema = z.object({
  usuarioId: z.number().int().positive(),
  esAlimento: z.boolean(),
  consulta: z.string().min(1, "La consulta no puede estar vacía"),
  respuesta: z.any(),
  tipoAnalisis: z.enum(["ocr-gpt-only", "ocr-openfoodfacts-gpt"]),
});
````

### ✏️ Descripción de campos

| Campo          | Tipo      | Validación / Reglas                                       |
| -------------- | --------- | --------------------------------------------------------- |
| `usuarioId`    | `number`  | Obligatorio, entero positivo. Usado internamente.         |
| `esAlimento`   | `boolean` | Indica si el análisis corresponde a un alimento.          |
| `consulta`     | `string`  | Texto extraído por OCR. No puede estar vacío.             |
| `respuesta`    | `any`     | Resultado generado por GPT o por la API externa.          |
| `tipoAnalisis` | Enum      | Solo acepta `"ocr-gpt-only"` o `"ocr-openfoodfacts-gpt"`. |

---

## 🎯 Esquema parcial (`NutriScanSchemaWithoutUserId`)

```ts
export const NutriScanSchemaWithoutUserId = NutriScanSchema.omit({ usuarioId: true });
```

> Este esquema se usa para validar los datos que provienen **del frontend**, ya que el `usuarioId` generalmente se infiere desde el token JWT o sesión activa, y no es enviado directamente.

---

## 🧬 Tipos derivados

```ts
export type NutriScanDTO = z.infer<typeof NutriScanSchema>; // Backend (incluye usuarioId)
export type NutriScanDTOInput = z.infer<typeof NutriScanSchemaWithoutUserId>; // Frontend
```

### 📘 Uso típico

| Tipo                | Uso esperado                                                |
| ------------------- | ----------------------------------------------------------- |
| `NutriScanDTO`      | Validación interna en servicios.                            |
| `NutriScanDTOInput` | Validación de formularios o peticiones HTTP desde frontend. |

---

## ✅ Ventajas del uso de Zod

* Permite validar entradas y generar tipos TypeScript automáticamente.
* Proporciona mensajes de error claros.
* Útil tanto en backend como frontend con librerías como React Hook Form o tRPC.

---

## 🧾 Ejemplo de validación en backend

```ts
import { NutriScanSchema } from "../models/NutriScanModel";

try {
  const datosValidados = NutriScanSchema.parse(req.body);
  // datosValidados ahora es un objeto seguro
} catch (error) {
  res.status(400).json({ error: error.errors });
}
```

---

## 📝 Resumen

| Elemento                       | Descripción                                        |
| ------------------------------ | -------------------------------------------------- |
| `NutriScanSchema`              | Validación completa (incluye `usuarioId`).         |
| `NutriScanSchemaWithoutUserId` | Versión para formularios del frontend.             |
| `NutriScanDTO`                 | Tipo TypeScript para uso interno.                  |
| `NutriScanDTOInput`            | Tipo para validación en interfaces o endpoints.    |
| Uso de `zod`                   | Validación sólida, tipado inferido y reutilizable. |

