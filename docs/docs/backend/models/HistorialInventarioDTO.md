---
id: historialinventariodto
title: Historial Inventario DTO
sidebar_label: Historial Inventario
---

Este archivo define la estructura del **DTO (Data Transfer Object)** para representar un historial de cambios en el inventario, útil para auditar acciones realizadas sobre productos, como actualizaciones de cantidad o precio. También incluye información sobre el usuario que realizó el cambio.

---

## 🔍 Ubicación

`src/models/HistorialInventarioDTO.ts`

---

## 🧩 Estructura del DTO

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
  usuario: {
    nombreCompleto: string;
    tipoUsuario: string;
    empresaId?: number;
  };
}
````

---

## 📌 Descripción de campos

| Campo               | Tipo   | Descripción                                                              |
| ------------------- | ------ | ------------------------------------------------------------------------ |
| `id`                | number | Identificador único del registro de historial.                           |
| `productoId`        | number | ID del producto relacionado con el cambio.                               |
| `nombreProducto`    | string | Nombre del producto afectado.                                            |
| `accion`            | string | Tipo de acción realizada (ej. `"actualización"`, `"eliminación"`, etc.). |
| `cantidad_anterior` | number | Cantidad del producto antes del cambio.                                  |
| `cantidad_nueva`    | number | Cantidad del producto después del cambio.                                |
| `precio_anterior`   | number | Precio del producto antes del cambio.                                    |
| `precio_nuevo`      | number | Precio del producto después del cambio.                                  |
| `fechaCambio`       | Date   | Fecha en que se realizó el cambio.                                       |
| `usuario`           | object | Información del usuario que realizó el cambio.                           |

---

## 👤 Estructura del campo `usuario`

```ts
usuario: {
  nombreCompleto: string;
  tipoUsuario: string;
  empresaId?: number;
}
```

| Subcampo         | Tipo    | Descripción                                                      |
| ---------------- | ------- | ---------------------------------------------------------------- |
| `nombreCompleto` | string  | Nombre completo del usuario que realizó el cambio.               |
| `tipoUsuario`    | string  | Tipo de usuario (por ejemplo, `"administrador"` o `"empleado"`). |
| `empresaId`      | number? | ID de la empresa (si aplica). Campo opcional.                    |

---

## 🧠 Uso típico

Este DTO es comúnmente utilizado para:

* Registrar cambios en cantidades o precios de inventario.
* Auditar acciones realizadas por usuarios sobre productos.
* Mostrar historial de movimientos en interfaces de administración o reportes.

---