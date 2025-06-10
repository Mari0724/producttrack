---
id: notificar.Stockbajo
title: Notificar Stock Bajo
sidebar_label: Notificación de stock bajo
---

# Notificación de Stock Bajo

Este módulo define la función `notificarStockBajo`, que consulta los recordatorios pendientes de productos con bajo inventario. Si se cumple la condición de cantidad mínima, genera notificaciones para todos los miembros de la empresa asociada, evitando notificar a usuarios individuales.

---

## 🔍 Ubicación

src/services/notificaciones/notificar.StockBajo.ts

---

## 🔔 Función: notificarStockBajo

```ts
export async function notificarStockBajo(): Promise<void>
```

#### ✅ Propósito:

Enviar notificaciones automáticas cuando un producto alcanza una cantidad menor o igual a su mínimo definido.

---

## 🔍 Comportamiento:

1. Consulta los recordatorios con estado `PENDIENTE`.

2. Verifica si el producto relacionado tiene una cantidad menor o igual al mínimo configurado.

3. Si el producto pertenece a un usuario empresarial:

   - Obtiene todos los usuarios relacionados con esa empresa.

   - Crea una notificación para cada uno.

4. Cambia el estado del recordatorio a `ENVIADO` para evitar duplicidad.

5. Omite notificar a usuarios individuales.

---

### 📤 Estructura de notificación

| Campo       | Tipo / Formato                            | Descripción                                                                 |
|-------------|-------------------------------------------|-----------------------------------------------------------------------------|
| `tipo`      | Enum (`TipoNotificacion.STOCK_BAJO`)      | Tipo de notificación que se está enviando.                                 |
| `titulo`    | `string`                                  | Título de la notificación. Ejemplo: `"Stock bajo: [nombre del producto]"`. |
| `mensaje`   | `string`                                  | Cuerpo del mensaje. Ejemplo: `"El producto '[nombre]' tiene solo [cantidad] unidades disponibles."` |
| `idUsuario` | `string` / UUID                           | ID del usuario empresarial que recibirá la notificación.                    |

---

## ⚠️ Condiciones clave:

- Solo se notifica a usuarios empresariales.

- Si el stock está por encima del mínimo, no se envía nada.

- El recordatorio se marca como `ENVIADO` después de generar las notificaciones.

---

## 📦 Dependencias:

- `@prisma/client`: para acceso a la base de datos y enums como `TipoNotificacion` y `EstadoRecordatorio`.

- `prismaClient`: instancia personalizada del cliente Prisma (`src/utils/prismaClient`).

---