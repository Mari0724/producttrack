---
id: UserDTO
title: User DTO
sidebar_label: User DTO
---

Interfaz que define la estructura estándar de un **usuario del sistema ProductTrack**, incluyendo tanto usuarios individuales como empresariales, desarrolladores y miembros del equipo de trabajo empresarial.

---

## 🔍 Ubicación

`src/models/UserDTO.ts`

---

## 🧩 Propiedades

| Propiedad         | Tipo                                                        | Requerido | Descripción                                                        |
|-------------------|-------------------------------------------------------------|-----------|--------------------------------------------------------------------|
| `username`        | `string`                                                    | ✅ Sí      | Nombre de usuario único.                                           |
| `correo`          | `string`                                                    | ✅ Sí      | Correo electrónico del usuario.                                    |
| `password`        | `string`                                                    | ✅ Sí      | Contraseña cifrada.                                                |
| `nombreCompleto`  | `string`                                                    | ✅ Sí      | Nombre completo del usuario.                                       |
| `telefono`        | `string`                                                    | ✅ Sí      | Número telefónico del usuario.                                     |
| `direccion`       | `string`                                                    | ✅ Sí      | Dirección del usuario.                                             |
| `fotoPerfil`      | `string` *(opcional)*                                       | ❌ No      | URL de la imagen de perfil del usuario.                            |
| `tipoUsuario`     | `"INDIVIDUAL"` \| `"EMPRESARIAL"` *(opcional)*              | ❌ No      | Clasificación del usuario según su tipo.                           |
| `nombreEmpresa`   | `string` *(opcional)*                                       | ❌ No      | Nombre de la empresa (solo si el usuario es EMPRESARIAL).          |
| `nit`             | `string` *(opcional)*                                       | ❌ No      | Número de identificación tributaria (para usuarios EMPRESARIALES). |
| `rol`             | `"USUARIO"` \| `"EQUIPO"` \| `"ADMIN"` \| `"DESARROLLADOR"` | ✅ Sí      | Rol principal del usuario dentro del sistema.                      |
| `rolEquipo`       | `"LECTOR"` \| `"COMENTARISTA"` \| `"EDITOR"` *(opcional)*   | ❌ No      | Rol dentro del equipo empresarial (solo si `rol` es `"EQUIPO"`).   |
| `estado`          | `"activo"` \| `"inactivo"` *(opcional)*                     | ❌ No      | Estado del usuario en el sistema.                                  |
| `empresaId`       | `number` *(opcional)*                                       | ❌ No      | Identificador de la empresa asociada (si aplica).                  |
| `perfilCompleto`  | `boolean` *(opcional)*                                      | ❌ No      | Indica si el perfil del usuario ha sido completamente llenado.     |

---

### 🧠 Observaciones

* Los campos `nombreEmpresa`, `nit`, `empresaId` y `rolEquipo` solo aplican cuando el `tipoUsuario` es `"EMPRESARIAL"` y el `rol` es `"EQUIPO"`.
* El campo `fotoPerfil` es opcional, útil para personalización visual en el sistema.
* El `estado` puede usarse para deshabilitar usuarios sin eliminarlos.
* El `rol` define el nivel de acceso al sistema, y debe ser gestionado cuidadosamente.
* `perfilCompleto` puede servir para habilitar o restringir funcionalidades según el avance del usuario en el registro.

---

## 🔐 ChangePasswordDTO

Clase utilizada para la operación de **cambio de contraseña**.

---

### 🧩 Estructura

```ts
export class ChangePasswordDTO {
  id!: number;
  currentPassword!: string;
  newPassword!: string;
}
````

### ✅ Validaciones

Utiliza decoradores de la librería `class-validator` para garantizar la integridad de los datos recibidos en el cambio de contraseña:

| Propiedad         | Tipo     | Validación                     | Descripción                            |
| ----------------- | -------- | ------------------------------ | -------------------------------------- |
| `id`              | `number` | `@IsInt()`                     | ID del usuario que solicita el cambio. |
| `currentPassword` | `string` | `@IsString()`, `@MinLength(6)` | Contraseña actual del usuario.         |
| `newPassword`     | `string` | `@IsString()`, `@MinLength(6)` | Nueva contraseña a establecer.         |

---

### 🧠 Notas adicionales

* El campo `id` se castea explícitamente a número usando `class-transformer` (`@Type(() => Number)`).
* Esta clase se usa típicamente en controladores para recibir payloads seguros al cambiar la contraseña.

---