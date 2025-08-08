---
id: inventory-change
title: Inventory
sidebar_label: Inventory
---

Esta interfaz define la estructura de un **registro de cambio en el inventario** dentro de ProductTrack.  
Permite mantener un historial claro de las modificaciones realizadas a los productos, incluyendo la acción, los valores previos y nuevos, y la fecha del cambio.

---

## 🔍 Ubicación

`src/types/Inventory.ts`

---

## 🧩 Propiedades

| Propiedad          | Tipo                                   | Requerido | Descripción |
| ------------------ | -------------------------------------- | --------- | ----------- |
| `id`               | `string`                               | ✅ Sí     | Identificador único del cambio de inventario. |
| `productName`      | `string`                               | ✅ Sí     | Nombre del producto afectado. |
| `action`           | `'added' \| 'modified' \| 'deleted'`   | ✅ Sí     | Acción realizada sobre el producto. |
| `previousQuantity` | `number` *(opcional)*                  | ❌ No     | Cantidad anterior del producto antes del cambio. |
| `newQuantity`      | `number` *(opcional)*                  | ❌ No     | Cantidad nueva del producto después del cambio. |
| `previousPrice`    | `number` *(opcional)*                  | ❌ No     | Precio anterior del producto antes del cambio. |
| `newPrice`         | `number` *(opcional)*                  | ❌ No     | Precio nuevo del producto después del cambio. |
| `changeDate`       | `Date`                                 | ✅ Sí     | Fecha y hora en la que se registró el cambio. |

---

## 📦 Dependencias utilizadas

Este tipo **no** utiliza dependencias externas.  
Es una definición interna usada para tipar datos en el historial de inventario.

---

## 🛠️ Usos comunes

- Registrar cambios en el inventario después de una modificación, adición o eliminación de productos.
- Mostrar un historial de modificaciones en la interfaz de usuario.
- Generar reportes de cambios de stock y precios.

---

## ✅ Ejemplo de uso

```ts
import { InventoryChange } from "@/types/Inventory";

const cambio: InventoryChange = {
  id: "chg-001",
  productName: "Cereal Integral",
  action: "modified",
  previousQuantity: 10,
  newQuantity: 8,
  previousPrice: 12.5,
  newPrice: 13.0,
  changeDate: new Date(),
};
````

En este ejemplo, se registró que el producto **"Cereal Integral"** tuvo un cambio de cantidad y precio el día actual.

---