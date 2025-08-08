---
id: actualizacion.service
title: Servicio de Notificaciones de Actualización
sidebar_label: Actualización
---


Este servicio se encarga de **enviar notificaciones de tipo `ACTUALIZACION_APP`** a todos los usuarios registrados que tengan habilitadas las preferencias correspondientes.

---

## 🔍 Ubicación

`src/services/notificaciones/actualizacion.service.ts`

---

## 📦 Dependencias

- [`prisma`](../../utils/prismaClient.md )— Cliente de base de datos para manejar usuarios y notificaciones.
- [`TipoNotificacion`](https://www.prisma.io/docs) — Enumeración generada por Prisma que define los tipos de notificación.
- [`puedeNotificar`](../../utils/notificaciones/preferenciasNotificaciones) — Función auxiliar que valida si un usuario tiene habilitado recibir un tipo de notificación específico.

---

## 📜 Funciones

### 1. `notificarActualizacionApp(titulo: string, mensaje: string)`

Envía una notificación de tipo `ACTUALIZACION_APP` a todos los usuarios activos (no eliminados) que tengan habilitada esta preferencia.

**Parámetros:**
- `titulo`: Texto que será el título de la notificación.
- `mensaje`: Contenido principal de la notificación.

**Flujo de ejecución:**
1. Obtiene todos los usuarios cuyo `deletedAt` sea `null` (soft delete).
2. Si no hay usuarios, muestra una advertencia y finaliza.
3. Itera sobre cada usuario y verifica, usando `puedeNotificar`, si este puede recibir notificaciones de tipo `ACTUALIZACION_APP`.
4. Crea un arreglo con las notificaciones a enviar.
5. Inserta todas las notificaciones en la base de datos mediante `createMany` si hay alguna pendiente.

**Estructura de la notificación generada:**
```ts
{
  idUsuario: number;
  tipo: TipoNotificacion.ACTUALIZACION_APP;
  titulo: string;
  mensaje: string;
  leida: false;
}
````

**Retorno:**

* `Promise<void>` — No retorna datos, pero crea registros en la tabla de notificaciones.

---

## 🧠 Observaciones

* Este servicio **respeta las preferencias de notificación** del usuario mediante `puedeNotificar`.
* Utiliza **soft delete** para determinar usuarios activos (`deletedAt: null`).
* Agrupa las inserciones en una sola operación (`createMany`) para mejorar el rendimiento.

---
