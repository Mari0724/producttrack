---
id: nutriscan.service
title: Servicio NutriScan
sidebar_label: NutriScanService
---

Este servicio encapsula toda la lógica de negocio relacionada con el módulo **NutriScan**, incluyendo la creación, recuperación, actualización y eliminación de registros de análisis nutricional basados en texto OCR y consultas automáticas a OpenFoodFacts.

---

## 🔍 Ubicación

`src/services/nutriscan.service.ts`

---

## 📌 Propósito

Gestionar los flujos de entrada, validación, procesamiento (mediante GPT y OpenFoodFacts) y persistencia en base de datos de los análisis nutricionales creados por los usuarios.

---

## 🧩 Importaciones clave

```ts
import prisma from "../utils/prismaClient";
import { NutriScanSchemaWithoutUserId } from "../models/NutriScanModel";
import { OpenFoodFactsService } from "./openfoodfacts.service";
import { gptService } from "./gpt.service";
````

| Módulo                 | Propósito                                           |
| ---------------------- | --------------------------------------------------- |
| `prismaClient`         | Interfaz con la base de datos.                      |
| `NutriScanSchema...`   | Validación de datos entrantes con Zod.              |
| `OpenFoodFactsService` | Servicio que consulta una base nutricional abierta. |
| `gptService`           | Genera un resumen nutricional usando GPT.           |

---

## 🧠 Clase: `NutriScanService`

### ✅ Método: `create(data, usuarioId, isTest)`

Crea un nuevo análisis nutricional automático. Este es el flujo principal que:

1. **Valida los datos recibidos.**
2. **Consulta OpenFoodFacts.**
3. **Genera un mensaje nutricional con GPT.**
4. **Guarda el resultado en la base de datos.**

```ts
const parsed = NutriScanSchemaWithoutUserId.parse(data);
const resultadosOpenFood = await OpenFoodFactsService.buscarAlimentoPorNombre(nombreProducto);
const mensaje = await gptService.generarMensajeNutricional(...);
await prisma.nutriScan.create(...);
```

| Parámetro   | Tipo      | Descripción                                      |
| ----------- | --------- | ------------------------------------------------ |
| `data`      | `unknown` | Datos desde frontend (texto OCR, booleano, etc). |
| `usuarioId` | `number`  | ID del usuario que genera el análisis.           |
| `isTest`    | `boolean` | Si el análisis es de prueba o no.                |

---

### 📄 Otros métodos del servicio

#### `findTestsOnly()`

Devuelve todos los análisis creados en modo de prueba (`isTest = true`).

---

#### `findTestsByUser(usuarioId: number)`

Retorna solo los análisis de prueba hechos por un usuario específico.

---

#### `findById(id: number)`

Obtiene un análisis por su ID único.

---

#### `update(id: number, data: unknown)`

Permite actualizar parcialmente un análisis (validado con Zod).

```ts
NutriScanSchemaWithoutUserId.partial().parse(data);
```

---

#### `delete(id: number)`

Elimina un análisis de la base de datos y retorna un mensaje de confirmación.

---

## 📝 Esquema de datos utilizados

Este servicio usa el esquema:

```ts
{
  esAlimento: boolean;
  consulta: string;
  respuesta: any;
  tipoAnalisis: "auto";
}
```

Y guarda el `usuarioId` y el campo `isTest`.

---

## 🧪 Flujo completo (create)

```txt
Frontend → OCR → texto → NutriScanService.create()
                ↳ OpenFoodFacts
                ↳ GPT (opcional)
                ↳ Guarda en BD
                ↳ Retorna análisis
```

---

## ✅ Validaciones incluidas

* Estructura de datos con `Zod`.
* Mensajes claros en caso de error de validación o procesamiento.
* Control de errores centralizado.

---

## 🧠 Notas adicionales

* El campo `respuesta` puede contener una estructura personalizada con metadatos.
* Ideal para futuros análisis combinados (OCR + OpenFoodFacts + GPT).
* Puede integrarse con sistemas de historial, dashboards o generación de reportes.

---

## 🧾 Resumen

| Función principal | Crear y gestionar análisis nutricionales automatizados |
| ----------------- | ------------------------------------------------------ |
| Base de datos     | Prisma ORM                                             |
| Integraciones     | OpenFoodFacts, GPT                                     |
| Validación        | Zod (`NutriScanSchemaWithoutUserId`)                   |
| Modos soportados  | Normal y prueba (`isTest`)                             |
| Exportación       | Clase `NutriScanService` (a instanciar manualmente)    |
