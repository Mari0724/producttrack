---
id: token.service
title: Servicio Token
sidebar_label: Token Service
---

# Token Service

Este archivo proporciona funciones utilitarias para la **generación** y **verificación** de tokens JWT utilizados en el sistema de autenticación de usuarios.

---

## 🔍 Ubicación

`src/services/token.service.ts`

---

## 📦 Dependencias

* [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken): Para firmar y verificar JWTs.
* Variables de entorno: `JWT_SECRET` debe estar definida en el archivo `.env`.

---

## 🔐 Validación del Secreto

Antes de ejecutar cualquier función, el archivo verifica que la variable de entorno `JWT_SECRET` exista, lanzando un error si no está definida.

```ts
if (!process.env.JWT_SECRET) {
  throw new Error("Falta la variable JWT_SECRET en el archivo .env");
}
```

---

## 🧩 `interface TokenPayload`

Define el tipo de datos que puede contener un token generado:

```ts
interface TokenPayload {
  id: number;
  username: string;
  rol: string;
  tipoUsuario?: string;
  rolEquipo?: string;
}
```

---

## 🔑 `generarToken(payload: TokenPayload): string`

Genera un JWT firmado con una validez de 1 día (`1d`).

### Parámetros:

* `payload`: Objeto que incluye el ID, nombre de usuario, rol y, opcionalmente, `tipoUsuario` y `rolEquipo`.

### Comportamiento:

* Construye un objeto parcial del payload original.
* Solo incluye `rolEquipo` si el rol es `"EQUIPO"`.

### Retorno:

* Un token JWT firmado.

### Ejemplo:

```ts
const token = generarToken({
  id: 1,
  username: "empresa123",
  rol: "EQUIPO",
  tipoUsuario: "EMPRESARIAL",
  rolEquipo: "EDITOR"
});
```

---

## ✅ `verificarToken(token: string): TokenPayload`

Verifica un token JWT y devuelve el contenido decodificado.

### Parámetros:

* `token`: El JWT a verificar.

### Retorno:

* Un objeto `TokenPayload` con los datos originales.

### Lanza:

* Error si el token es inválido o ha expirado.

---

## 🧠 Observaciones

* Este servicio encapsula la lógica JWT para separar responsabilidades.
* El control sobre el contenido del token permite personalizar la información incluida según el rol del usuario.
* Su integración es ideal para middlewares y validaciones de seguridad en rutas protegidas.
