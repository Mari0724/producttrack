---
id: comentarios-modal
title: Modal de Comentarios por Producto
sidebar_label: CompanyCommentsModal
---

Este componente React muestra una interfaz modal para **visualizar y agregar comentarios** asociados a un producto específico. Está diseñado para usuarios con permisos según su rol y tipo. Utiliza lógica interna para manejar comentarios de forma asincrónica y muestra retroalimentación con `react-hot-toast`.

---

## 🔍 Ubicación

`src/components/empresarial/CompanyCommentsModal.tsx`

---

## 📦 Dependencias utilizadas

```ts
import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { getComentariosPorProducto, crearComentario } from '../../api/comentarios';
import toast from 'react-hot-toast';
````

* **React**: Para gestionar el estado y ciclo de vida del componente.
* **AiOutlineClose**: Ícono de cierre del modal (`react-icons`).
* **getComentariosPorProducto / crearComentario**: Funciones API para manejar los comentarios.
* **toast**: Biblioteca para mostrar notificaciones al usuario.

---

## 🧩 Propiedades del componente

```ts
interface CompanyCommentsModalProps {
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

## 🔧 Lógica interna

### 📥 Lectura de comentarios

Se ejecuta una petición al montar el componente para obtener los comentarios existentes del producto:

```ts
useEffect(() => {
  const fetchComments = async () => {
    const res = await getComentariosPorProducto(productId);
    // Mapea los comentarios a un formato uniforme
  };
  fetchComments();
}, [productId]);
```

* **`getComentariosPorProducto`** consulta al backend por comentarios asociados al `productId`.
* Los comentarios se formatean para mostrar la fecha de creación.

---

### 📝 Creación de nuevos comentarios

```ts
const handleAddComment = async () => {
  await crearComentario({
    idUsuario: userId,
    idProducto: productId,
    comentario: newComment,
  });
};
```

* Verifica que el campo de comentario no esté vacío.
* Envía el comentario con `crearComentario`, usando el ID del usuario y producto.
* Si la operación es exitosa, se actualiza la lista local de comentarios y se muestra una notificación de éxito.

---

### 🔐 Control de permisos

```ts
const puedeComentar = tipoUsuario === "EMPRESARIAL" || userRol === "EDITOR" || userRol === "COMENTARISTA";
```

* Solo los usuarios con ciertos roles pueden comentar.
* Si el rol no está autorizado, no podrá comentar.

---

## 💬 Estructura del comentario

```ts
interface Comment {
  id: number;
  text: string;
  user: string;
  date: string;
}
```

Cada comentario mostrado contiene:

* Texto (`text`)
* Usuario autor (`user`)
* Fecha (`date`, con formato `YYYY-MM-DD`)

---

## 💡 Ejemplo de uso

```tsx
<CompanyCommentsModal
  productId={42}
  productName="Café orgánico"
  onClose={() => setShowModal(false)}
/>
```

* Muestra un modal con comentarios del producto con ID `42`.
* Permite a usuarios empresariales o con rol adecuado escribir un nuevo comentario.

---

## 📝 Notas adicionales

* Este componente es **autocontenible** y no necesita ser envuelto por un `Provider`.
* Utiliza `localStorage` para recuperar datos del usuario actual (ID, nombre, rol).
* Los comentarios se actualizan dinámicamente sin necesidad de recargar la página.
* Se incluye feedback visual y accesibilidad básica (`toast`, scroll, cierre de modal).