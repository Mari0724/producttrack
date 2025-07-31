---
id: user.service
title: Servicio Users
sidebar_label: User Service
---

# User Service

Este archivo contiene la lógica del servicio relacionada con la gestión de usuarios, incluyendo operaciones CRUD, validaciones de negocio y manejo de autenticación.

---

## 🔍 Ubicación

`src/services/user.service.ts`

---

## 📦 Dependencias

* `prisma`: ORM para acceso a la base de datos.
* `cloudinary`: Gestión de imágenes (perfil de usuario).
* `bcrypt`: Encriptación de contraseñas.
* `jsonwebtoken`: Generación de tokens JWT.
* `UserDTO`: Tipo de datos del usuario.

---

## 🔍 `getAllUsers(filters: Partial<UserDTO>)`

Obtiene todos los usuarios que coincidan con los filtros proporcionados.

### Parámetros:

* `filters`: Objeto parcial del DTO con campos como `username`, `correo`, `telefono`, `estado`, `rol`, etc.

### Retorno:

* Lista de usuarios que cumplen con los criterios.

---

## 🔍 `getUserById(id: number)`

Obtiene un usuario por su `idUsuario`.

### Parámetros:

* `id`: ID del usuario.

### Retorno:

* Objeto del usuario si existe, `null` si no.

---

## 🆕 `createUser(data: UserDTO)`

Crea un nuevo usuario, aplicando validaciones según el tipo y rol.

### Reglas de negocio:

* Si `rol` es `USUARIO`, debe especificarse `tipoUsuario`.
* Si `rol` es `EQUIPO`, debe tener un `empresaId` válido que corresponda a un usuario de tipo `EMPRESARIAL`.

### Proceso:

1. Valida reglas de negocio.
2. Hashea la contraseña.
3. Construye manualmente el objeto de usuario.
4. Guarda en la base de datos.
5. Genera un JWT con 24 horas de expiración.

### Parámetros:

* `data`: Objeto completo `UserDTO`.

### Retorno:

* Objeto `{ user, token }`.

---

## 🆙 `updateUser(id: number, data: Partial<UserDTO>)`

Actualiza un usuario existente, con reglas específicas.

### Reglas:

* No se puede cambiar el `rol` del usuario.
* Si se envía una nueva contraseña, será encriptada.
* Si se actualiza `fotoPerfil`, elimina la antigua imagen de Cloudinary.

### Parámetros:

* `id`: ID del usuario.
* `data`: Campos a actualizar (parcial del DTO).

### Retorno:

* Objeto del usuario actualizado.

---

## ✖️ `deleteUser(id: number)`

Realiza una eliminación lógica del usuario.

### Proceso:

* Cambia `estado` a `"inactivo"`.
* Establece `deletedAt` y `updatedAt`.

### Parámetros:

* `id`: ID del usuario.

### Retorno:

* Objeto del usuario marcado como eliminado.

---

## 🧠 Observaciones:

* La lógica está fuertemente ligada al tipo de rol para validar negocio.
* `fotoPerfil` se gestiona con Cloudinary, eliminando la imagen anterior al actualizar.
* El servicio evita eliminaciones físicas, optando por una estrategia lógica (`deletedAt`, `estado`).

