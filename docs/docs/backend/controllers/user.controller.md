---
id: user.controller
title: AuthController
sidebar_label: Tabla users
---

# `controllers/user.controller.ts`

## 📄 Descripción

Este archivo contiene el controlador para la entidad `Usuario`. Se encarga de manejar las peticiones HTTP relacionadas con los usuarios, validarlas y delegar la lógica de negocio al servicio correspondiente.

---

## 🔍 Ubicación

`src/controllers/user.controller.ts`

## ✅ Responsabilidades

* Manejar las solicitudes entrantes relacionadas con usuarios.
* Validar entradas usando Zod (`userSchema`).
* Delegar operaciones al servicio de usuario (`user.service.ts`).
* Devolver respuestas adecuadas, incluyendo manejo de errores y códigos HTTP.

## ⚙️ Funciones principales

### `getAll()`

```ts
@Get("/")
public async getAll(...): Promise<any>
```

**Método HTTP:** `GET /usuarios`

**Descripción:** Retorna todos los usuarios que cumplan con los filtros enviados por query (username, correo, estado, tipo, etc.).

**Notas:**

* Permite múltiples filtros opcionales.
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

* Devuelve 404 si el usuario no existe.
* Valida que el ID sea un número válido antes de llamar al servicio.

---

### `create()`

```ts
@Post("/")
public async create(@Body() requestBody: UserDTO): Promise<ResponseMessageWithToken>
```

**Método HTTP:** `POST /usuarios`

**Descripción:** Crea un nuevo usuario a partir de los datos del cuerpo de la solicitud.

**Validaciones especiales:**

* Usa Zod (`userSchema`) para validar estructura y tipos de datos.
* Si el rol es `EQUIPO`, `empresaId` es obligatorio.
* Si el rol no es `EQUIPO`, `empresaId` no debe estar presente.

**Respuesta:**

* Devuelve un token JWT si el usuario es creado exitosamente.
* Devuelve mensajes descriptivos en caso de error.

---

### `updateUsuario(id: number, body: Partial<UserDTO>)`

```ts
@Put("{id}")
public async updateUsuario(...): Promise<ResponseMessage>
```

**Método HTTP:** `PUT /usuarios/{id}`

**Descripción:** Actualiza los datos de un usuario específico.

**Validaciones:**

* Si se quiere actualizar a un rol distinto de `EQUIPO`, no debe enviarse `empresaId`.

**Manejo de errores:**

* 404 si el usuario no existe.
* 500 si ocurre un error inesperado en el servidor.

---

### `deleteUsuario(id: number)`

```ts
@Delete("{id}")
public async deleteUsuario(@Path() id: number): Promise<ResponseMessage>
```

**Método HTTP:** `DELETE /usuarios/{id}`

**Descripción:** Elimina lógicamente (soft delete) un usuario por su ID.

**Respuesta:**

* 200 si se elimina correctamente.
* 404 si el usuario no existe.
* 500 si ocurre un error en el servidor.

---

## 🧠 Notas

* Se usa `TSOA` para definir rutas, tipos, documentación Swagger y validación.
* Todas las funciones llaman a servicios definidos en `user.service.ts`.
* Implementa separación de responsabilidades limpia entre controlador y servicio.
* Respuestas con mensajes estructurados (`ResponseMessage`, `ResponseMessageWithToken`).
