---
id: historial-api
title: API de Historial de Inventario
sidebar_label: historial
---

Este archivo define una función que interactúa con la API del backend para obtener el **historial de cambios en el inventario** de un usuario específico. Utiliza una instancia de Axios personalizada y transforma los datos para ser utilizados fácilmente en la interfaz.

---

## 🔍 Ubicación

`src/api/historial.ts`

---

## 📦 Dependencias utilizadas

```ts
import axiosInstance from "../utils/axiosInstance";
import type { HistorialDTO } from "../types/Historial";
import type { InventoryChange } from "../types/Inventory";
```

* **axiosInstance**: Instancia preconfigurada de Axios para realizar las solicitudes HTTP.
* **HistorialDTO**: Tipo de dato recibido desde el backend con la estructura original del historial.
* **InventoryChange**: Tipo utilizado internamente en el frontend para mostrar los cambios del inventario de forma más intuitiva.

---

## 🔧 Función principal

### 🕘 `getHistorialInventario(idUsuario: number): Promise<InventoryChange[]>`

```ts
export async function getHistorialInventario(idUsuario: number): Promise<InventoryChange[]> {
  const response = await axiosInstance.get(`/historial/usuario/${idUsuario}`);
  
  return response.data.map((h: HistorialDTO) => ({
    id: h.id.toString(),
    productName: h.nombreProducto,
    action:
      h.accion === "agregado"
        ? "added"
        : h.accion === "modificado"
        ? "modified"
        : "deleted",
    previousQuantity: h.cantidad_anterior,
    newQuantity: h.cantidad_nueva,
    previousPrice: h.precio_anterior,
    newPrice: h.precio_nuevo,
    changeDate: new Date(h.fechaCambio),
  }));
}
```

Esta función realiza una solicitud `GET` al endpoint `/historial/usuario/{idUsuario}` para obtener el historial del usuario. Luego transforma cada entrada del historial (`HistorialDTO`) a una estructura más usable (`InventoryChange`).

---

## 🗃️ Transformación de datos

| Campo original (`HistorialDTO`) | Campo transformado (`InventoryChange`)      | Descripción                       |
| ------------------------------- | ------------------------------------------- | --------------------------------- |
| `id`                            | `id` (como string)                          | Identificador del cambio          |
| `nombreProducto`                | `productName`                               | Nombre del producto afectado      |
| `accion`                        | `action` (`added` / `modified` / `deleted`) | Tipo de acción en formato legible |
| `cantidad_anterior`             | `previousQuantity`                          | Cantidad antes del cambio         |
| `cantidad_nueva`                | `newQuantity`                               | Cantidad después del cambio       |
| `precio_anterior`               | `previousPrice`                             | Precio anterior                   |
| `precio_nuevo`                  | `newPrice`                                  | Precio actualizado                |
| `fechaCambio`                   | `changeDate` (Date)                         | Fecha en la que ocurrió el cambio |

> ⚠️ La transformación de `accion` permite utilizar términos en inglés directamente en la interfaz de usuario para estandarizar los textos (`added`, `modified`, `deleted`).

---

## 🚀 Ejemplo de uso

```ts
import { getHistorialInventario } from "../api/historial";

const historial = await getHistorialInventario(5);

console.log(historial);
/*
[
  {
    id: "12",
    productName: "Papel higiénico",
    action: "modified",
    previousQuantity: 20,
    newQuantity: 15,
    previousPrice: 3.5,
    newPrice: 3.8,
    changeDate: 2025-08-05T21:00:00.000Z
  },
  ...
]
*/
```

---

## 📝 Notas adicionales

* Este archivo transforma la estructura cruda del backend en una forma más legible para el frontend.
* Utiliza `axiosInstance`, lo que permite centralizar headers, baseURL y autenticación en un solo lugar.
* Puede ser fácilmente adaptado si se agregan más campos al historial en el futuro.