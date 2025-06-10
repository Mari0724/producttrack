---
id: notificarReposicion
title: notificarReposicion
sidebar_label: Notificación de reposición recomendada
---

# Notificación de Reposición Recomendada

Este módulo define la función `notificarReposicionRecomendada`, que se encarga de enviar notificaciones a todos los miembros de una empresa cuando alguno de sus productos tiene una cantidad actual por debajo del mínimo recomendado.

---

## 🔍 Ubicación

`src/services/notificaciones/notificarReposicion.ts`

---

## 🔔 Función: notificarReposicionRecomendada

```ts
export async function notificarReposicionRecomendada(): Promise<void>
```

#### ✅ Propósito:

Detectar productos con stock bajo y generar notificaciones para todos los usuarios de la empresa correspondiente, recomendando la reposición del producto.

---

## 📥 Parámetros:

No recibe parámetros.

---

## 📤 Retorno:

No retorna datos. Su efecto principal es enviar notificaciones y registrar un mensaje en la consola.

---

## 🔍 Comportamiento:

1. Consulta productos con un stock actual inferior al mínimo recomendado.

2. Verifica que el producto pertenezca a un usuario empresarial.

3. Obtiene todos los usuarios pertenecientes a la empresa del dueño del producto.

4. Envía una notificación a cada usuario de la empresa indicando que se recomienda la reposición del producto.

5. Muestra un mensaje en consola una vez se hayan generado las notificaciones.

---

## 🧠 Ejemplo de notificación enviada:

```json
{
  "tipo": "REPOSICION_RECOMENDADA",
  "titulo": "Reposición recomendada: Jugo de Mango",
  "mensaje": "El producto \"Jugo de Mango\" tiene 5 unidades, por debajo del mínimo recomendado (10)."
}
```

---

## 📦 Dependencias:

- `@prisma/client`: Para acceder a los datos de productos, usuarios y notificaciones.

- `TipoNotificacion.REPOSICION_RECOMENDADA`: Enum utilizado para clasificar la notificación.

---