---
id: NutriScanModel
title: NutriScan Model
sidebar_label: NutriScan Model
---

# NutriScanModel

Este archivo define los **esquemas de validación** y **tipos TypeScript** para el módulo **NutriScan** usando [`zod`](https://zod.dev/). Estos esquemas se usan para validar entradas en endpoints del backend y formularios del frontend, y garantizan que los datos enviados para análisis nutricionales sean válidos, completos y seguros.

---

## 🔍 Ubicación

`src/models/NutriScanModel.ts`

---

## 🎯 Propósito

- Validar los datos enviados desde el frontend (evita errores y asegura integridad).
- Facilitar el tipado automático en TypeScript con `z.infer`.
- Estandarizar la estructura del objeto NutriScan para el backend.

---

## 🧩 Esquema completo (`NutriScanSchema`)

```ts
export const NutriScanSchema = z.object({
  usuarioId: z.number().int().positive(),
  esAlimento: z.boolean(),
  consulta: z.string().min(1, "La consulta no puede estar vacía"),
  respuesta: z.object({
    mensaje: z.string(),
    generadoPor: z.string(),
  }),
  tipoAnalisis: z.enum(["ocr-gpt-only", "ocr-openfoodfacts-gpt"]),
});
````

### 🔍 Campos

| Campo          | Tipo      | Descripción                                                          |
| -------------- | --------- | -------------------------------------------------------------------- |
| `usuarioId`    | `number`  | ID positivo del usuario. Solo se usa internamente en el backend.     |
| `esAlimento`   | `boolean` | Si el análisis se refiere a un alimento.                             |
| `consulta`     | `string`  | Texto OCR o nombre proporcionado del producto. No puede estar vacío. |
| `respuesta`    | `object`  | Objeto con el mensaje generado y quién lo generó (GPT o simulado).   |
| `tipoAnalisis` | `enum`    | Tipo de flujo usado: `"ocr-gpt-only"` o `"ocr-openfoodfacts-gpt"`.   | 
| `isTest`       | `boolean`  | Indica si el análisis fue generado en modo prueba o por un desarrollador. |

---

## 🧪 Esquema de entrada (`NutriScanSchemaWithoutUserId`)

```ts
export const NutriScanSchemaWithoutUserId = NutriScanSchema.omit({ usuarioId: true });
```

> Este esquema se utiliza para validar entradas que vienen desde el frontend, ya que el `usuarioId` se infiere desde el token del usuario autenticado.

---

## ✏️ Esquema de actualización (`NutriScanUpdateSchema`)

```ts
export const NutriScanUpdateSchema = z.object({
  consulta: z.string().min(1).optional(),
  esAlimento: z.boolean().optional(),
  tipoAnalisis: z.enum(["ocr-gpt-only", "ocr-openfoodfacts-gpt"]).optional(),
  isTest: z.boolean().optional(),
  respuesta: z.object({
    mensaje: z.string(),
    generadoPor: z.string(),
  }).optional(),
});
```

> Permite realizar actualizaciones parciales en los análisis ya existentes. Todos los campos son opcionales.

---

## 🧬 Tipos generados

```ts
export type NutriScanDTO = z.infer<typeof NutriScanSchema>;
export type NutriScanDTOInput = z.infer<typeof NutriScanSchemaWithoutUserId>;
export type NutriScanDTOUpdate = z.infer<typeof NutriScanUpdateSchema>;
```

| Tipo                 | Uso previsto                              |
| -------------------- | ----------------------------------------- |
| `NutriScanDTO`       | Backend: objeto completo con `usuarioId`. |
| `NutriScanDTOInput`  | Frontend: objeto enviado al crear.        |
| `NutriScanDTOUpdate` | Backend: para actualizaciones parciales.  |

---

## ✅ Ventajas de usar Zod

* Validación robusta y personalizada con mensajes claros.
* Generación automática de tipos TypeScript.
* Esquemas reutilizables en múltiples capas del sistema.

---

## 🧾 Ejemplo de validación en backend

```ts
import { NutriScanSchema } from "../models/NutriScanModel";

try {
  const datosValidados = NutriScanSchema.parse(req.body);
  // datosValidados ahora es seguro para guardar en base de datos
} catch (error) {
  res.status(400).json({ error: error.errors });
}
```

---

## 📌 Resumen

| Elemento                       | Descripción                                         |
| ------------------------------ | --------------------------------------------------- |
| `NutriScanSchema`              | Esquema completo, incluye `usuarioId`.              |
| `NutriScanSchemaWithoutUserId` | Entrada parcial sin `usuarioId`, desde el frontend. |
| `NutriScanUpdateSchema`        | Esquema para actualizaciones parciales de análisis. |
| `NutriScanDTO`                 | Tipo completo del backend.                          |
| `NutriScanDTOInput`            | Tipo enviado desde el frontend.                     |
| `NutriScanDTOUpdate`           | Tipo usado al actualizar registros existentes.      |
