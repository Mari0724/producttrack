---
id: authenticatedRequest
title: Authenticated Request
sidebar_label: Authenticated Request
---

Este tipo extiende la interfaz `Request` de **Express** para incluir información del usuario autenticado en las peticiones HTTP.  
Es útil en controladores y middleware para acceder de forma tipada a los datos del usuario que ha iniciado sesión.

---

## 🔍 Ubicación

`src/types/authenticatedRequest.ts`

---

## 📌 Descripción general

1. **Extensión de `Request`**  
   Se crea una nueva interfaz `AuthenticatedRequest` que hereda de la interfaz estándar `Request` de Express.

2. **Propiedad `user` opcional**  
   - Es un objeto que representa al usuario autenticado.
   - Incluye:
     - `idUsuario` → Identificador numérico del usuario en la base de datos.
     - `rol` → Rol del usuario (por ejemplo: `ADMIN`, `EQUIPO`, `INDIVIDUAL`).
     - `[key: string]: any` → Permite incluir propiedades adicionales sin necesidad de modificar la interfaz.

3. **Uso típico**  
   Este tipo se emplea en controladores y middleware donde, después de la autenticación, se agrega un objeto `user` a la petición para que pueda ser consultado en el resto del flujo.

---

## 🔗 Uso

**Ejemplo en un middleware de autenticación:**

```ts
import { AuthenticatedRequest } from '../types/authenticatedRequest';

function ejemploMiddleware(req: AuthenticatedRequest, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'No autenticado' });
  }

  console.log(`Usuario autenticado: ${req.user.idUsuario}`);
  next();
}
````

---

## 🧩 Relación con otros módulos

* Se usa junto con middleware de autenticación que añade `req.user` tras validar un token o sesión.
* Aparece frecuentemente en controladores para acceder a la información del usuario logueado.

---

## ⚠️ Consideraciones

* La propiedad `user` es **opcional**, por lo que siempre debe verificarse antes de acceder a sus campos.
* Las propiedades adicionales permitidas mediante `[key: string]: any` facilitan la extensibilidad, pero deben usarse con cuidado para evitar inconsistencias.
* Es buena práctica definir el tipo de `rol` con un *union type* o un *enum* para restringir los valores válidos.

---