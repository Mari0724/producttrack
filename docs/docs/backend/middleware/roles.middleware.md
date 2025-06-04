roles.middleware.md
---
id: roles.middleware
title: Middleware de roles
sidebar_label: Roles 
---


#  Middleware: roles.middleware.ts

Este middleware permite restringir el acceso a rutas basándose en el *rol principal del usuario* (user.rol) y, opcionalmente, en su *rol dentro de un equipo* (user.rolEquipo). También permite verificar si el usuario pertenece al tipo EMPRESARIAL.

---

## 🔍 Ubicación

src/middleware/roles.middleware.ts



## 📌 Propósito

Limitar el acceso a ciertas rutas a:
- Usuarios con roles específicos (ej. ADMIN, EMPRESARIAL, EQUIPO, etc.)
- Usuarios de tipo empresarial, si se requiere
- Usuarios de equipo con roles específicos dentro del equipo (opcional)

---

## 📥 Importaciones

ts
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./token.middleware";
`

* AuthenticatedRequest es una extensión de Request que incluye la propiedad user, añadida previamente por el middleware de autenticación (token.middleware).

---

## 🧠 Firma del middleware

ts
permitirRolesYRolEquipo(
  rolesPermitidos: string[],
  rolesEquipoPermitidos?: string[],
  requiereTipoEmpresarial = false
)


### Parámetros

| Parámetro                 | Tipo        | Descripción                                                                                  |
| ------------------------- | ----------- | -------------------------------------------------------------------------------------------- |
| rolesPermitidos         | string[]  | Lista de roles principales autorizados para acceder a la ruta.                               |
| rolesEquipoPermitidos   | string[]? | (Opcional) Lista de roles válidos para usuarios del tipo EQUIPO.                           |
| requiereTipoEmpresarial | boolean   | (Opcional) Si se requiere que el usuario sea del tipo EMPRESARIAL. Por defecto es false. |

---

## ✅ Ejemplo de uso

ts
import { permitirRolesYRolEquipo } from "../middleware/roles.middleware";

// Solo ADMIN y EMPRESARIAL pueden acceder
router.post(
  "/crear-usuario",
  permitirRolesYRolEquipo(["ADMIN", "EMPRESARIAL"], ["editor", "admin"], true),
  controlador.crearUsuario
);


---

## ⚠ Respuestas de error posibles

| Código | Mensaje                                   | Situación                                                                   |
| ------ | ----------------------------------------- | --------------------------------------------------------------------------- |
| 403    | "Acceso no autorizado"                  | No hay información del usuario en la petición.                              |
| 403    | "Rol no permitido"                      | El user.rol no está en la lista de roles permitidos.                      |
| 403    | "Acceso denegado. Solo las empresas..." | El usuario no es del tipo EMPRESARIAL y se requiere.                      |
| 403    | "Rol de equipo no permitido"            | El user.rol es EQUIPO, pero no tiene el rol dentro del equipo adecuado. |

---

## 🧪 Flujo de ejecución

1. Se verifica que req.user exista.
2. Se valida si el rol principal (user.rol) está permitido.
3. Si se requiere, se valida que el tipoUsuario sea EMPRESARIAL.
4. Si el rol es EQUIPO, se valida que tenga un rolEquipo autorizado.
5. Si todo es válido, se ejecuta next() para continuar con la siguiente función en la ruta.

---

## 🧩 Dependencias

Este middleware depende del middleware de autenticación que añade req.user, generalmente implementado en:

ts
token.middleware.ts
