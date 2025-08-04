---
id: historial.controller
title: HistorialController
sidebar_label: HistorialController
---

# HistorialController

Este controlador permite consultar el historial de cambios realizados sobre los productos de inventario de un usuario específico (individual o equipo (rol editor)). Se registran acciones como creación, edición o eliminación de productos.

---

## 🔍 Ubicación

`src/controllers/historial.controller.ts`

---

## 📌 Endpoints

### 📖 Obtener historial de inventario por usuario

**GET** `/historial/usuario/{idUsuario}`

Devuelve el historial de cambios en productos realizados por un usuario.

#### Parámetros

- `idUsuario` (path) – ID del usuario del cual se quiere consultar el historial.

#### Respuesta

Lista de objetos con la siguiente estructura:

```ts
{
  idHistorial: number;
  productoId: number;
  usuarioId: number;
  accion: "agregado" | "modificado" | "eliminado";
  cantidad_anterior: number;
  cantidad_nueva: number;
  precio_anterior: number;
  precio_nuevo: number;
  fechaCambio: string;
}
````

#### Ejemplo

```json
[
  {
    "idHistorial": 14,
    "productoId": 5,
    "usuarioId": 2,
    "accion": "modificado",
    "cantidad_anterior": 10,
    "cantidad_nueva": 15,
    "precio_anterior": 20000,
    "precio_nuevo": 19000,
    "fechaCambio": "2025-08-03"
  }
]
```

---

## 🛠️ Notas técnicas

* Este historial se construye desde la tabla `histInv` y puede incluir acciones de distintos tipos (`agregado`, `modificado`, `eliminado`).
* Cada entrada contiene información detallada sobre los cambios realizados.
* Las acciones de historial se registran automáticamente desde los servicios relacionados a productos (`createProducto`, `updateProducto`, `deleteProducto`).