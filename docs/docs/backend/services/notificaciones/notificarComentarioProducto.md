---
id: notificarComentarioProducto
title: notificarComentarioProducto
sidebar_label: Notificar comentario en producto
---

# Notificar comentario en producto

Este servicio crea notificaciones para todos los miembros de una empresa cuando un producto recibe un nuevo comentario. Está diseñado para mantener informado al equipo del propietario del producto sobre la actividad en sus publicaciones.

---

## 🔍 Ubicación

`src/services/notificaciones/notificarComentarioProducto.ts`

---

## 🔔 Función: notificarComentarioProducto

```ts
export async function notificarComentarioProducto(idComentario: number): Promise<void>
```
#### ✅ Propósito:

Enviar notificaciones automáticas a los miembros de una empresa cuando un producto recibe un nuevo comentario.

---

### 📥 Parámetros

| Nombre        | Tipo     | Descripción                                                     |
| ------------- | -------- | ---------------------------------------------------------------- |
| idComentario  | number   | Identificador del comentario que se acaba de crear.             |


---

### 📤 Retorno

No retorna datos. Si todo va bien, crea múltiples notificaciones en la base de datos.


---

## 🔍 Comportamiento:

1. Busca el comentario usando su ID, incluyendo el producto y el dueño del producto.

2. Verifica que el comentario, producto y dueño existan.

3. Verifica que el dueño del producto pertenezca a una empresa.

4. Obtiene todos los miembros de esa empresa.

5. Genera una notificación personalizada para cada miembro.

6. Inserta todas las notificaciones en la base de datos usando createMany.

---

## 📌 Condiciones de validación:

- Si no se encuentra el comentario, producto o usuario → se emite una advertencia y se termina el proceso.

- Si el dueño del producto no pertenece a una empresa → se emite una advertencia y se cancela la notificación.

---

## 📦 Dependencias:

- Prisma ORM (`prismaClient.ts`)

- Enumeración `TipoNotificacion` de `@prisma/client`

---

## 🧠 Ejemplo de contenido generado:

Título:
`Nuevo comentario en producto: Leche deslactosada en bolsa 1L`

Mensaje:
`Se ha comentado el producto "Leche deslactosada en bolsa 1L": "Muy buen producto, me gustó bastante."`
