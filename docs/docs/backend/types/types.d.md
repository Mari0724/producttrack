---
id: express-d
title: Express.d
sidebar_label: Express.d
---

# 📄 express.d.ts

Este archivo extiende el tipo `Request` de Express para incluir información del usuario autenticado.  
Es especialmente útil para middleware de autenticación o rutas protegidas donde necesitas acceder al usuario desde `req.user`.

---

## 🔍 Ubicación

`src/types/express.d.ts`

---

## 🧠 ¿Por qué usarlo?

En TypeScript, la interfaz `Request` de Express no incluye por defecto una propiedad `user`.  
Sin esta extensión, acceder a `req.user` generaría un error de tipo. Este archivo soluciona eso.

---

## 📦 Importaciones

```ts
import { Request } from "express";
```


* Se importa la interfaz Request base de Express.

---

## 🧱 Interfaz personalizada

```ts
export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    rol: string;
    // puedes agregar más campos si los necesitas
  };
}
```

### 🔐 Campos incluidos

| Campo  | Tipo     | Descripción                                           |
| ------ | -------- | ----------------------------------------------------- |
| id   | number   | Identificador único del usuario autenticado.          |
| rol  | string   | Rol del usuario (por ejemplo: "ADMIN", "EQUIPO").     |
| user | opcional | Es opcional para evitar errores cuando no hay sesión. |

---

## 🧰 Uso típico

Esta interfaz se utiliza en middlewares o controladores así:

```ts
import { AuthenticatedRequest } from "../types/express";

const rutaProtegida = (req: AuthenticatedRequest, res: Response) => {
  const usuario = req.user;
  if (!usuario) return res.status(401).send("No autorizado");

  res.send(`Hola usuario con ID ${usuario.id}`);
};
```

---

## ✅ Ventajas

* Mejora la *seguridad de tipos* (type safety).
* Evita errores al acceder a propiedades de req.user.
* Facilita el trabajo en entornos con autenticación JWT u OAuth.