---
id: productoVencidoService
title: Servicio - Notificar Producto Vencido
sidebar_label: Producto Vencido
---

# productoVencido.service

Este servicio **envía notificaciones a usuarios o miembros de una empresa** cuando uno o más productos han superado su **fecha de vencimiento**.

---

## 🔍 Ubicación

`src/services/notificaciones/productoVencido.service.ts`

---

## 📦 Dependencias utilizadas

```ts
import prisma from '../../utils/prismaClient';
import { TipoNotificacion, productos as Producto } from '@prisma/client';
import { puedeNotificar } from '../../utils/notificaciones/preferenciasNotificaciones';
```

* **`prisma`** → Cliente Prisma para operaciones sobre la base de datos.  
* **`TipoNotificacion`** → Enumeración de tipos de notificación disponible en el esquema de Prisma.  
* **`Producto`** → Tipo generado por Prisma para la tabla `productos`.  
* **`puedeNotificar`** → Valida si un usuario tiene activada la preferencia para un tipo de notificación.

---

## 🔍 Descripción

La función `notificarProductoVencido`:
1. Busca productos con fecha de vencimiento anterior a la fecha actual y que **no estén eliminados** (`eliminadoEn = null`).
2. Puede recibir una lista específica de productos para evaluar, o revisar todos en la base de datos.
3. Genera un mensaje personalizado para cada producto vencido.
4. Envía la notificación a:
   - El propietario, si es un usuario individual.
   - Todos los miembros de la empresa, si el propietario es empresarial.
5. Respeta las **preferencias de notificación** antes de enviar.

---

## 🛠️ Lógica clave

```ts
// Filtrar productos vencidos
fechaVencimiento < hoy && eliminadoEn == null

// Diferenciar flujo según tipo de usuario
if (usuario.tipoUsuario === 'INDIVIDUAL') { ... }
else if (usuario.tipoUsuario === 'EMPRESARIAL') { ... }

// Crear notificación en la BD
await prisma.notificaciones.create({ ... });
```

---

## 📌 Parámetros

| Parámetro             | Tipo         | Obligatorio | Descripción                                                           |
| --------------------- | ------------ | ----------- | --------------------------------------------------------------------- |
| `productosOpcionales` | `Producto[]` | No          | Lista de productos a evaluar. Si no se pasa, se revisan todos los vencidos. |

---

## 📤 Retorno

* **Tipo:** `Promise<void>`  
* **Efecto:** Inserta notificaciones en la base de datos para los usuarios correspondientes.

---

## 📎 Notas

* Solo se procesan productos con `fechaVencimiento` anterior a la fecha actual y que no estén eliminados.  
* Para usuarios **empresariales**, la notificación se envía a todos los miembros asociados al `empresaId`.  
* El texto de la notificación incluye el nombre del producto y la fecha de vencimiento en formato legible.  
* Se respeta siempre la configuración de preferencias (`puedeNotificar`) antes de enviar.

---