---
id: EquipoModel
title: Validaciones de Equipo
sidebar_label: Equipo Model
---

# EquipoModel

Define el **esquema de validación** `equipoSchema` para los miembros del equipo dentro de una empresa. Utiliza `Zod` para validar los datos esenciales y garantizar la integridad de la información al momento del registro o actualización.

---

## 🔍 Ubicación

`src/models/EquipoModel.ts`

---

## 🧩 Esquema base (equipoSchema)

| Campo          | Tipo/Zod                                        | Obligatorio | Validaciones y Reglas                                                      |
| -------------- | ----------------------------------------------- | ----------- | -------------------------------------------------------------------------- |
| username       | string().min(3)                                 | ✅ Sí        | Nombre de usuario con mínimo 3 caracteres.                                 |
| correo         | string().email()                                | ✅ Sí        | Debe ser un correo electrónico válido.                                     |
| password       | string().min(6)                                 | ✅ Sí        | Contraseña con al menos 6 caracteres.                                      |
| nombreCompleto | string().min(3)                                 | ✅ Sí        | Nombre completo con mínimo 3 caracteres.                                   |
| telefono       | string().min(7).max(15)                         | ✅ Sí        | Longitud entre 7 y 15 caracteres.                                          |
| direccion      | string().min(5)                                 | ✅ Sí        | Mínimo 5 caracteres.                                                       |
| fotoPerfil     | string().url().optional()                       | ❌ No        | Debe ser una URL válida si se proporciona.                                 |
| rolEquipo      | enum(\["LECTOR", "COMENTARISTA", "EDITOR"])     | ✅ Sí        | Rol asignado dentro del equipo.                                            |
| estado         | enum(\["activo", "inactivo"]).default("activo") | ❌ No        | Si no se especifica, se asumirá "activo" por defecto.                      |
| empresaId      | number().optional()                             | ❌ No        | Solo requerido si quien crea el usuario es un administrador.               |
| perfilCompleto | boolean().optional()                            | ❌ No        | Lógica invertida: `false` indica que el perfil ya está completo, `true` si falta información. |

---

## 🧪 Tipo inferido

Este esquema permite inferir automáticamente el tipo EquipoModel:

```ts
export type EquipoModel = z.infer<typeof equipoSchema>;
```

Esto asegura que los datos validados con Zod tengan un tipado consistente en todo el proyecto.

---

## ✅ Usos comunes

* Validación de datos al registrar o actualizar miembros de equipo.
* Protección del backend ante datos malformateados.
* Generación automática de documentación con herramientas como Swagger (al combinar con DTOs o interfaces).
* Validaciones compartidas entre backend y frontend si se usa Zod en ambos contextos.

---
