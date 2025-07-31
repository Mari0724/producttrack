---
id: log.controller
title: Controlador del Login
sidebar_label: Login
---

# Controlador de Autenticación

Este controlador gestiona el proceso de autenticación de usuarios. Actualmente, expone la ruta `POST /auth/login`, la cual permite iniciar sesión y obtener un token JWT junto con información del usuario.

---

## 🔍 Ubicación

`src/controllers/log.controller.ts`

## 📌 Ruta: `POST /auth/login`

Autentica a un usuario a partir de sus credenciales. Si las credenciales son válidas, devuelve un token de acceso junto con la información relevante del usuario.

### 🧾 Request Body

El cuerpo de la solicitud debe contener los siguientes campos:

| Campo    | Tipo   | Descripción                     |
|----------|--------|---------------------------------------|
| correo   | string | Correo electrónico del usuario. |
| password | string | Contraseña del usuario.         |

```json
{
  "correo": "usuario@ejemplo.com",
  "password": "123456"
}
```

---

### ✅ Respuesta

Si la autenticación es exitosa, se devuelve un objeto con el token de acceso y los datos del usuario:

| Campo                   | Tipo    | Descripción                                                |
|-------------------------|---------|------------------------------------------------------------|
| token                   | string  | Token JWT válido para autenticación.                       |
| username                | string  | Nombre de usuario.                                         |
| rol                     | string  | Rol principal del usuario (por ejemplo, admin, lector).    |
| tipoUsuario             | string  | Tipo de cuenta: individual, empresarial, equipo.           |
| rolEquipo               | string  | Rol dentro del equipo (si aplica).                         |
| requiereCompletarPerfil| boolean | Indica si el usuario debe completar información adicional. |

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "username": "ximena_dev",
  "rol": "admin",
  "tipoUsuario": "empresarial",
  "rolEquipo": "editor",
  "requiereCompletarPerfil": false
}
```

---

## 🛠️ Notas técnicas

- El método `validarCredenciales` es el encargado de validar el correo y la contraseña.
- Este controlador hace uso de las decoraciones de `tsoa` para generar la documentación Swagger automáticamente (`@Post`, `@Route`, `@Body`, etc.).
- El token JWT devuelto puede utilizarse en futuras solicitudes protegidas para autorizar el acceso.
