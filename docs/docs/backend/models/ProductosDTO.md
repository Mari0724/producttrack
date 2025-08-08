---
id: productosdto
title: ProductosDTO
sidebar_label: Productos DTO
---

Este archivo define la interfaz `ProductosDTO`, la cual se utiliza para tipar los datos relacionados con un producto dentro de la aplicación, permitiendo garantizar una estructura coherente al crear, actualizar o manipular información de productos.

---

## 🔍 Ubicación

`src/model/ProductosDTO.ts`

---

## 🔧 Interfaz `ProductosDTO`

```ts
import { EstadoProducto } from "@prisma/client";

export interface ProductosDTO {
  id?: number;
  codigoBarras?: string | null;
  codigoQR?: string | null;
  nombre: string;
  descripcion: string;
  cantidad: number;
  precio: number;
  fechaAdquisicion: string;
  fechaVencimiento: string;
  usuarioId: number;
  estado: EstadoProducto;
  imagen: string;
  categoria?: string;
}
````

---

## 🧩 Campos

| Campo              | Tipo             | Requerido | Descripción                                                            |
| ------------------ | ---------------- | --------- | ---------------------------------------------------------------------- |
| `id`               | `number`         | No        | Identificador único del producto (autogenerado por la base de datos).  |
| `codigoBarras`     | `string \| null` | No        | Código de barras del producto, puede ser nulo si no se proporciona.    |
| `codigoQR`         | `string \| null` | No        | Código QR asociado al producto, puede ser nulo.                        |
| `nombre`           | `string`         | Sí        | Nombre del producto.                                                   |
| `descripcion`      | `string`         | Sí        | Descripción detallada del producto.                                    |
| `cantidad`         | `number`         | Sí        | Cantidad disponible en inventario.                                     |
| `precio`           | `number`         | Sí        | Precio actual del producto.                                            |
| `fechaAdquisicion` | `string`         | Sí        | Fecha en que se adquirió el producto (en formato ISO).                 |
| `fechaVencimiento` | `string`         | Sí        | Fecha de vencimiento del producto (en formato ISO).                    |
| `usuarioId`        | `number`         | Sí        | Identificador del usuario que registró el producto.                    |
| `estado`           | `EstadoProducto` | Sí        | Estado actual del producto (ej. `ACTIVO`, `VENCIDO`, `AGOTADO`, etc.). |
| `imagen`           | `string`         | Sí        | URL o path de la imagen del producto.                                  |
| `categoria`        | `string`         | No        | Categoría asignada al producto, si aplica.                             |

---

## 🧠 Notas

* El campo `estado` utiliza un tipo enumerado (`enum`) importado desde `@prisma/client`, lo que garantiza que los productos solo puedan tener un estado válido definido en el modelo Prisma.
* Esta interfaz es clave para las operaciones CRUD y validaciones de los productos en el backend.

---
