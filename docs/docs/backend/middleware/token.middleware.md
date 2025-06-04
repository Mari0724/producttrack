---
id: token.middleware
title: Middleware de token
sidebar_label: Token
---

# 🛡️ Middleware: token.middleware.ts

Este middleware se encarga de *verificar y autenticar el token JWT* enviado por el cliente en las cabeceras de la solicitud. Si el token es válido, extrae la información del usuario y la adjunta al objeto `req` para su uso en otros middlewares o controladores.

---

## 🔍 Ubicación

`src/middleware/token.middleware.ts`

---

## 📌 Propósito

Proteger rutas que requieren autenticación validando el token JWT. Si el token es válido, el usuario autenticado se añade al request (`req.user`).

---

## 📥 Importaciones

```ts
import { Request, Response, NextFunction } from "express";
import { verificarToken } from "../services/token.service";
```

* verificarToken: función importada desde token.service.ts que valida y decodifica el token JWT.

---

## 🧠 Tipado extendido

```ts
export interface AuthenticatedRequest extends Request {
  user?: any;
}
```

* Se extiende la interfaz Request de Express para incluir un campo user, donde se almacena la información del usuario extraída del token.

---

## 🚦 Middleware principal

```ts
export function autenticarToken(req: AuthenticatedRequest, res: Response, next: NextFunction)
```

### Descripción del flujo

1. Se extrae el token desde el encabezado Authorization, en formato Bearer [token].
2. Si no hay token, se responde con error 401.
3. Si hay token, se verifica mediante verificarToken(token).
4. Si el token es válido, la información del usuario se guarda en req.user.
5. Si el token es inválido o ha expirado, se responde con error 403.

---

## ✅ Ejemplo de uso

```ts
import { autenticarToken } from "../middleware/token.middleware";

router.get("/perfil", autenticarToken, perfilController.obtenerPerfil);
```

---

## 📤 Cabecera esperada

http
Authorization: Bearer [token JWT]


---

## ⚠ Respuestas de error posibles

| Código | Mensaje                       | Situación                            |
| ------ | ----------------------------- | ------------------------------------ |
| 401    | "Token no proporcionado"    | No se envió un token en la cabecera. |
| 403    | "Token inválido o expirado" | El token es inválido o ha expirado.  |

---

## 🧩 Dependencias

Este middleware depende de:

* token.service.ts → función verificarToken(token: string): any

---

## 🧪 Notas técnicas

* El campo req.user es utilizado por otros middlewares como roles.middleware.ts para controlar permisos.
* Este middleware debe colocarse antes de cualquier middleware o controlador que requiera información del usuario autenticado.

---

¿Deseas que documente también token.service.ts para completar esta sección?

```
```