---
id: product
title: Product
sidebar_label: Product
---

Esta interfaz representa la estructura de un **producto** en el sistema ProductTrack.  
Incluye información clave como códigos identificadores, detalles descriptivos, cantidades, precios, fechas, estado, y datos del usuario propietario.

---

## 🔍 Ubicación

`src/types/Product.ts`

---

## 🧩 Tipos relacionados

### `EstadoProducto`

```ts
export type EstadoProducto = 'DISPONIBLE' | 'AGOTADO' | 'RESERVADO' | 'VENCIDO';
````

Define los posibles estados en los que un producto puede encontrarse dentro del sistema:

| Estado       | Descripción                                            |
| ------------ | ------------------------------------------------------ |
| `DISPONIBLE` | El producto está en stock y puede ser vendido o usado. |
| `AGOTADO`    | No hay existencias del producto.                       |
| `RESERVADO`  | El producto está apartado para un cliente u operación. |
| `VENCIDO`    | El producto ha sobrepasado su fecha de vencimiento.    |

---

## 🧩 Propiedades

| Propiedad             | Tipo                                | Requerido | Descripción                                                         |
| --------------------- | ----------------------------------- | --------- | ------------------------------------------------------------------- |
| `id`                  | `number` *(opcional)*               | ❌ No      | Identificador único del producto en la base de datos.               |
| `codigoBarras`        | `string \| null`                    | ✅ Sí      | Código de barras del producto (puede ser `null` si no se registra). |
| `codigoQR`            | `string \| null`                    | ✅ Sí      | Código QR del producto (puede ser `null` si no se genera).          |
| `nombre`              | `string`                            | ✅ Sí      | Nombre del producto.                                                |
| `descripcion`         | `string`                            | ✅ Sí      | Descripción detallada del producto.                                 |
| `cantidad`            | `number`                            | ✅ Sí      | Cantidad disponible en inventario.                                  |
| `precio`              | `number`                            | ✅ Sí      | Precio unitario del producto.                                       |
| `fechaAdquisicion`    | `string`                            | ✅ Sí      | Fecha en la que se adquirió el producto.                            |
| `fechaVencimiento`    | `string`                            | ✅ Sí      | Fecha de caducidad o vencimiento del producto.                      |
| `estado`              | `EstadoProducto` | ✅ Sí      | Estado actual del producto en el sistema.                           |
| `imagen`              | `string`                            | ✅ Sí      | URL o ruta de la imagen del producto.                               |
| `categoria`           | `string` *(opcional)*               | ❌ No      | Categoría a la que pertenece el producto.                           |
| `usuarioId`           | `number`                            | ✅ Sí      | Identificador del usuario propietario del producto.                 |
| `usuario`             | `object` *(opcional)*               | ❌ No      | Información del usuario propietario del producto.                   |
| `usuario.idUsuario`   | `number`                            | ✅ Sí      | Identificador único del usuario.                                    |
| `usuario.tipoUsuario` | `"INDIVIDUAL" \| "EMPRESARIAL"`     | ✅ Sí      | Tipo de usuario que posee el producto.                              |
| `usuario.empresaId`   | `number` *(opcional)*               | ❌ No      | Identificador de la empresa (solo para usuarios empresariales).     |

---

## 📦 Dependencias utilizadas

Este tipo **no** depende de librerías externas.
Es una definición interna utilizada para manejar información de productos.

---

## 🛠️ Usos comunes

* Registrar nuevos productos en el inventario.
* Consultar y mostrar información detallada de un producto.
* Actualizar datos de stock, precio o estado.
* Asociar un producto a un usuario o empresa.

---

## ✅ Ejemplo de uso

```ts
import { Product, EstadoProducto } from "@/types/Product";

const nuevoProducto: Product = {
  codigoBarras: "1234567890123",
  codigoQR: "QR-123456",
  nombre: "Leche Entera 1L",
  descripcion: "Leche entera pasteurizada en envase de 1 litro.",
  cantidad: 50,
  precio: 1.25,
  fechaAdquisicion: "2025-07-01",
  fechaVencimiento: "2025-09-01",
  estado: "DISPONIBLE",
  imagen: "https://cdn.misitio.com/productos/leche1l.jpg",
  categoria: "Lácteos",
  usuarioId: 101,
  usuario: {
    idUsuario: 101,
    tipoUsuario: "EMPRESARIAL",
    empresaId: 45,
  },
};
```

En este ejemplo, el producto **"Leche Entera 1L"** está disponible en inventario con 50 unidades y asociado a una empresa.

---