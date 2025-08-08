---
id: jwt
title: Autenticación JWT
sidebar_label: Autentificación JWT
---

Este módulo define la función `expressAuthentication`, utilizada principalmente por `tsoa` para proteger rutas con autenticación.  
Se encarga de validar tokens JWT presentes en la cabecera `Authorization` de las solicitudes HTTP, verificarlos con la clave secreta y devolver el payload decodificado si es válido.

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
````

---

### ✅ Propósito

Autenticar una solicitud HTTP validando el token JWT incluido en la cabecera `Authorization`.

---

### 📥 Parámetros

| Nombre         | Tipo        | Descripción                                                           |
| -------------- | ----------- | --------------------------------------------------------------------- |
| `request`      | `Request`   | Objeto de solicitud de Express.                                       |
| `securityName` | `string`    | Nombre del esquema de seguridad (usualmente `"jwt"` en `tsoa.json`).  |
| `scopes`       | `string[]?` | Lista opcional de permisos o roles requeridos para acceder a la ruta. |

---

### 📤 Retorno

* Devuelve el contenido decodificado del token si es válido (por ejemplo: `id`, `rol`, `correo`, etc.).
* Si el token es inválido, faltante o expirado, **lanza un error** con uno de los siguientes mensajes exactos:

  * `"Token no proporcionado o formato incorrecto"`
  * `"Token inválido o expirado"`

---

### 🔍 Comportamiento

1. Verifica que la cabecera `Authorization` exista y comience con `Bearer `.
2. Extrae el token y lo valida con `jwt.verify` usando la clave `JWT_SECRET`.
3. Si el token es válido, retorna el contenido decodificado.

   > Nota: Esta función **no** asigna el payload a `request['user']` directamente; esa asignación la realiza `tsoa` o el middleware que use este método.
4. Si el token es inválido o ha expirado, lanza un error con uno de los mensajes indicados en la sección anterior.

---

### 🔐 Requisitos

* Variable `JWT_SECRET` exportada desde `config/token.ts`, normalmente cargada desde variables de entorno.
* Token JWT firmado correctamente con el mismo secreto.

---

### 🧠 Ejemplo de uso con TSOA

```ts
@Security("jwt")
@Get("/usuarios/perfil")
public async obtenerPerfil(@Request() req: Express.Request) {
  const usuario = req['user']; // ← asignado por tsoa a partir del payload retornado
  return this.usuarioService.obtenerPorId(usuario.id);
}
```

---

## 📦 Dependencias

* [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken) – para verificar el token.
* [`express`](https://expressjs.com/) – para manejar el objeto de solicitud.
* Clave secreta (`JWT_SECRET`) definida en `config/token.ts` y proveniente de variables de entorno.

---
