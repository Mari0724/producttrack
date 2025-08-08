---
id: historial.service
title: Servicio de Historial de Inventario
sidebar_label: Historial de Inventario
---

Este servicio permite **consultar el historial de cambios en el inventario** asociados a un usuario o empresa, dependiendo de su tipo de cuenta (`INDIVIDUAL` o `EMPRESARIAL`).

---

## 🔍 Ubicación

`src/services/historial.service.ts`

---

## 📦 Dependencias

- **`prisma`**: Cliente ORM para interactuar con la base de datos.
- **`HistorialInventarioDTO`**: Tipo de datos que define la estructura del historial devuelto.

---

## 🧩 Función: `async obtenerHistorialInventario(idUsuario: number)`

Obtiene el historial de cambios en el inventario asociado a un usuario específico, ya sea **individual** o **empresarial**.

### Parámetros:

- **`idUsuario`**: `number` — Identificador único del usuario que solicita el historial.

### Retorna:

- **`Promise<HistorialInventarioDTO[]>`** — Lista de registros de historial que incluyen:
  - `id`: Identificador del historial.
  - `productoId`: ID del producto.
  - `nombreProducto`: Nombre del producto.
  - `accion`: Tipo de cambio realizado.
  - `cantidad_anterior` y `cantidad_nueva`: Cambios de cantidad.
  - `precio_anterior` y `precio_nuevo`: Cambios de precio.
  - `fechaCambio`: Fecha y hora del cambio.

### Flujo de ejecución:

1. **Obtención del usuario**
   - Consulta en la tabla `users` el tipo de usuario y el `empresaId` asociado.

2. **Identificación de productos**
   - Si es **`INDIVIDUAL`**: se listan los productos cuyo `usuarioId` coincida con el `idUsuario`.
   - Si es **`EMPRESARIAL`**:  
     - Se usa `empresaId` del usuario, o el propio `idUsuario` si está nulo.  
     - Se listan todos los productos cuyo usuario pertenezca a la empresa.

3. **Consulta de historial**
   - Busca en `histInv` todos los registros relacionados con los `productosIds` encontrados.
   - Incluye el nombre del producto (`producto.nombre`).
   - Ordena los resultados por `fechaCambio` de forma descendente.

4. **Transformación de datos**
   - Mapea cada registro para ajustarse al tipo `HistorialInventarioDTO`, convirtiendo los precios a tipo `number`.

### Casos especiales:

- Si el usuario no existe en la base de datos, retorna un arreglo vacío.
- Si no hay productos asociados, retorna un arreglo vacío.

---

## ✅ Validación y reglas

- Se valida que el usuario exista antes de procesar el historial.
- Para **cuentas empresariales** se controla el caso en que `empresaId` sea `null`.
- El historial siempre se devuelve **ordenado del más reciente al más antiguo**.

---

## 🧪 Ejemplo de uso

```ts
import { obtenerHistorialInventario } from "./services/historial.service";

const historial = await obtenerHistorialInventario(5);

console.log(historial);
/*
[
  {
    id: 12,
    productoId: 3,
    nombreProducto: "Laptop Dell",
    accion: "ACTUALIZACIÓN",
    cantidad_anterior: 10,
    cantidad_nueva: 8,
    precio_anterior: 1200,
    precio_nuevo: 1150,
    fechaCambio: 2025-08-06T14:32:00.000Z
  },
  ...
]
*/
````

---

