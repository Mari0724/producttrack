---
id: comentarios-modal-producto
title: Modal de Comentarios por Producto
sidebar_label: CommentsModal
---

Este componente React muestra una interfaz modal para **visualizar y agregar notas personales (comentarios)** asociadas a un producto específico. Utiliza estado local, efectos de React y API para leer y escribir comentarios. También integra retroalimentación visual con `react-hot-toast`.

---

## 🔍 Ubicación

`src/components/individual/CommentsModal.tsx`

---

## 📦 Dependencias utilizadas

```ts
import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { getComentariosPorProducto, crearComentario } from '../../api/comentarios';
import toast from 'react-hot-toast';
````

* **React**: Para gestionar el estado y ciclo de vida del componente.
* **react-icons**: Icono de cierre (`AiOutlineClose`).
* **getComentariosPorProducto / crearComentario**: Funciones API que interactúan con el backend.
* **react-hot-toast**: Biblioteca para mostrar notificaciones al usuario.

---

## 🧩 Propiedades del componente

```ts
interface CommentsModalProps {
  productId: number;
  productName: string;
  onClose: () => void;
}
```

| Propiedad     | Tipo         | Descripción                                       |
| ------------- | ------------ | ------------------------------------------------- |
| `productId`   | `number`     | ID del producto del cual se muestran comentarios. |
| `productName` | `string`     | Nombre del producto (para mostrar en el modal).   |
| `onClose`     | `() => void` | Función para cerrar el modal.                     |

---

## 🧠 Lógica interna

### 📥 Cargar comentarios existentes

Se ejecuta al montar el componente. Realiza una solicitud `GET` a la API:

```ts
useEffect(() => {
  const fetchComments = async () => {
    const res = await getComentariosPorProducto(productId);
    // Se formatean los comentarios
  };
  fetchComments();
}, [productId]);
```

* Formatea los comentarios para que contengan: texto, autor, fecha y ID.
* Utiliza localStorage para obtener información del usuario actual.

---

### 📝 Agregar nuevo comentario

```ts
const handleAddComment = async () => {
  await crearComentario({
    idUsuario: userId,
    idProducto: productId,
    comentario: newComment,
  });
};
```

* Envía un comentario al backend con los datos del producto y usuario.
* Actualiza localmente la lista de comentarios si fue exitoso.
* Muestra un toast de éxito o error según el resultado.

---

## 💬 Estructura de los comentarios

```ts
interface Comment {
  id: number;
  text: string;
  user: string;
  date: string;
}
```

Cada comentario mostrado contiene:

* `text`: contenido del comentario.
* `user`: nombre del usuario.
* `date`: fecha formateada (`YYYY-MM-DD`).

---

## 🎨 Diseño y estructura visual

* **Modal centrado** con fondo semitransparente.
* Comentarios listados en un contenedor con scroll.
* Campo `textarea` para ingresar nuevas notas.
* Botón "Subir mis notas" estilizado.
* Ícono de cierre en la esquina superior derecha.

---

## 💡 Ejemplo de uso

```tsx
<ProductCommentsModal
  productId={15}
  productName="Chocolate Premium 80%"
  onClose={() => setShowModal(false)}
/>
```

* Se muestra un modal con los comentarios del producto con ID `15`.
* Permite subir nuevas notas personales y ver las existentes.

---

## 📝 Notas adicionales

* Utiliza `localStorage` para obtener el `userId` del usuario actual.
* Los comentarios se actualizan dinámicamente sin recargar la página.
* Se maneja el estado de carga (`loading`) mientras se obtienen comentarios.
* No está condicionado por roles; cualquier usuario individual puede ver y subir comentarios.