---
id: enviar-notificaciones
title: Utilidad para Validar Notificaciones
sidebar_label: Enviar Notificaciones
---

Función utilizada para **determinar si un tipo específico de notificación puede ser enviada al usuario** según sus preferencias guardadas en el sistema ProductTrack.

---

## 🔍 Ubicación

`src/utils/enviarNotificaciones.ts`

---

## 🧩 Propiedades / Parámetros

| Parámetro | Tipo     | Requerido | Descripción                                                                                           |
| --------- | -------- | --------- | ----------------------------------------------------------------------------------------------------- |
| `tipo`    | `string` | ✅ Sí     | Nombre o clave que identifica el tipo de notificación (por ejemplo: `"alertaStock"`, `"nuevoPedido"`). |

---

## 📌 Descripción de la lógica

1. La función intenta obtener las preferencias de notificaciones del usuario desde `localStorage` usando la clave `"preferenciasNotificaciones"`.
2. Si no existen preferencias guardadas, **se permite el envío** de cualquier notificación (valor `true` por defecto).
3. Si existen preferencias, estas se parsean desde formato JSON y se verifica:
   - Si `prefs[tipo]` es **`false`**, significa que el usuario desactivó ese tipo de notificación.
   - En cualquier otro caso, se considera que puede enviarse.

---

## 🛠️ Usos comunes

- Antes de mostrar una alerta o enviar una notificación push.
- Para respetar la configuración de notificaciones personalizada por cada usuario.
- Como filtro previo en procesos automáticos de envío de avisos.

---

## ✅ Ejemplo de uso

```ts
import { puedeNotificar } from '@/utils/enviarNotificaciones';

if (puedeNotificar('nuevoPedido')) {
  mostrarNotificacion('Tienes un nuevo pedido pendiente');
}
````

En este ejemplo:

* Se verifica si el usuario tiene habilitadas las notificaciones para `"nuevoPedido"`.
* Solo en caso afirmativo se ejecuta la función que muestra la alerta.

---
