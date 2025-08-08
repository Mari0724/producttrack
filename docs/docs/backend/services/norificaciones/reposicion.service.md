---
id: reposicionService
title: Servicio - Notificar Reposición Recomendada
sidebar_label: Reposicion
---

Este servicio envía **notificaciones de reposición recomendada** cuando un producto cae por debajo de su **cantidad mínima recomendada** de stock.

---

## 🔍 Ubicación

`src/services/notificaciones/reposicion.service.ts`

---

## 📦 Dependencias utilizadas

```ts
import prisma from '../../utils/prismaClient';
import { TipoNotificacion, productos as Producto } from '@prisma/client';
import { puedeNotificar } from '../../utils/notificaciones/preferenciasNotificaciones';
```

* **`prisma`** → Cliente Prisma configurado en [`utils/prismaClient.ts`](../../utils/prismaClient.md), para interactuar con la base de datos.  
* **`TipoNotificacion`** → Enumeración con los tipos de notificación.  
* **`Producto`** → Tipo correspondiente al modelo `productos` en Prisma.  
* **`puedeNotificar`** → Función que valida si un usuario tiene habilitado recibir un tipo de notificación.

---

## 🔍 Descripción

La función `notificarReposicionRecomendada`:
1. Obtiene los **recordatorios de stock mínimo** (`recorStock`), filtrando opcionalmente por una lista de productos.
2. Comprueba si la cantidad actual está **por debajo del mínimo recomendado**, pero **por encima del umbral crítico**.
3. Si se cumplen las condiciones:
   - **Usuarios individuales:** se envía la notificación solo al propietario.
   - **Usuarios empresariales:** se envía a todos los miembros de la empresa.
4. Antes de enviar cualquier notificación, se respeta la configuración de **preferencias de notificación**.

---

## 🛠️ Lógica clave

```ts
const umbralCritico = Math.min(8, Math.floor(cantidadMinima / 8));
if (cantidadActual <= umbralCritico) return;
if (cantidadActual >= cantidadMinima) return;

// Crear notificación si puedeNotificar(...)
```

- **Umbral crítico:** evita notificar en casos de stock extremadamente bajo (posible notificación previa).
- **Chequeos de cantidad:** evita alertas innecesarias cuando el stock está igual o por encima del mínimo.

---

## 📌 Parámetros

| Parámetro             | Tipo         | Obligatorio | Descripción                                                             |
| --------------------- | ------------ | ----------- | ----------------------------------------------------------------------- |
| `productosOpcionales` | `Producto[]` | No          | Lista de productos a evaluar. Si no se pasa, se revisan todos en la BD. |

---

## 📤 Retorno

* **Tipo:** `Promise<void>`  
* **Efecto:** Registra en la base de datos notificaciones de tipo `REPOSICION_RECOMENDADA`.

---

## 📎 Notas

* El servicio diferencia entre **usuarios individuales** y **empresariales**.
* Solo se notifica a quienes tengan activa la preferencia `REPOSICION_RECOMENDADA`.
* La fecha de envío se registra para trazabilidad.

---