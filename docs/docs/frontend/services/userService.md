---
id: user-service
title: Servicio de Usuario
sidebar_label: User
---

Este servicio maneja operaciones relacionadas con **usuarios y empresas** en la aplicación.  
Permite obtener información, actualizar datos y subir fotos de perfil.

---

## 🔍 Ubicación
`src/services/userService.ts`

---

## 📌 Propósito
Facilitar la interacción con la API para la gestión de usuarios y empresas, incluyendo:

- Consultar información de empresas por su ID.
- Consultar información de usuarios por su ID.
- Actualizar datos de usuario.
- Subir fotos de perfil.

---

## 🧰 Funciones exportadas

### 🔹 `getEmpresaById(id: number)`
Obtiene la información de una empresa mediante su ID.

**Parámetros:**  
- `id` (`number`): ID de la empresa.

**Retorna:**  
- `UserDTO` → Datos de la empresa.

---

### 🔹 `getUserById(id: number)`
Obtiene la información de un usuario por su ID.

**Parámetros:**  
- `id` (`number`): ID del usuario.

**Retorna:**  
- `UserDTO` → Datos del usuario.

---

### 🔹 `updateUsuario(id: number, data: Partial<UserDTO>)`
Actualiza los datos de un usuario existente.

**Parámetros:**  
- `id` (`number`): ID del usuario.  
- `data` (`Partial<UserDTO>`): Campos a actualizar.

**Retorna:**  
- `{ message: string }` → Mensaje de confirmación.

---

### 🔹 `subirFotoPerfil(userId: number, foto: File)`
Sube una nueva foto de perfil de usuario utilizando **Cloudinary** como proveedor de almacenamiento.

**Parámetros:**  
- `userId` (`number`): ID del usuario.  
- `foto` (`File`): Archivo de imagen a subir.

**Retorna:**  
- Respuesta de la API con la nueva URL de la foto y un mensaje.

**Notas:**  
- Utiliza `multipart/form-data` para enviar el archivo.  
- Requiere token JWT almacenado en `localStorage`.

---

## 📌 Ejemplo de uso

```ts
import { getUserById, updateUsuario, subirFotoPerfil } from "../services/userService";

// Obtener usuario
const usuario = await getUserById(5);

// Actualizar datos del usuario
await updateUsuario(5, { nombre: "Carlos Pérez" });

// Subir foto de perfil
const file = document.querySelector<HTMLInputElement>("#foto")?.files?.[0];
if (file) {
  await subirFotoPerfil(5, file);
}
````

---

## 🔗 Dependencias

* [`axiosInstance`](../utils/axiosInstance) → Cliente Axios configurado para consumir la API.
* [`UserDTO`](../types/UserDTO) → Definición de tipo para los datos de usuario.

---