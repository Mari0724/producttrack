---
id: profile-service
title: Servicio de Perfil de Usuario
sidebar_label: Perfil de Usuario
---

Este archivo define las funciones del servicio relacionadas con la **gestión de perfiles de usuario** en el sistema. Utiliza `axiosInstance` para comunicarse con la API y realizar operaciones de consulta y actualización, incluyendo la gestión de fotos de perfil.

---

## 🔍 Ubicación

`src/services/profileService.ts`

---

## 📌 Propósito

Gestionar las operaciones del perfil de usuario:

- Obtener datos completos de un usuario por su ID.
- Actualizar información del perfil.
- Subir o reemplazar la foto de perfil.
- Consultar información de una empresa a partir de su ID.

---

## 🧩 Importaciones clave

```ts
import axios from "../utils/axiosInstance";
import type { UserDTO } from "../types/UserDTO";
````

| Módulo          | Propósito                                                 |
| --------------- | --------------------------------------------------------- |
| `axiosInstance` | Cliente Axios preconfigurado para interactuar con la API. |
| `UserDTO`       | Tipo que define la estructura de los datos del usuario.   |

---

## 🧰 Funciones exportadas

### 🔹 `getUserProfile(id: number): Promise<UserDTO>`

Obtiene la información de un usuario según su ID.

**Parámetros:**

* `id` (`number`): Identificador único del usuario.

**Retorna:**
Un objeto `UserDTO` con todos los datos del usuario.

---

### 🔹 `updateUserProfile(id: number, data: Partial<UserDTO>): Promise<{ message: string }>`

Actualiza la información del perfil de un usuario.

**Parámetros:**

* `id` (`number`): Identificador del usuario.
* `data` (`Partial<UserDTO>`): Objeto con los campos a actualizar.

**Retorna:**
Un objeto con un mensaje de confirmación:

```json
{ "message": "Perfil actualizado correctamente" }
```

---

### 🔹 `uploadUserProfilePhoto(userId: number, file: File): Promise<{ message: string; url: string }>`

Sube o reemplaza la foto de perfil de un usuario.

**Parámetros:**

* `userId` (`number`): Identificador del usuario.
* `file` (`File`): Archivo de imagen que se desea establecer como foto de perfil.

**Retorna:**
Un objeto con un mensaje de confirmación y la URL de la nueva foto:

```json
{ "message": "Foto de perfil actualizada", "url": "https://..." }
```

**Notas:**

* El archivo se envía en formato `multipart/form-data`.
* La solicitud incluye un encabezado `Authorization` con el token almacenado en `localStorage`.

---

### 🔹 `getEmpresaInfo(empresaId: number): Promise<any>`

Obtiene la información de una empresa a partir de su ID.

**Parámetros:**

* `empresaId` (`number`): Identificador de la empresa.

**Retorna:**
Objeto con los datos de la empresa, filtrando por `tipoUsuario=EMPRESARIAL`.

---

## 🧠 Detalles técnicos

* Se utiliza `axiosInstance` para realizar todas las solicitudes HTTP.
* `FormData` se usa para manejar la subida de archivos en `uploadUserProfilePhoto`.
* Se respeta el tipado estricto mediante `UserDTO` y tipos de respuesta específicos.
* Los endpoints utilizados incluyen:

  * `GET /usuarios/:id`
  * `PUT /usuarios/:id`
  * `PUT /api/usuarios/:id/foto`
  * `GET /usuarios/:empresaId?tipoUsuario=EMPRESARIAL`

---

## ✅ Resumen

| Función                  | Propósito                                     |
| ------------------------ | --------------------------------------------- |
| `getUserProfile`         | Obtener información de un usuario por ID.     |
| `updateUserProfile`      | Modificar los datos del perfil de un usuario. |
| `uploadUserProfilePhoto` | Subir o actualizar la foto de perfil.         |
| `getEmpresaInfo`         | Consultar datos de una empresa por su ID.     |

---