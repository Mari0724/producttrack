---
id: team-service
title: Servicio de Equipo
sidebar_label: Team 
---

Este archivo define el servicio para **gestionar miembros de equipo** dentro de una organización o empresa. Utiliza `axiosInstance` para interactuar con la API y ofrece funciones para **crear, obtener, actualizar y eliminar** miembros.

---

## 🔍 Ubicación
`src/services/teamService.ts`

---

## 📌 Propósito
Gestionar las operaciones CRUD de miembros de equipo, incluyendo:

- Creación de un nuevo miembro.
- Obtención de la lista de todos los miembros.
- Actualización de información de un miembro.
- Eliminación lógica de un miembro.

---

## 🧩 Interfaces

### 🔹 `CreateTeamMemberDTO`
Define la estructura de datos necesaria para crear un nuevo miembro.

| Campo           | Tipo                                           | Obligatorio | Descripción |
|-----------------|------------------------------------------------|-------------|-------------|
| `username`      | `string`                                       | ✅          | Nombre de usuario único. |
| `correo`        | `string`                                       | ✅          | Correo electrónico del miembro. |
| `password`      | `string`                                       | ✅          | Contraseña inicial. |
| `nombreCompleto`| `string`                                       | ✅          | Nombre completo del miembro. |
| `rolEquipo`     | `"LECTOR" \| "COMENTARISTA" \| "EDITOR"`        | ✅          | Rol asignado dentro del equipo. |
| `telefono`      | `string`                                       | ✅          | Número de teléfono. |
| `direccion`     | `string`                                       | ✅          | Dirección del miembro. |
| `fotoPerfil`    | `string`                                       | ❌          | URL o base64 de la foto de perfil. |
| `estado`        | `"activo" \| "inactivo"`                       | ❌          | Estado del miembro (por defecto activo). |
| `empresaId`     | `number`                                       | ❌          | ID de la empresa a la que pertenece. |
| `perfilCompleto`| `boolean`                                      | ❌          | Indica si el perfil está completo. |

---

### 🔹 `UpdateTeamMemberDTO`
Define la estructura de datos para actualizar información de un miembro existente.

| Campo           | Tipo                                           | Obligatorio | Descripción |
|-----------------|------------------------------------------------|-------------|-------------|
| `nombreCompleto`| `string`                                       | ❌          | Nuevo nombre completo. |
| `correo`        | `string`                                       | ❌          | Nuevo correo electrónico. |
| `rolEquipo`     | `"LECTOR" \| "COMENTARISTA" \| "EDITOR"`        | ❌          | Nuevo rol asignado. |
| `telefono`      | `string`                                       | ❌          | Nuevo número de teléfono. |
| `direccion`     | `string`                                       | ❌          | Nueva dirección. |
| `fotoPerfil`    | `string`                                       | ❌          | Nueva foto de perfil. |
| `estado`        | `"activo" \| "inactivo"`                       | ❌          | Nuevo estado del miembro. |

---

## 🧰 Funciones exportadas

### 🔹 `createTeamMember(data: CreateTeamMemberDTO)`
Crea un nuevo miembro en el equipo.

**Parámetros:**  
- `data` (`CreateTeamMemberDTO`): Datos del miembro.

**Retorna:**  
- Respuesta de la API con el miembro creado.

---

### 🔹 `getAllTeamMembers()`
Obtiene la lista de todos los miembros del equipo.

**Retorna:**  
- Lista de miembros con su información.

---

### 🔹 `updateTeamMember(id: number, data: UpdateTeamMemberDTO)`
Actualiza la información de un miembro existente.

**Parámetros:**  
- `id` (`number`): ID del miembro a actualizar.  
- `data` (`UpdateTeamMemberDTO`): Datos a modificar.

**Retorna:**  
- Respuesta de la API con el miembro actualizado.

---

### 🔹 `deleteTeamMember(id: number)`
Realiza la eliminación lógica de un miembro.

**Parámetros:**  
- `id` (`number`): ID del miembro.

**Retorna:**  
- Respuesta de la API confirmando la eliminación.

---

## 📌 Ejemplo de uso

```ts
import { createTeamMember, getAllTeamMembers, updateTeamMember, deleteTeamMember } from "../services/teamService";

// Crear miembro
await createTeamMember({
  username: "jdoe",
  correo: "jdoe@example.com",
  password: "123456",
  nombreCompleto: "John Doe",
  rolEquipo: "EDITOR",
  telefono: "123456789",
  direccion: "Calle 123",
});

// Obtener miembros
const miembros = await getAllTeamMembers();

// Actualizar miembro
await updateTeamMember(1, { rolEquipo: "COMENTARISTA" });

// Eliminar miembro
await deleteTeamMember(1);
````

---

## 🔗 Dependencias

* [`axiosInstance`](../utils/axiosInstance.md) → Cliente Axios configurado para interactuar con la API.

---