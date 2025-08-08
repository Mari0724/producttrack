---
id: historial-dto
title: Historial
sidebar_label: Historial
---

El tipo `HistorialDTO` define la estructura de los registros de historial de cambios realizados sobre un producto en el sistema.  
Incluye información sobre la acción ejecutada, los valores anteriores y nuevos, y la fecha en la que ocurrió el cambio.

---

## Definición

```ts
export interface HistorialDTO {
  id: number;
  nombreProducto: string;
  accion: 'agregado' | 'modificado' | 'eliminado';
  cantidad_anterior: number;
  cantidad_nueva: number;
  precio_anterior: number;
  precio_nuevo: number;
  fechaCambio: string;
}
````

## Campos

| Campo               | Tipo                                        | Descripción                                               |
| ------------------- | ------------------------------------------- | --------------------------------------------------------- |
| `id`                | `number`                                    | Identificador único del registro en el historial.         |
| `nombreProducto`    | `string`                                    | Nombre del producto sobre el cual se realizó la acción.   |
| `accion`            | `'agregado' \| 'modificado' \| 'eliminado'` | Tipo de acción realizada sobre el producto.               |
| `cantidad_anterior` | `number`                                    | Cantidad registrada antes del cambio.                     |
| `cantidad_nueva`    | `number`                                    | Cantidad registrada después del cambio.                   |
| `precio_anterior`   | `number`                                    | Precio registrado antes del cambio.                       |
| `precio_nuevo`      | `number`                                    | Precio registrado después del cambio.                     |
| `fechaCambio`       | `string`                                    | Fecha y hora en que se realizó la acción, en formato ISO. |

---
## Ejemplo de uso

```ts
const ejemploHistorial: HistorialDTO = {
  id: 1,
  nombreProducto: "Arroz Integral",
  accion: "modificado",
  cantidad_anterior: 50,
  cantidad_nueva: 45,
  precio_anterior: 2500,
  precio_nuevo: 2600,
  fechaCambio: "2025-08-08T14:35:00Z"
};
```

Este registro indica que el **8 de agosto de 2025 a las 14:35 UTC** se modificó un producto llamado *Arroz Integral*, reduciendo su cantidad de 50 a 45 unidades y cambiando su precio de \$2.500 a \$2.600.

---