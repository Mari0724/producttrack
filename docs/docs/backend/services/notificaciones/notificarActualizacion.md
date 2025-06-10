---
id: notificarActualizacion
title: Notificación de Actualización
sidebar_label: Notificar Actualización App
---

# Notificar Actualización de la App

Este módulo contiene una función que envía una notificación de tipo `ACTUALIZACION_APP` a todos los usuarios registrados. Se utiliza para alertar sobre cambios importantes, como nuevas versiones o actualizaciones de funcionalidades en la aplicación.

---

## 🔍 Ubicación

`src/services/notificaciones/notificarActualizacion.ts`

---

## 🚀 Función: notificarActualizacionApp

```ts
export async function notificarActualizacionApp(titulo: string, mensaje: string)
```

#### ✅ Propósito:
Enviar una notificación masiva a todos los usuarios activos sobre una actualización en la app.

---

## 📥 Parámetros:

| Nombre  | Tipo   | Descripción                                      |
|---------|--------|--------------------------------------------------|
| titulo  | string | Título breve que resume la actualización.        |
| mensaje | string | Mensaje explicativo con los detalles relevantes. |

---

## 📤 Retorno:
No retorna un valor. La función envía las notificaciones y registra el resultado en la consola.

---

## 🔍 Comportamiento:
1. Obtiene todos los usuarios que no han sido eliminados (`deletedAt: null`).

2. Si no hay usuarios, muestra una advertencia y termina.

3. Crea una notificación para cada usuario con el tipo `ACTUALIZACION_APP`.

4. Inserta todas las notificaciones en la base de datos usando `createMany`.

5. Muestra en consola cuántos usuarios fueron notificados exitosamente.

---

## 🧠 Ejemplo de uso:

```ts
await notificarActualizacionApp(
  "Nueva versión disponible",
  "Ya puedes descargar la versión 2.1 con mejoras de rendimiento."
);
```

---

## 📦 Dependencias:

`@prisma/client`: acceso a la base de datos.

Enumeración `TipoNotificacion`: definida en el esquema Prisma.

---