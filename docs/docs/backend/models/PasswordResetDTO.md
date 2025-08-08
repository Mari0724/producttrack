---
id: passwordresetdto
title: Interfaces de Restablecimiento de Contraseña
sidebar_label: PasswordReset DTO
---

Este archivo define las interfaces utilizadas en el proceso de restablecimiento de contraseña dentro del sistema. Incluye tanto la solicitud inicial de restablecimiento por correo, como la confirmación con el token de verificación y la nueva contraseña.

---

## 🔍  Ubicación

`src/models/PaawordRestDTO.ts`

---

## 📦 Interfaces

### `SolicitudResetDTO`

Representa los datos requeridos para iniciar una solicitud de restablecimiento de contraseña.

| Campo   | Tipo    | Descripción                                      |
|---------|---------|--------------------------------------------------|
| correo  | string  | Correo electrónico asociado a la cuenta.         |

---

### `ConfirmacionResetDTO`

Contiene la información necesaria para confirmar un restablecimiento de contraseña.

| Campo           | Tipo    | Descripción                                              |
|------------------|---------|----------------------------------------------------------|
| token            | string  | Token de verificación enviado al correo del usuario.     |
| nuevaContrasena  | string  | Nueva contraseña que el usuario desea establecer.        |

---

## 🔐 Uso en el sistema

Estas interfaces son fundamentales para:

- Validar que el correo esté registrado antes de enviar un token.
- Confirmar que el token recibido sea válido antes de permitir cambiar la contraseña.
- Garantizar la integridad y seguridad del proceso de recuperación.

---
