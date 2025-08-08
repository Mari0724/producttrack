---

id: comentarios-api
title: API de Comentarios
sidebar_label: comentarios

---

Este archivo define dos funciones que interactúan con el backend para gestionar los **comentarios asociados a productos**. Utiliza Axios para realizar solicitudes HTTP al servidor.

---

## 🔍 Ubicación

`src/api/comentarios.ts`

---

## 📦 Dependencias utilizadas

```ts
import axios from 'axios';
import { url } from '../constants';
```

* **axios**: Cliente HTTP para realizar peticiones al servidor.
* **url**: Constante que define la URL base del backend.

---

## 📘 Funciones exportadas

### ✅ `getComentariosPorProducto(productoId: number)`

```ts
export const getComentariosPorProducto = (productoId: number) => {
  return axios.get(`${url}/comentarios/${productoId}`);
};
```

* Realiza una solicitud GET para obtener todos los comentarios asociados a un producto específico.
* El `productoId` es pasado como parámetro para formar la ruta de la petición.

📥 **Entrada**:
`productoId` (número): ID del producto del cual se quieren obtener los comentarios.

📤 **Salida**:
Promesa con la respuesta HTTP que contiene los comentarios.

---

### 📝 `crearComentario(comentario: { idUsuario: number, idProducto: number, comentario: string })`

```ts
export const crearComentario = (comentario: { idUsuario: number, idProducto: number, comentario: string }) => {
  return axios.post(`${url}/comentarios`, comentario);
};
```

* Realiza una solicitud POST para **crear un nuevo comentario** para un producto determinado.
* Recibe un objeto con el ID del usuario, el ID del producto y el texto del comentario.

📥 **Entrada**:
Objeto con los siguientes campos:

| Campo        | Tipo     | Descripción                 |
| ------------ | -------- | --------------------------- |
| `idUsuario`  | `number` | ID del usuario que comenta. |
| `idProducto` | `number` | ID del producto comentado.  |
| `comentario` | `string` | Texto del comentario.       |

📤 **Salida**:
Promesa con la respuesta HTTP tras crear el comentario.

---

## 🚀 Ejemplo de uso

```ts
import { getComentariosPorProducto, crearComentario } from "../api/comentarios";

// Obtener comentarios de un producto
const comentarios = await getComentariosPorProducto(7);

// Crear nuevo comentario
await crearComentario({
  idUsuario: 2,
  idProducto: 7,
  comentario: "¡Excelente calidad!",
});
```

---

## 📝 Notas adicionales

* Este archivo actúa como una **capa de abstracción** para centralizar las operaciones relacionadas con comentarios.
* Permite mantener el código más limpio y reutilizable en los componentes del frontend.