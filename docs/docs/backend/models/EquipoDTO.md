---
id: EquipoDTO
title: DTO de Equipo
sidebar_label: Equipo DTO
---

# EquipoDTO

Interfaz utilizada para representar la estructura de los datos de un **miembro del equipo de trabajo** en el sistema ProductTrack.

---

## 🔍 Ubicación

`src/models/EquipoDTO.ts`

---

## 🧩 Propiedades

| Propiedad        | Tipo                                     | Requerido | Descripción                                                                                                  |
| ---------------- | ---------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------ |
| `username`       | `string`                                 | ✅ Sí      | Nombre de usuario único para el miembro del equipo.                                                          |
| `correo`         | `string`                                 | ✅ Sí      | Correo electrónico de contacto del miembro.                                                                  |
| `password`       | `string`                                 | ✅ Sí      | Contraseña encriptada para acceso al sistema.                                                                |
| `nombreCompleto` | `string`                                 | ✅ Sí      | Nombre completo del miembro del equipo.                                                                      |
| `telefono`       | `string`                                 | ✅ Sí      | Número telefónico de contacto.                                                                               |
| `direccion`      | `string`                                 | ✅ Sí      | Dirección de residencia o contacto.                                                                          |
| `fotoPerfil`     | `string` *(opcional)*                    | ❌ No      | URL de la imagen de perfil (subida opcionalmente por la empresa).                                            |
| `rolEquipo`      | `"LECTOR" \| "COMENTARISTA" \| "EDITOR"` | ✅ Sí      | Rol asignado al miembro del equipo, define permisos en el sistema.                                           |
| `estado`         | `"activo" \| "inactivo"` *(opcional)*    | ❌ No      | Estado actual del miembro dentro del sistema. Si no se especifica, puede asumirse como "activo" por defecto. |
| `empresaId`      | `number` *(opcional)*                    | ❌ No      | ID de la empresa a la que pertenece el equipo. Solo requerido si quien crea el equipo es un administrador.   |

---

### 🛠️ Usos comunes

* Al registrar o invitar un nuevo miembro al equipo de una empresa.
* Para validar datos desde formularios antes de enviarlos al backend.
* Como referencia en validaciones, documentación Swagger, o DTOs compartidos entre frontend y backend.

---
