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

## 🧩 Esquema base (`equipoSchema`)

| Campo            | Tipo/Zod                                     | Obligatorio | Validaciones y Reglas                                                                 |
| ---------------- | -------------------------------------------- | ----------- | ------------------------------------------------------------------------------------- |
| `username`       | `string().min(3)`                            | ✅ Sí        | Mínimo 3 caracteres.                                                                  |
| `correo`         | `string().email()`                           | ✅ Sí        | Debe ser un correo electrónico válido.                                                |
| `password`       | `string().min(6)`                            | ✅ Sí        | Mínimo 6 caracteres.                                                                  |
| `nombreCompleto` | `string().min(3)`                            | ✅ Sí        | Mínimo 3 caracteres.                                                                  |
| `telefono`       | `string().min(7).max(15)`                    | ✅ Sí        | Longitud entre 7 y 15 caracteres.                                                     |
| `direccion`      | `string().min(5)`                            | ✅ Sí        | Mínimo 5 caracteres.                                                                  |
| `fotoPerfil`     | `string().url()` *(opcional)*                | ❌ No        | Debe ser una URL válida si se proporciona.                                            |
| `rolEquipo`      | `enum(["LECTOR", "COMENTARISTA", "EDITOR"])` | ✅ Sí        | Determina el tipo de permiso dentro del equipo.                                       |
| `estado`         | `enum(["activo", "inactivo"])`               | ❌ No        | Valor por defecto: `"activo"`.                                                        |
| `empresaId`      | `number()` *(opcional)*                      | ❌ No        | Solo debe enviarse si el usuario que crea al miembro del equipo es un administrador. |

---

## 🧪 Tipo inferido

```ts
export type EquipoModel = z.infer<typeof equipoSchema>;


Este tipo se genera automáticamente a partir del esquema de Zod, lo que permite usarlo como una fuente confiable de tipo en TypeScript, garantizando que los datos ya han sido validados correctamente.

