---
id: historialInventario
title: Historial Inventario 
sidebar_label: Historial Inventario
---

Este tipo define la estructura de datos utilizada para representar un registro del historial de cambios realizados sobre un producto en el inventario.  
Sirve como contrato de datos entre la base de datos, la capa de servicios y las respuestas enviadas al cliente.

---

## 🔍 Ubicación

`src/types/historial.ts`

---

## 📌 Descripción general

La interfaz `HistorialInventarioDTO` incluye la información relevante para auditar cambios en un producto, como modificaciones en cantidad o precio, junto con la fecha del cambio y la acción realizada.

**Campos:**

| Campo              | Tipo     | Descripción |
|--------------------|----------|-------------|
| `id`               | `number` | Identificador único del registro de historial. |
| `productoId`       | `number` | ID del producto al que pertenece este historial. |
| `nombreProducto`   | `string` | Nombre del producto afectado. |
| `accion`           | `string` | Acción realizada (ej. `"AGREGAR"`, `"ELIMINAR"`, `"ACTUALIZAR"`). |
| `cantidad_anterior`| `number` | Cantidad del producto antes del cambio. |
| `cantidad_nueva`   | `number` | Cantidad del producto después del cambio. |
| `precio_anterior`  | `number` | Precio del producto antes del cambio. |
| `precio_nuevo`     | `number` | Precio del producto después del cambio. |
| `fechaCambio`      | `Date`   | Fecha y hora en que se realizó el cambio. |

---

## 🔗 Uso

Este DTO puede usarse para:

* **Listar** el historial de cambios en el inventario.
* **Registrar** auditorías cuando un producto es modificado.
* **Enviar** datos de historial en respuestas de API.

**Ejemplo:**

```ts
const historialRegistro: HistorialInventarioDTO = {
  id: 1,
  productoId: 101,
  nombreProducto: 'Arroz Premium',
  accion: 'ACTUALIZAR',
  cantidad_anterior: 50,
  cantidad_nueva: 45,
  precio_anterior: 2000,
  precio_nuevo: 2100,
  fechaCambio: new Date(),
};
````

---

## 🧩 Relación con otros módulos

* Usado en servicios de inventario para auditar cambios.
* Puede ser devuelto por controladores que exponen el historial del inventario al frontend.
* Relacionado con la tabla de historial en la base de datos.

---

## ⚠️ Consideraciones

* El campo `fechaCambio` debe manejarse con cuidado para mantener coherencia en zonas horarias.
* Los valores de `accion` deberían estandarizarse para evitar inconsistencias (posible uso de **enum**).
* Idealmente, los precios deberían manejarse como enteros que representan la menor unidad monetaria (centavos) para evitar problemas de redondeo.

---

