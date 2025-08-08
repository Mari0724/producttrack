---
id: marcarLeidaService
title: Servicio - Marcar Notificación como Leída
sidebar_label: Marcar Leida
---

Este servicio **actualiza el estado de una notificación** en la base de datos para marcarla como leída.

---

## 🔍 Ubicación

`src/services/notificaciones/marcarLeida.service.ts`

---

## 📦 Dependencias utilizadas

```ts
import prisma from '../../utils/prismaClient';
````

* **`prisma`**: Cliente de Prisma configurado en `utils/prismaClient.ts`, utilizado para interactuar con la base de datos.

---

## 🔍 Descripción

La función `marcarNotificacionComoLeida` recibe el identificador de una notificación y actualiza el campo `leida` a `true` en la base de datos, indicando que ha sido leída por el usuario.

---

## 🛠️ Implementación

```ts
export async function marcarNotificacionComoLeida(idNotificacion: number) {
  await prisma.notificaciones.update({
    where: { idNotificacion },
    data: { leida: true }
  });
}
```

---

## 📌 Parámetros

| Parámetro        | Tipo     | Descripción                                                |
| ---------------- | -------- | ---------------------------------------------------------- |
| `idNotificacion` | `number` | Identificador único de la notificación a marcar como leída |

---

## 📤 Retorno

* **Tipo:** `Promise<void>`
* **Descripción:** No retorna un valor específico. El resultado es el cambio en la base de datos.

---


