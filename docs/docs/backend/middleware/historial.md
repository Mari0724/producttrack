---
id: historial
title: Historial de Inventario
sidebar_label: historial
---

Este módulo define la estructura de datos utilizada para representar los cambios históricos en los productos del inventario. La interfaz `HistorialInventarioDTO` es útil para registrar y auditar las acciones realizadas sobre un producto, como actualizaciones de cantidad o precio.

---

## 🔍 Ubicación

`src/middleware/historial.ts`

---

## 🧩 Definición de la interfaz

```ts
export interface HistorialInventarioDTO {
  id: number;
  productoId: number;
  nombreProducto: string;
  accion: string;
  cantidad_anterior: number;
  cantidad_nueva: number;
  precio_anterior: number;
  precio_nuevo: number;
  fechaCambio: Date;
}
````

---

## 🧾 Campos de la interfaz

| Campo               | Tipo   | Descripción                                                            |
| ------------------- | ------ | ---------------------------------------------------------------------- |
| `id`                | number | Identificador único del registro en el historial.                      |
| `productoId`        | number | ID del producto al que se le aplicó el cambio.                         |
| `nombreProducto`    | string | Nombre del producto afectado.                                          |
| `accion`            | string | Tipo de acción realizada (`creado`, `actualizado`, `eliminado`, etc.). |
| `cantidad_anterior` | number | Valor de la cantidad antes de realizar el cambio.                      |
| `cantidad_nueva`    | number | Valor de la cantidad después de realizar el cambio.                    |
| `precio_anterior`   | number | Precio anterior del producto.                                          |
| `precio_nuevo`      | number | Precio nuevo del producto después del cambio.                          |
| `fechaCambio`       | Date   | Fecha y hora exacta en que se realizó la modificación.                 |

---

## ✅ Ejemplo de uso

Este DTO puede ser utilizado al momento de registrar una modificación en el inventario:

```ts
const historial: HistorialInventarioDTO = {
  id: 1,
  productoId: 101,
  nombreProducto: "Arroz 500g",
  accion: "actualizado",
  cantidad_anterior: 20,
  cantidad_nueva: 25,
  precio_anterior: 2000,
  precio_nuevo: 2100,
  fechaCambio: new Date(),
};
```

---

## 📚 Propósito

Esta interfaz sirve como un contrato de datos para mantener un historial claro, auditable y estructurado de todos los cambios importantes en el inventario. Es especialmente útil para funciones administrativas, reportes y mecanismos de retroceso o revisión de actividad del sistema.

---

