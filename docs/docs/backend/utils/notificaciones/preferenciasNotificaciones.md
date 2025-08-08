---
id: preferenciasNotificaciones
title: Preferencias de Notificaciones
sidebar_label: Preferencias Notificaciones
---

Este módulo define la lógica para verificar si un usuario puede recibir un tipo específico de notificación, según las preferencias que tenga guardadas en la base de datos.

---

## 🔍 Ubicación

`src/utils/notificaciones/preferenciasNotificaciones.ts`

---

## 📌 Descripción general

1. **Lista de tipos válidos**  
   Se define un arreglo constante con todos los tipos de notificaciones soportados por el sistema, como:
   - `STOCK_BAJO`
   - `PRODUCTO_VENCIDO`
   - `COMENTARIO_EQUIPO`
   - `REPOSICION_RECOMENDADA`
   - `ACTUALIZACION_APP`

2. **Acceso a la base de datos**  
   Se utiliza `prismaClient` para consultar la tabla `preferenciasNotificaciones` y obtener las configuraciones del usuario según su `idUsuario`.

3. **Lógica de validación**  
   - Si el usuario **no tiene** preferencias guardadas, se asume que acepta todas las notificaciones.
   - Si el tipo de notificación recibido **no está en la lista de tipos válidos**, también se permite por defecto.
   - Si está en la lista, se consulta la preferencia específica (campo booleano en la base de datos) y se devuelve `true` o `false` según corresponda.

---

## 🔗 Uso

Antes de enviar cualquier notificación, este módulo permite comprobar si el usuario tiene habilitada la recepción del tipo solicitado.

**Ejemplo:**

```ts
if (await puedeNotificar(usuario.id, 'STOCK_BAJO')) {
  // Enviar la notificación
}
````

---

## 🧩 Relación con otros módulos

* Utiliza **`prismaClient`** (`src/utils/prismaClient.ts`) para las consultas.
* Es llamado en los servicios de envío de notificaciones para filtrar destinatarios.
* Depende de que la tabla `preferenciasNotificaciones` tenga los campos booleanos que corresponden a cada tipo de notificación.

---

## ⚠️ Consideraciones

* Si no existe un registro de preferencias para el usuario, se interpretará como que acepta todas las notificaciones.
* El tipo recibido se normaliza a **mayúsculas** antes de compararlo.
* Los cambios en los tipos válidos deben reflejarse tanto en este módulo como en la estructura de la base de datos.
* Pasar un tipo no contemplado en la lista no genera error, simplemente se permite la notificación.

---


