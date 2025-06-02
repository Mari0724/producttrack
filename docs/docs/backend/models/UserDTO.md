---
id: UserDTO
title: DTO de User
sidebar_label: User DTO
---

# UserDTO

Interfaz que define la estructura estándar de un **usuario del sistema ProductTrack**, incluyendo tanto usuarios individuales como empresariales, desarrolladores y miembros del equipo de trabajo empresarial.

---

## 🔍 Ubicación

`src/models/UserDTO.ts`

---

## 🧩 Propiedades

| Propiedad        | Tipo                                                        | Requerido | Descripción                                                        |
| ---------------- | ----------------------------------------------------------- | --------- | ------------------------------------------------------------------ |
| `username`       | `string`                                                    | ✅ Sí      | Nombre de usuario único.                                           |
| `correo`         | `string`                                                    | ✅ Sí      | Correo electrónico del usuario.                                    |
| `password`       | `string`                                                    | ✅ Sí      | Contraseña cifrada.                                                |
| `nombreCompleto` | `string`                                                    | ✅ Sí      | Nombre completo del usuario.                                       |
| `telefono`       | `string`                                                    | ✅ Sí      | Número telefónico del usuario.                                     |
| `direccion`      | `string`                                                    | ✅ Sí      | Dirección del usuario.                                             |
| `fotoPerfil`     | `string` *(opcional)*                                       | ❌ No      | URL de la imagen de perfil del usuario.                            |
| `tipoUsuario`    | `"INDIVIDUAL"` \| `"EMPRESARIAL"` *(opcional)*              | ❌ No      | Clasificación del usuario según su tipo.                           |
| `nombreEmpresa`  | `string` *(opcional)*                                       | ❌ No      | Nombre de la empresa (solo si el usuario es EMPRESARIAL).          |
| `nit`            | `string` *(opcional)*                                       | ❌ No      | Número de identificación tributaria (para usuarios EMPRESARIALES). |
| `rol`            | `"USUARIO"` \| `"EQUIPO"` \| `"ADMIN"` \| `"DESARROLLADOR"` | ✅ Sí      | Rol principal del usuario dentro del sistema.                      |
| `rolEquipo`      | `"LECTOR"` \| `"COMENTARISTA"` \| `"EDITOR"` *(opcional)*   | ❌ No      | Rol dentro del equipo empresarial (solo si `rol` es `"EQUIPO"`).   |
| `estado`         | `"activo"` \| `"inactivo"` *(opcional)*                     | ❌ No      | Estado del usuario en el sistema.                                  |
| `empresaId`      | `number` *(opcional)*                                       | ❌ No      | Identificador de la empresa asociada (si aplica).                  |

---

### 🧠 Observaciones

* Los campos `nombreEmpresa`, `nit`, `empresaId` y `rolEquipo` solo aplican cuando el `tipoUsuario` es `"EMPRESARIAL"` y el `rol` es `"EQUIPO"`.
* El campo `fotoPerfil` es opcional, útil para personalización visual en el sistema.
* El `estado` puede usarse para deshabilitar usuarios sin eliminarlos.
* El `rol` define el nivel de acceso al sistema, y debe ser gestionado cuidadosamente.

