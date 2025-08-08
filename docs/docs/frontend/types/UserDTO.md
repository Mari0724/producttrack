---
id: UserDTO
title: DTO de Usuario
sidebar_label: Usuario DTO
---

Interfaz utilizada para representar la estructura de los datos de un **usuario del sistema ProductTrack**, incluyendo tanto usuarios individuales como empresariales y miembros de equipos.

---

## 🔍 Ubicación

`src/types/UserDTO.ts`

---

## 🧩 Propiedades

| Propiedad        | Tipo                                                                 | Requerido | Descripción                                                                                                        |
| ---------------- | -------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------ |
| `idUsuario`      | `number`                                                             | ✅ Sí      | Identificador único del usuario en la base de datos.                                                               |
| `username`       | `string`                                                             | ✅ Sí      | Nombre de usuario único para el acceso al sistema.                                                                 |
| `correo`         | `string`                                                             | ✅ Sí      | Correo electrónico de contacto del usuario.                                                                        |
| `nombreCompleto` | `string`                                                             | ✅ Sí      | Nombre completo del usuario.                                                                                       |
| `telefono`       | `string` *(opcional)*                                                | ❌ No      | Número telefónico de contacto.                                                                                     |
| `direccion`      | `string` *(opcional)*                                                | ❌ No      | Dirección física del usuario.                                                                                      |
| `nombreEmpresa`  | `string` *(opcional)*                                                | ❌ No      | Nombre de la empresa si el usuario es de tipo empresarial.                                                         |
| `nit`            | `string` *(opcional)*                                                | ❌ No      | Número de Identificación Tributaria, aplicable para usuarios empresariales.                                        |
| `estado`         | `string`                                                             | ✅ Sí      | Estado actual del usuario en el sistema (por ejemplo, `"activo"`, `"inactivo"`).                                   |
| `rol`            | `"USUARIO" \| "EQUIPO" \| "ADMIN" \| "DESARROLLADOR"`                | ✅ Sí      | Rol principal del usuario en el sistema.                                                                           |
| `tipoUsuario`    | `"INDIVIDUAL" \| "EMPRESARIAL"` *(opcional)*                         | ❌ No      | Tipo de usuario según su naturaleza (individual o empresarial).                                                    |
| `rolEquipo`      | `"LECTOR" \| "COMENTARISTA" \| "EDITOR"` *(opcional)*                 | ❌ No      | Rol asignado dentro de un equipo, aplicable solo si el usuario pertenece a uno.                                    |
| `perfilCompleto` | `boolean` *(opcional)*                                               | ❌ No      | Indica si el usuario ha completado toda la información de su perfil.                                                |
| `empresaId`      | `number` *(opcional)*                                                | ❌ No      | Identificador de la empresa asociada, si aplica.                                                                    |
| `fotoPerfil`     | `string` *(opcional)*                                                | ❌ No      | URL de la imagen de perfil del usuario.                                                                            |

---

## 🛠️ Usos comunes

- Representar los datos del usuario en el frontend y backend.
- Facilitar la validación de datos en formularios.
- Compartir información de usuario en componentes de interfaz como perfiles, listas o reportes.
- Base para generación de documentación Swagger o contratos API.

---
