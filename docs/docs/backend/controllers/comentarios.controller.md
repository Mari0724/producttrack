---
id: comentarios.controller
title: ComentariosController
sidebar_label: ComentariosController
---

# ComentariosController

Este controlador gestiona las operaciones relacionadas con los comentarios realizados por los usuarios sobre productos específicos.

---

## 🔍 Ubicación

`src/controllers/comentarios.controller.ts`

---

## 📌 Endpoints

### 📝 Obtener comentarios por producto

**GET** `/comentarios/{productoId}`

Devuelve todos los comentarios asociados a un producto.

#### Parámetros

- `productoId` (path) – ID del producto del cual se desean obtener los comentarios.

#### Respuesta

- Lista de objetos `ComentarioDTO`.

---

### ✍️ Crear comentario

**POST** `/comentarios/`

Crea un nuevo comentario para un producto.

#### Cuerpo

```ts
{
  idUsuario: number;
  idProducto: number;
  comentario: string;
}
````

#### Respuesta

* Objeto `ComentarioDTO` con el comentario creado.

---

### ✏️ Actualizar comentario

**PUT** `/comentarios/{idComentario}`

Permite editar un comentario ya existente.

#### Parámetros

* `idComentario` (path) – ID del comentario a actualizar.

#### Cuerpo

```ts
{
  comentario: string;
}
```

#### Respuesta

* Objeto `ComentarioDTO` con el comentario actualizado.

---

### ❌ Eliminar comentario

**DELETE** `/comentarios/{idComentario}`

Elimina un comentario por su ID.

#### Parámetros

* `idComentario` (path) – ID del comentario a eliminar.

#### Respuesta

```ts
{
  mensaje: "Comentario eliminado correctamente"
}
```

---

## 🛠️ Notas técnicas

* Los servicios que respaldan estos endpoints se encuentran en `src/services/comentarios.service.ts`.
* No se requiere autenticación en este controlador, pero puedes añadir validaciones de seguridad si deseas restringir la edición o eliminación por parte del autor del comentario.
* Esta funcionalidad puede integrarse con el sistema de notificaciones para alertar sobre nuevos comentarios.