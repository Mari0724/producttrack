---
id: UserModel
title: Validaciones de User
sidebar_label: User Model
---

# UserModel

Define el **esquema de validación** para el modelo de usuario (`userSchema`) utilizando `Zod`, con múltiples reglas que garantizan integridad, formato correcto y lógica condicional según el tipo y rol del usuario.

---

## 🔍 Ubicación

`src/models/EquipoDTO.ts`

---

## 🧩 Esquema base (`userSchema`)

| Campo            | Tipo/Zod                                                  | Obligatorio   | Validaciones y Reglas                                                                              |
| ---------------- | --------------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------- |
| `username`       | `string()`                                                | ✅ Sí          | Mínimo 3 caracteres, sin espacios extremos.                                                        |
| `correo`         | `string().email()`                                        | ✅ Sí          | Debe ser un correo válido.                                                                         |
| `password`       | `string()`                                                | ✅ Sí          | Mínimo 8 caracteres, debe incluir: una mayúscula, una minúscula, un número y un carácter especial. |
| `nombreCompleto` | `string()`                                                | ✅ Sí          | Mínimo 3 caracteres.                                                                               |
| `telefono`       | `string().regex()`                                        | ✅ Sí          | Formato internacional y nacional aceptado.                                                         |
| `direccion`      | `string()`                                                | ✅ Sí          | Mínimo 5 caracteres.                                                                               |
| `fotoPerfil`     | `string().url()` *(opcional)*                             | ❌ No          | Debe ser una URL válida.                                                                           |
| `nombreEmpresa`  | `string()` *(opcional)*                                   | ❌ Condicional | Requerido si `tipoUsuario` es `"EMPRESARIAL"`.                                                     |
| `nit`            | `string().regex()` *(opcional)*                           | ❌ Condicional | Entre 9 y 15 dígitos. Obligatorio para tipo `"EMPRESARIAL"`.                                       |
| `estado`         | `enum(["activo", "inactivo"])`                            | ❌ No          | Por defecto `"activo"`.                                                                            |
| `rol`            | `enum(["USUARIO", "EQUIPO", "ADMIN", "DESARROLLADOR"])`   | ✅ Sí          | Define el tipo de rol principal del usuario.                                                       |
| `rolEquipo`      | `enum(["LECTOR", "COMENTARISTA", "EDITOR"])` *(opcional)* | ❌ No          | Aplica si `rol` es `"EQUIPO"`.                                                                     |
| `tipoUsuario`    | `enum(["INDIVIDUAL", "EMPRESARIAL"])` *(opcional)*        | ❌ Condicional | Requerido si `rol` es `"USUARIO"`.                                                                 |
| `empresaId`      | `number().int().positive()` *(opcional)*                  | ❌ Condicional | Requerido si `rol` es `"EQUIPO"`.                                                                  |
| `perfilCompleto` | `boolean()` *(opcional)*                                  | ❌ No          | Indica si el perfil ha sido completado por el usuario.                                             |

---

## ✅ Validaciones adicionales (`.refine()`)

1. **`tipoUsuario` obligatorio si el rol es `USUARIO`**

   * 🔒 Si `rol` es `"USUARIO"`, entonces `tipoUsuario` es obligatorio.
   * 🧠 Mensaje: *"El tipo de usuario es obligatorio si el rol es USUARIO."*

2. **`nombreEmpresa` y `nit` requeridos para `EMPRESARIAL`**

   * 🔒 Si `tipoUsuario` es `"EMPRESARIAL"`, debe incluir ambos campos.
   * 🧠 Mensaje: *"El nombre de la empresa y el NIT son obligatorios para los usuarios empresariales."*

3. **`empresaId` requerido para `EQUIPO`**

   * 🔒 Si `rol` es `"EQUIPO"`, debe incluir `empresaId` numérico positivo.
   * 🧠 Mensaje: *"El campo 'empresaId' es obligatorio para usuarios con rol EQUIPO."*

4. **Restricción para `INDIVIDUAL`: no debe tener `nombreEmpresa` ni `nit`**

   * 🔒 Si `tipoUsuario` es `"INDIVIDUAL"`, entonces **NO** debe incluir `nombreEmpresa` ni `nit`.
   * 🧠 Mensaje: *"Los usuarios individuales no deben tener nombre de empresa ni NIT."*

---

## 🧪 Tipo inferido

```ts
export type ValidatedUser = z.infer<typeof userSchema>;
```

---