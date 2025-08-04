---
id: user.controller
title: UserController
sidebar_label: UserController
---

# UserController

Este archivo contiene el controlador para la entidad `Usuario`. Se encarga de manejar las peticiones HTTP relacionadas con los usuarios, incluyendo creación, consulta, actualización, eliminación, cambio de contraseña y reactivación. También maneja la obtención de datos empresariales asociados a usuarios con rol `EQUIPO`.

---

## 🔍 Ubicación

`src/controllers/user.controller.ts`

---

## ✅ Responsabilidades

- Manejar las solicitudes entrantes relacionadas con usuarios.
- Validar datos de entrada con Zod (`userSchema`) y validaciones personalizadas.
- Delegar operaciones al servicio de usuario (`user.service.ts`).
- Devolver respuestas apropiadas según el resultado de cada operación.
- Manejo de errores con códigos HTTP adecuados.
- Proteger rutas específicas con seguridad JWT (`@Security("jwt")`).

---

## ⚙️ Funciones principales

### `getAll()`

```ts
@Get("/")
public async getAll(...): Promise<any>
````

**Método HTTP:** `GET /usuarios`
**Descripción:** Retorna todos los usuarios que cumplan con los filtros enviados por query (`username`, `correo`, `estado`, `tipo`, `rol`, etc.).
**Notas:**

* Soporta múltiples filtros opcionales.
* No requiere autenticación.

---

### `getById(id: string)`

```ts
@Get("/{id}")
public async getById(id: string): Promise<any>
```

**Método HTTP:** `GET /usuarios/{id}`
**Descripción:** Retorna los datos del usuario con el ID especificado.
**Notas:**

* Valida que el ID sea un número positivo.
* Retorna 404 si el usuario no existe.

---

### `create()`

```ts
@Post("/")
public async create(@Body() requestBody: UserDTO): Promise<ResponseMessageWithToken>
```

**Método HTTP:** `POST /usuarios`
**Descripción:** Crea un nuevo usuario a partir de los datos enviados.
**Validaciones especiales:**

* Usa `zodValidate` con `userSchema`.
* Si el rol es `EQUIPO`, `empresaId` es obligatorio.
* Si no es `EQUIPO`, `empresaId` no debe enviarse.
  **Respuesta:**
* Devuelve un token JWT si la creación es exitosa.
* Devuelve mensajes detallados en caso de error.

---

### `getEmpresaByIdController(id: number)`

```ts
@Get("/empresa/{id}")
@Security("jwt")
public async getEmpresaByIdController(@Path() id: number): Promise<any>
```

**Método HTTP:** `GET /usuarios/empresa/{id}`
**Descripción:** Devuelve información de una empresa asociada al usuario con ID proporcionado.
**Notas:**

* Protegido con JWT.
* Retorna campos clave de la empresa (nombre, NIT, correo, dirección, etc.).
* Devuelve 404 si la empresa no es encontrada.

---

### `cambiarContrasena()`

```ts
@Put("/cambiarContrasena")
public async cambiarContrasena(@Body() body: ChangePasswordDTO): Promise<{ message: string }>
```

**Método HTTP:** `PUT /usuarios/cambiarContrasena`
**Descripción:** Cambia la contraseña de un usuario.
**Notas:**

* Requiere `id`, `currentPassword` y `newPassword`.
* Devuelve mensajes informando éxito o errores.

---

### `updateUsuario(id: number, body: Partial<UserDTO>)`

```ts
@Put("/{id}")
public async updateUsuario(@Path() id: number, @Body() body: Partial<UserDTO>): Promise<ResponseMessage>
```

**Método HTTP:** `PUT /usuarios/{id}`
**Descripción:** Actualiza los datos de un usuario.
**Validaciones:**

* Si el nuevo rol no es `EQUIPO`, no debe enviarse `empresaId`.
  **Manejo de errores:**
* 404 si el usuario no existe.
* 400 si hay conflictos de validación.
* 500 si ocurre un error interno.

---

### `reactivarUsuario(id: number)`

```ts
@Put("/{id}/reactivar")
public async reactivarUsuario(@Path() id: number): Promise<ResponseMessage>
```

**Método HTTP:** `PUT /usuarios/{id}/reactivar`
**Descripción:** Reactiva un usuario previamente eliminado o inactivo.
**Notas:**

* Devuelve 200 si fue exitoso.
* 400 si ya estaba activo.
* 404 si no fue encontrado.

---

### `deleteUsuario(id: number)`

```ts
@Delete("/{id}")
public async deleteUsuario(@Path() id: number): Promise<ResponseMessage>
```

**Método HTTP:** `DELETE /usuarios/{id}`
**Descripción:** Realiza una eliminación lógica (soft delete) del usuario.
**Respuesta:**

* 200 si la eliminación fue exitosa.
* 404 si el usuario no fue encontrado.
* 500 si hay errores del servidor.

---

## 🧠 Notas adicionales

* Usa `TSOA` para definir rutas, tipos, seguridad y documentación Swagger.
* Todas las funciones llaman a servicios definidos en `user.service.ts`.
* Manejo centralizado de errores y validaciones.
* Separa responsabilidades entre controlador y lógica de negocio.
* Provee respuestas estructuradas (`ResponseMessage`, `ResponseMessageWithToken`).
