---
id: password-reset-model
title: Esquemas de Validación para Restablecimiento de Contraseña
sidebar_label: PasswordReset Model
---

Este módulo define los esquemas de validación necesarios para el proceso de restablecimiento de contraseña utilizando la librería `zod`. Se valida tanto la solicitud inicial de restablecimiento como la confirmación con un nuevo token y contraseña.

---

## 🔍 Ubicación

`src/model/PasswordResetModel.ts`

---

## 📦 Dependencias

```ts
import { z } from "zod";
````

---

## 📄 Esquemas definidos

### 🔐 `solicitudResetSchema`

Valida el correo electrónico ingresado por el usuario al solicitar el restablecimiento de contraseña.

```ts
export const solicitudResetSchema = z.object({
  correo: z.string().email({ message: "Correo electrónico no válido" }),
});
```

#### ✅ Reglas de validación

* `correo`: debe ser una cadena con formato válido de correo electrónico.

---

### 🔑 `confirmacionResetSchema`

Valida los datos proporcionados por el usuario para confirmar el restablecimiento de la contraseña.

```ts
export const confirmacionResetSchema = z.object({
  token: z.string().min(6, "Token inválido"),
  nuevaContrasena: z
    .string()
    .min(8, "Debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
    .regex(/[a-z]/, "Debe tener al menos una minúscula")
    .regex(/[0-9]/, "Debe tener al menos un número")
    .regex(/[^A-Za-z0-9]/, "Debe tener al menos un carácter especial"),
});
```

#### ✅ Reglas de validación

* `token`: cadena de al menos 6 caracteres.
* `nuevaContrasena`:

  * Mínimo 8 caracteres.
  * Al menos una letra mayúscula.
  * Al menos una letra minúscula.
  * Al menos un número.
  * Al menos un carácter especial.

---

## 🧪 Uso recomendado

Estos esquemas se utilizan para validar la entrada del usuario en los endpoints relacionados con el restablecimiento de contraseña, asegurando la seguridad y el cumplimiento de las políticas de la aplicación.

---
