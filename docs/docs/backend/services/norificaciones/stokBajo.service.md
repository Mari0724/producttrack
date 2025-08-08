---
id: stockBajoService
title: Servicio - Notificar Stock Bajo
sidebar_label: StockBajo
---


Este servicio envía **notificaciones de stock bajo** cuando un producto alcanza un nivel de inventario **crítico**, definido por un umbral especial, y actualiza el estado del recordatorio en la base de datos.

---

## 🔍 Ubicación

`src/services/notificaciones/stockBajo.service.ts`

---

## 📦 Dependencias utilizadas

```ts
import prisma from '../../utils/prismaClient';
import { TipoNotificacion, EstadoRecordatorio, productos as Producto } from '@prisma/client';
import { puedeNotificar } from '../../utils/notificaciones/preferenciasNotificaciones';
```

* **`prisma`** → Cliente Prisma para acceso a la base de datos.  
* **`TipoNotificacion`** → Enumeración con los tipos de notificación disponibles.  
* **`EstadoRecordatorio`** → Estados posibles de un recordatorio (`PENDIENTE`, `ENVIADO`, etc.).  
* **`Producto`** → Tipo correspondiente al modelo `productos` en Prisma.  
* **`puedeNotificar`** → Valida si un usuario puede recibir un tipo específico de notificación.

---

## 🔍 Descripción

La función `notificarStockBajo`:
1. Obtiene recordatorios de stock pendientes (`EstadoRecordatorio.PENDIENTE`), filtrando opcionalmente por una lista de productos.
2. Calcula un **umbral crítico** (`min(8, cantidadMinima / 8)`) para determinar si el stock está en estado crítico.
3. Si el stock actual está **por encima** de este umbral, no se envía notificación.
4. Envía la notificación a:
   - El propietario (usuarios individuales).
   - Todos los miembros de la empresa (usuarios empresariales).
5. Respeta las **preferencias de notificación** antes de enviar.
6. Actualiza el estado del recordatorio a **ENVIADO**.

---

## 🛠️ Lógica clave

```ts
const umbralCritico = Math.min(8, Math.floor(cantidadMinima / 8));
if (cantidadActual > umbralCritico) return; // No se notifica

// Enviar notificación solo si puedeNotificar(...)
await prisma.notificaciones.create({ ... });

// Marcar recordatorio como ENVIADO
await prisma.recorStock.update({
  where: { idRecordatorio },
  data: { estado: EstadoRecordatorio.ENVIADO },
});
```

---

## 📌 Parámetros

| Parámetro             | Tipo         | Obligatorio | Descripción                                                             |
| --------------------- | ------------ | ----------- | ----------------------------------------------------------------------- |
| `productosOpcionales` | `Producto[]` | No          | Lista de productos a verificar. Si no se pasa, se revisan todos los `PENDIENTES`. |

---

## 📤 Retorno

* **Tipo:** `Promise<void>`  
* **Efecto:** Registra notificaciones en la base de datos y actualiza el estado de los recordatorios enviados.

---

## 📎 Notas

* El umbral crítico evita notificaciones redundantes cuando el stock está extremadamente bajo (ya notificado).
* El estado del recordatorio (`recorStock`) pasa de `PENDIENTE` a `ENVIADO` tras la notificación.
* La fecha de envío se registra para trazabilidad.
* Diferencia claramente el flujo entre usuarios **individuales** y **empresariales**.

---