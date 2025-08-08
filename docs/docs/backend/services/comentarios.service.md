---
id: comentarios-service
title: Servicio de Comentarios
sidebar_label: Comentarios 
---

Este archivo define las funciones del servicio para manejar comentarios en productos. Se conecta a la base de datos mediante Prisma y gestiona operaciones CRUD (crear, leer, actualizar, eliminar), además de invocar notificaciones al crear un nuevo comentario.

---

## 🔍 Ubicación

`src/services/comentarios.service.ts`

---

## 📌 Propósito

Gestionar la lógica de negocio relacionada con los comentarios de productos:

- Obtener comentarios por producto.
- Crear un nuevo comentario.
- Actualizar un comentario existente.
- Eliminar un comentario.
- Notificar cuando se crea un nuevo comentario.

---

## 🧩 Importaciones clave

```ts
import prisma from '../utils/prismaClient';
import { ComentarioDTO } from '../models/ComentarioDTO';
import { notificarComentarioProducto } from '../services/notificaciones/comentarioProducto.service';
````

| Módulo                        | Propósito                                                          |
| ----------------------------- | ------------------------------------------------------------------ |
| `prismaClient`                | Cliente de Prisma para interactuar con la base de datos.           |
| `ComentarioDTO`               | Interfaz para representar la forma estandarizada de un comentario. |
| `notificarComentarioProducto` | Servicio de notificación que alerta sobre nuevos comentarios.      |

---

## 🧰 Funciones exportadas

### 🔹 `obtenerComentariosPorProducto(productoId: number): Promise<ComentarioDTO[]>`

Obtiene todos los comentarios asociados a un producto específico.

**Parámetros:**

* `productoId` (`number`): ID del producto.

**Retorna:**
Una lista de objetos `ComentarioDTO`, ordenados por fecha de comentario en orden descendente.

---

### 🔹 `crearComentario(idUsuario: number, idProducto: number, comentario: string): Promise<ComentarioDTO>`

Crea un nuevo comentario para un producto y notifica a través del sistema de notificaciones.

**Parámetros:**

* `idUsuario` (`number`): ID del usuario que comenta.
* `idProducto` (`number`): ID del producto comentado.
* `comentario` (`string`): Texto del comentario.

**Retorna:**
El comentario recién creado en formato `ComentarioDTO`.

**Notas:**

* El campo `estado` se establece inicialmente como `"pendiente"`.
* Se dispara una notificación al crear el comentario (`notificarComentarioProducto`).

---

### 🔹 `actualizarComentario(idComentario: number, nuevoTexto: string): Promise<ComentarioDTO>`

Actualiza el contenido de un comentario existente.

**Parámetros:**

* `idComentario` (`number`): ID del comentario a actualizar.
* `nuevoTexto` (`string`): Nuevo contenido del comentario.

**Retorna:**
El comentario actualizado en formato `ComentarioDTO`.

---

### 🔹 `eliminarComentario(idComentario: number): Promise<{ mensaje: string }>`

Elimina un comentario de la base de datos por su ID.

**Parámetros:**

* `idComentario` (`number`): ID del comentario a eliminar.

**Retorna:**
Un objeto con un mensaje de confirmación:

```json
{ "mensaje": "Comentario eliminado" }
```

---

## 🧠 Detalles técnicos

* Prisma es utilizado como ORM para realizar las operaciones sobre la tabla `comentarios`.
* La conversión de los resultados a `ComentarioDTO` se realiza mediante la función `mapComentarioToDTO` para mantener un formato coherente y desacoplado del modelo de base de datos.

---

## 🧾 Ejemplo de `ComentarioDTO`

```ts
export interface ComentarioDTO {
  idComentario: number;
  idUsuario: number;
  idProducto: number;
  comentario: string;
  fechaComentario: Date;
  estado: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## ✅ Resumen

| Función                         | Propósito                              |
| ------------------------------- | -------------------------------------- |
| `obtenerComentariosPorProducto` | Obtener comentarios de un producto.    |
| `crearComentario`               | Crear y notificar un nuevo comentario. |
| `actualizarComentario`          | Editar el contenido de un comentario.  |
| `eliminarComentario`            | Eliminar un comentario existente.      |

---
