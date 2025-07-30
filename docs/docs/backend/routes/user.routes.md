---
id: user.routes
title: Rutas Imagenes Usuario
sidebar_label: User Routes
---

# user.routes.ts

Este archivo define las rutas relacionadas con la **gestión de usuarios** en la aplicación. Incluye operaciones para crear un nuevo usuario y actualizar su foto de perfil. Se utiliza `Express`, el middleware `upload` para manejo de archivos, validación con `Zod`, y funciones de servicio definidas en `user.service`.

---

## 🔍 Ubicación

`src/routes/user.routes.ts`

---


## 📌 Rutas definidas

---

### 📍 POST `/usuarios`

**Descripción:**
Registra un nuevo usuario en el sistema. Permite subir una foto de perfil como parte del formulario `multipart/form-data`.

**Middleware:**

* `upload.single("fotoPerfil")`: Maneja la carga del archivo de imagen.
* `zodValidate(userSchema, body)`: Valida los datos recibidos usando el esquema de `Zod`.

**Cuerpo de la petición (`req.body`):**
Debe cumplir con el esquema definido en `userSchema`.

**Respuesta exitosa (`201`):**

```json
{
  "message": "Usuario creado correctamente",
  "data": {
    // Usuario creado con todos sus datos
  }
}
```

**Errores posibles:**

* `400`: Datos inválidos según validación Zod.
* `500`: Error interno del servidor.

---

### 📍 PUT `/usuarios/:id/foto`

**Descripción:**
Actualiza la foto de perfil de un usuario existente mediante su `ID`.

**Parámetros de ruta:**

* `id` (number): ID del usuario.

**Middleware:**

* `upload.single("fotoPerfil")`: Maneja la carga de la imagen.

**Cuerpo esperado:**
Formulario `multipart/form-data` que incluya el archivo `fotoPerfil`.

**Respuesta exitosa (`200`):**

```json
{
  "message": "Foto de perfil actualizada",
  "url": "ruta/guardada/de/la/imagen"
}
```

**Errores posibles:**

* `400`: ID inválido o imagen no enviada.
* `500`: Error interno al intentar guardar o procesar la imagen.

---

## ⚙️ Dependencias utilizadas

* `express.Router`: Para definir las rutas.
* `upload`: Middleware personalizado para manejo de archivos.
* `zodValidate`: Función utilitaria para validación con Zod.
* `userSchema`: Esquema de validación para usuarios.
* `createUser`, `updateUser`: Funciones de servicio para interactuar con la base de datos.
