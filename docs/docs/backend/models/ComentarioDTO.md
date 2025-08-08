---
id: comentario
title: ComentarioDTO
sidebar_label: Comentario
---

Este módulo define la estructura de datos `ComentarioDTO`, utilizada para representar los comentarios que los usuarios dejan sobre productos dentro del sistema. Es útil tanto para funciones de interacción social como para retroalimentación de productos.

---

## 🔍 Ubicación

`src/models/comentario.ts`

---

## 🧩 Definición de la interfaz

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
````

---

## 🧾 Campos de la interfaz

| Campo             | Tipo   | Descripción                                                                 |
| ----------------- | ------ | --------------------------------------------------------------------------- |
| `idComentario`    | number | Identificador único del comentario.                                         |
| `idUsuario`       | number | ID del usuario que realizó el comentario.                                   |
| `idProducto`      | number | ID del producto al que hace referencia el comentario.                       |
| `comentario`      | string | Texto del comentario ingresado por el usuario.                              |
| `fechaComentario` | Date   | Fecha en que se realizó el comentario.                                      |
| `estado`          | string | Estado del comentario (por ejemplo: `activo`, `oculto`, `eliminado`, etc.). |
| `createdAt`       | Date   | Fecha de creación del comentario (registro en base de datos).               |
| `updatedAt`       | Date   | Fecha de la última actualización del comentario.                            |

---

## ✅ Ejemplo de uso

```ts
const nuevoComentario: ComentarioDTO = {
  idComentario: 12,
  idUsuario: 34,
  idProducto: 56,
  comentario: "Muy buen producto, lo recomiendo.",
  fechaComentario: new Date(),
  estado: "activo",
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

---

## 📚 Propósito

Este DTO estandariza los datos relacionados con comentarios en productos. Facilita operaciones como la visualización de opiniones, administración de contenido, moderación de comentarios y análisis de feedback dentro de la aplicación.

---
