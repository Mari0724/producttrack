---
id: productos-model
title: Validación ProductosModel
sidebar_label: Productos Model
---

Este archivo define el esquema de validación para los productos utilizando `Zod`, una biblioteca de validación de datos en tiempo de ejecución para TypeScript. Se asegura de que los datos enviados al sistema cumplan con el formato y las reglas requeridas antes de ser procesados.

---

## 🔍 Ubicación

`src/model/ProductosModel.ts`

---

## 🧩 Dependencias

```ts
import { z } from "zod";
````

---

## 🧪 Enumeraciones

```ts
export const estadoEnum = z.enum([
  "DISPONIBLE",
  "AGOTADO",
  "RESERVADO",
  "VENCIDO",
  "ELIMINADO"
]);
```

Esta enumeración valida que el estado del producto sea uno de los siguientes:

* `DISPONIBLE`
* `AGOTADO`
* `RESERVADO`
* `VENCIDO`
* `ELIMINADO`

---

## ✅ Esquema de validación

```ts
export const productoSchema = z.object({
  codigoBarras: z.string().optional().nullable(),
  codigoQR: z.string().optional().nullable(),
  nombre: z.string().min(1).trim(),
  descripcion: z.string().min(1).trim(),
  categoria: z.string().optional(),
  cantidad: z.number().int().nonnegative(),
  precio: z.preprocess((val) => Number(val), z.number().nonnegative({
    message: "El precio debe ser un número válido",
  })),
  fechaAdquisicion: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "fechaAdquisicion debe ser una fecha válida (ISO string)",
  }),
  fechaVencimiento: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "fechaVencimiento debe ser una fecha válida (ISO string)",
  }),
  usuarioId: z.number().optional(),
  estado: estadoEnum,
  imagen: z.string().trim().url({ message: "imagen debe ser una URL válida" }),
});
```

### 🧾 Descripción de campos

| Campo              | Tipo             | Requerido | Descripción                                                  |
| ------------------ | ---------------- | --------- | ------------------------------------------------------------ |
| `codigoBarras`     | `string \| null` | Opcional  | Código de barras del producto                                |
| `codigoQR`         | `string \| null` | Opcional  | Código QR del producto                                       |
| `nombre`           | `string`         | Sí        | Nombre del producto (mínimo 1 caracter, sin espacios vacíos) |
| `descripcion`      | `string`         | Sí        | Descripción del producto                                     |
| `categoria`        | `string`         | Opcional  | Categoría del producto                                       |
| `cantidad`         | `number`         | Sí        | Cantidad disponible, debe ser un número entero no negativo   |
| `precio`           | `number`         | Sí        | Precio del producto, convertido previamente a número         |
| `fechaAdquisicion` | `string`         | Sí        | Fecha en formato ISO, debe ser una fecha válida              |
| `fechaVencimiento` | `string`         | Sí        | Fecha en formato ISO, debe ser una fecha válida              |
| `usuarioId`        | `number`         | Opcional  | ID del usuario propietario del producto                      |
| `estado`           | `enum`           | Sí        | Estado del producto según `estadoEnum`                       |
| `imagen`           | `string (URL)`   | Sí        | URL de la imagen del producto                                |

---

## 📤 Tipo inferido

```ts
export type ProductoInput = z.infer<typeof productoSchema>;
```

Este tipo se usa para tipar los objetos validados automáticamente con base en el esquema `productoSchema`.

---
