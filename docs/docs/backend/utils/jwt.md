---
id: jwt
title: jwt
sidebar_label: Autentificacion jwt
---

# Autenticación JWT

Este módulo define la función `expressAuthentication`, que permite validar tokens JWT en las solicitudes HTTP de Express. Es utilizado principalmente por `tsoa` para proteger rutas con autenticación. Extrae el token desde la cabecera `Authorization`, lo verifica con la clave secreta y devuelve el payload decodificado si es válido.

---

## 🔍 Ubicación

`src/utils/jwt.ts`

---


## 🔐 Función: `expressAuthentication`

```ts
export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any>
```

---

### ✅ Propósito:

Autentica una solicitud HTTP usando el token JWT incluido en la cabecera `Authorization`.

---

### 📥 Parámetros:

| Nombre         | Tipo        | Descripción                                                           |
| -------------- | ----------- | --------------------------------------------------------------------- |
| `request`      | `Request`   | Objeto de solicitud de Express.                                       |
| `securityName` | `string`    | Nombre del esquema de seguridad (usualmente `"jwt"` en `tsoa.json`).  |
| `scopes`       | `string[]?` | Lista opcional de permisos o roles requeridos para acceder a la ruta. |

---

### 📤 Retorno:

* Devuelve el contenido decodificado del token si es válido (ej. `id`, `rol`, `correo`, etc.).
* Si el token es inválido, faltante o expirado, lanza un error con un mensaje claro.

---

### 🔍 Comportamiento:

1. Verifica que la cabecera `Authorization` exista y comience con `Bearer `.
2. Extrae el token y lo valida con `jwt.verify` usando la clave `JWT_SECRET`.
3. Si es válido, el contenido del token se retorna y puede ser utilizado por la app (ej. se asigna a `request['user']`).
4. Si es inválido, lanza un error manejable.

---

### 🔐 Requisitos:

* Variable `JWT_SECRET` definida en `config/token.ts`.
* Token JWT firmado correctamente con el mismo secreto.

---

### 🧠 Ejemplo de uso con TSOA:

```ts
@Security("jwt")
@Get("/usuarios/perfil")
public async obtenerPerfil(@Request() req: Express.Request) {
  const usuario = req['user']; // ← contiene datos del token
  return this.usuarioService.obtenerPorId(usuario.id);
}
```

---

## 📦 Dependencias:

* [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken): para verificar el token.
* [`express`](https://expressjs.com/): para manejar el objeto de solicitud.
* Clave secreta (`JWT_SECRET`) importada desde configuración.
