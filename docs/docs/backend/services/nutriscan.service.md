---
id: nutriscan.service
title: Servicio NutriScan
sidebar_label: NutriScan
---

# NutriScan

Este servicio centraliza toda la **lógica de negocio** relacionada con el módulo **NutriScan**, incluyendo creación, consulta, actualización y eliminación de análisis nutricionales generados por usuarios mediante OCR y consultas automáticas a OpenFoodFacts, con generación de mensajes usando GPT.

---

## 🔍 Ubicación

`src/services/nutriscan.service.ts`

---

## 📌 Propósito

Gestionar el flujo completo de análisis nutricional desde la recepción de datos hasta su persistencia en base de datos, incluyendo validación, enriquecimiento con fuentes externas y control de acceso.

---

## 🧩 Importaciones clave

```ts
import prisma from "../utils/prismaClient";
import { NutriScanSchemaWithoutUserId, NutriScanUpdateSchema } from "../models/NutriScanModel";
import { OpenFoodFactsService } from "./openfoodfacts.service";
import { gptService } from "./gpt.service";
````

| Módulo                 | Propósito                                            |
| ---------------------- | ---------------------------------------------------- |
| `prismaClient`         | ORM para acceso a la base de datos.                  |
| `NutriScanSchema...`   | Validaciones con Zod para entrada y actualización.   |
| `OpenFoodFactsService` | Consulta información nutricional abierta por nombre. |
| `gptService`           | Genera un resumen nutricional con OpenAI GPT.        |

---

## 🧠 Clase: `NutriScanService`

---

### ✅ `create(data, usuarioId, isTest)`

Crea un nuevo análisis automático. El flujo:

1. Valida los datos con `Zod`.
2. Consulta OpenFoodFacts con el nombre del producto.
3. Genera un mensaje nutricional con `GPT`.
4. Guarda el resultado en la base de datos con marca de prueba (`isTest`) si aplica.

```ts
const parsed = NutriScanSchemaWithoutUserId.parse(data);
const resultados = await OpenFoodFactsService.buscarAlimentoPorNombre(nombreProducto);
const mensaje = await gptService.generarMensajeNutricional(...);
await prisma.nutriScan.create(...);
```

| Parámetro   | Tipo      | Descripción                                      |
| ----------- | --------- | ------------------------------------------------ |
| `data`      | `unknown` | Datos de entrada (consulta, esAlimento, etc.)    |
| `usuarioId` | `number`  | ID del usuario que envía el análisis             |
| `isTest`    | `boolean` | Si el análisis es de prueba (modo desarrollador) |

---

### 📄 `findAll()`

Devuelve todos los análisis registrados en la base de datos.
Incluye datos del usuario que los creó (nombre y tipo).

```ts
return prisma.nutriScan.findMany({
  orderBy: { fechaAnalisis: "desc" },
  include: {
    usuario: {
      select: {
        nombreCompleto: true,
        tipoUsuario: true,
      },
    },
  },
});
```

---

### 🧪 `findTestsByUser(usuarioId)`

Retorna únicamente los análisis de prueba hechos por un usuario específico.

---

### 🔍 `findByUserId(usuarioId)`

Obtiene todos los análisis (de prueba o reales) realizados por un usuario determinado.
Incluye detalles del usuario y se ordena por fecha descendente.

---

### ✏️ `update(id, data)`

Actualiza un análisis nutricional existente, validando solo los campos enviados con `NutriScanUpdateSchema`.

```ts
const parsed = NutriScanUpdateSchema.parse(data);
await prisma.nutriScan.update({ where: { id }, data: parsed });
```

> Soporta actualizaciones parciales como `consulta`, `tipoAnalisis`, `esAlimento`, `respuesta`, etc.

---

### 🗑️ `delete(id)`

Elimina un análisis de la base de datos permanentemente.
Devuelve un mensaje de confirmación.

---

## 📝 Esquemas utilizados

### Esquema de creación (`NutriScanSchemaWithoutUserId`)

```ts
{
  esAlimento: boolean;
  consulta: string;
  tipoAnalisis: "ocr-gpt-only" | "ocr-openfoodfacts-gpt";
}
```

### Esquema de actualización (`NutriScanUpdateSchema`)

Permite modificar selectivamente:

```ts
{
  consulta?: string;
  esAlimento?: boolean;
  tipoAnalisis?: "ocr-gpt-only" | "ocr-openfoodfacts-gpt";
  isTest?: boolean;
  respuesta?: {
    mensaje: string;
    generadoPor: string;
  };
}
```

---

## 🔄 Flujo típico de `create()`

```txt
Frontend → texto OCR → NutriScanService.create()
                 ↳ OpenFoodFacts (buscar alimento)
                 ↳ GPT (crear resumen)
                 ↳ Guardar en BD (Prisma)
                 ↳ Retornar análisis generado
```

---

## ✅ Validaciones y control de errores

* Validación estricta con `Zod`.
* Captura de errores y trazabilidad en consola.
* Soporte para ejecución en modo de prueba (`isTest`).
* Inclusión de información del usuario (para auditoría o frontend).

---

## 🧾 Resumen

| Función principal | Crear y administrar análisis nutricionales                    |
| ----------------- | ------------------------------------------------------------- |
| Base de datos     | Prisma ORM                                                    |
| Integraciones     | OpenFoodFacts, GPT                                            |
| Validación        | Zod (`NutriScanSchemaWithoutUserId`, `NutriScanUpdateSchema`) |
| Modos soportados  | Normal y prueba (`isTest`)                                    |
| Métodos clave     | `create`, `findAll`, `findByUserId`, `update`, `delete`       |
