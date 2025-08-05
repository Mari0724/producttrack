---
id: log.controller
title: Controlador de Autenticación
sidebar_label: Login
---

# LogController

Este controlador gestiona el proceso de **inicio de sesión** y **restablecimiento de contraseña** para los usuarios registrados. Forma parte del módulo de autenticación de la aplicación y expone tres endpoints principales:

- `POST /auth/login`: Iniciar sesión.
- `POST /auth/solicitar-reset`: Solicitar restablecimiento de contraseña.
- `POST /auth/confirmar-reset`: Confirmar nueva contraseña usando token.

---

## 🔍 Ubicación

`src/controllers/log.controller.ts`

---

## 📌 Endpoint: `POST /auth/login`

Autentica a un usuario a partir de sus credenciales. Si son válidas, devuelve un token JWT y los datos del usuario.

### 🧾 Request Body

```json
{
  "correo": "usuario@ejemplo.com",
  "password": "123456"
}
````

| Campo    | Tipo   | Descripción                     |
| -------- | ------ | ------------------------------- |
| correo   | string | Correo electrónico del usuario. |
| password | string | Contraseña del usuario.         |

---

### ✅ Respuesta exitosa

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "requiereCompletarPerfil": false,
  "user": {
    "idUsuario": 1,
    "username": "ximena_dev",
    "correo": "ximena@empresa.com",
    "rol": "admin",
    "tipoUsuario": "empresarial",
    "rolEquipo": "editor",
    "perfilCompleto": true,
    "empresaId": 101
  }
}
```

| Campo                   | Tipo    | Descripción                                           |
| ----------------------- | ------- | ----------------------------------------------------- |
| token                   | string  | Token JWT válido para autenticación.                  |
| requiereCompletarPerfil | boolean | Indica si falta información para completar el perfil. |
| user                    | object  | Información detallada del usuario autenticado.        |

---

## 🔑 Endpoint: `POST /auth/solicitar-reset`

Envía un correo con un token temporal para restablecer la contraseña.

### 🧾 Request Body

```json
{
  "correo": "usuario@ejemplo.com"
}
```

| Campo  | Tipo   | Descripción                    |
| ------ | ------ | ------------------------------ |
| correo | string | Correo del usuario registrado. |

### ✅ Respuesta

```json
{
  "mensaje": "Se ha enviado un enlace de restablecimiento a tu correo."
}
```

---

## 🔐 Endpoint: `POST /auth/confirmar-reset`

Confirma el cambio de contraseña utilizando el token enviado al correo.

### 🧾 Request Body

```json
{
  "token": "ABC123TOKEN",
  "nuevaContrasena": "nuevaSegura123"
}
```

| Campo           | Tipo   | Descripción                              |
| --------------- | ------ | ---------------------------------------- |
| token           | string | Token recibido por correo.               |
| nuevaContrasena | string | Nueva contraseña elegida por el usuario. |

### ✅ Respuesta

```json
{
  "mensaje": "La contraseña ha sido restablecida con éxito."
}
```

---

## 🛠️ Notas técnicas

* `validarCredenciales` se encarga de validar correo y contraseña.
* `LogService` implementa la lógica de recuperación y cambio de contraseña.
* Todas las rutas usan decoradores de `tsoa` (`@Post`, `@Body`, `@Route`, etc.) para generar documentación Swagger automáticamente.
* El token JWT debe ser enviado en futuras peticiones protegidas usando el header `Authorization: Bearer <token>`.
