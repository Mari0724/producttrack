---
id: log.service
title: Servicio Log
sidebar_label: Log Service
---

# Log Service

Este servicio gestiona el **inicio de sesión** de usuarios, validando sus credenciales y generando un token JWT seguro. También identifica si un usuario del rol `EQUIPO` debe completar su perfil.

---

## 🔍 Ubicación

`src/services/log.service.ts`

---

## 📦 Dependencias

* [`bcryptjs`](https://www.npmjs.com/package/bcryptjs): Para comparar contraseñas hasheadas.
* [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken): Para generar tokens JWT.
* `prisma`: Cliente para interactuar con la base de datos.
* Variables importadas desde `config/token`:

  * `JWT_SECRET`: Secreto para firmar el token.
  * `TOKEN_EXPIRES_IN`: Tiempo de expiración del token.

---

## 🧩 Clase: `LogService`

### 🔐 `async login(correo: string, password: string)`

Realiza el proceso de autenticación con los siguientes pasos:

1. **Buscar el usuario** en la base de datos por correo electrónico.
2. **Verificar que el usuario exista**.
3. **Comparar contraseñas** (la ingresada con la hasheada en BD).
4. **Generar token JWT** con campos clave del usuario:

   * `id`
   * `rol`
   * `tipoUsuario` (opcional)
   * `rolEquipo` (opcional)
5. **Verificar perfil incompleto** si el usuario tiene rol `"EQUIPO"`:

   * Se considera incompleto si le falta `telefono` o `direccion`.

#### Parámetros:

* `correo`: Email del usuario.
* `password`: Contraseña en texto plano.

#### Retorna:

```ts
{
  user,                    // Objeto del usuario autenticado
  token,                   // Token JWT válido por el tiempo definido
  requiereCompletarPerfil // true | false según los datos del usuario
}
```

#### Lanza:

* `Error("Usuario no encontrado")` si el correo no está en BD.
* `Error("Contraseña incorrecta")` si la contraseña no coincide.

---

## 🧪 Función auxiliar: `validarCredenciales`

```ts
export const validarCredenciales = async (email: string, password: string)
```

Esta función es una forma directa de invocar el servicio `login`, útil para controladores.

#### Parámetros:

* `email`: Correo electrónico del usuario.
* `password`: Contraseña en texto plano.

#### Retorna:

* El mismo objeto que `login()`.

---

## ✅ Ejemplo de uso

```ts
const { user, token, requiereCompletarPerfil } = await validarCredenciales("correo@ejemplo.com", "secreta123");

if (requiereCompletarPerfil) {
  console.log("El perfil debe ser completado.");
}
```

---

## 🔐 Seguridad

* No se expone nunca la contraseña en las respuestas.
* El token solo contiene datos necesarios para la sesión del usuario.
* El rol y tipo de usuario pueden ser utilizados para control de acceso.

