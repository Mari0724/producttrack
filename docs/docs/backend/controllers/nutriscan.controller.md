---
id: nutriscan.controller
title: Controlador NutriScan
sidebar_label: NutriScan
---

# NutriScanController

Este controlador gestiona las rutas relacionadas con **NutriScan**, una funcionalidad que permite realizar análisis nutricionales a partir de imágenes o texto procesado. Controla el acceso según el rol del usuario (INDIVIDUAL, ADMIN o DESARROLLADOR) y delega la lógica de negocio al `NutriScanService`.

---

## 🔍 Ubicación

`src/controller/nutriscan.controller.ts`

---

## 📦 Dependencias

- `tsoa`: Decoradores para documentación y generación de rutas.
- `NutriScanService`: Lógica del negocio para crear, leer, actualizar y eliminar análisis.
- `NutriScanSchemaWithoutUserId`: Validación con `Zod` del cuerpo sin ID de usuario.

---

## 🔐 Seguridad

- Todas las rutas usan `@Security("jwt")` para requerir autenticación con token JWT.
- Se verifica el `rol` del usuario antes de permitir ejecutar acciones críticas.

---

## 🚀 Endpoints

### 📝 `POST /nutriscan`

Crea un nuevo análisis nutricional.  
Disponible solo para usuarios con tipo `INDIVIDUAL`, o roles `ADMIN` o `DESARROLLADOR`.

#### Parámetros:

- `body`: Objeto con los datos del análisis nutricional (validado por `Zod`).
- `req`: Objeto de solicitud para identificar al usuario autenticado.

#### Respuestas:

- `201 Created`: Registro exitoso.
- `400 Bad Request`: Datos inválidos.
- `403 Forbidden`: El usuario no tiene permisos para usar NutriScan.

---

### 📄 `GET /nutriscan`

Lista los análisis almacenados para auditoría o pruebas.  
Solo disponible para roles `ADMIN` y `DESARROLLADOR`.

#### Lógica:

- `ADMIN`: Obtiene todos los registros de prueba.
- `DESARROLLADOR`: Solo los registros que él mismo creó.

#### Respuestas:

- `200 OK`: Lista de análisis.
- `403 Forbidden`: Acceso no permitido.

---

### 🔍 `GET /nutriscan/{id}`

Busca un análisis por su ID.  
Solo accesible para usuarios con rol `ADMIN`.

#### Parámetros:

- `id`: ID del análisis.

#### Respuestas:

- `200 OK`: Registro encontrado.
- `403 Forbidden`: Acceso denegado.

---

### ✏️ `PUT /nutriscan/{id}`

Actualiza un análisis nutricional existente.  
Solo accesible para `ADMIN`.

#### Parámetros:

- `id`: ID del análisis.
- `body`: Datos a actualizar (no validados con Zod directamente aquí).

#### Respuestas:

- `200 OK`: Registro actualizado.
- `400 Bad Request`: Error al actualizar.
- `403 Forbidden`: Acceso denegado.

---

### 🗑️ `DELETE /nutriscan/{id}`

Elimina un análisis nutricional por ID.  
Solo accesible para `ADMIN`.

#### Parámetros:

- `id`: ID del análisis.

#### Respuestas:

- `200 OK`: Eliminación exitosa.
- `403 Forbidden`: Acceso denegado.

---

## 🧪 Ejemplo de uso

```ts
// Crear desde un usuario individual autenticado
await fetch("/nutriscan", {
  method: "POST",
  headers: {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    titulo: "Análisis de cereal",
    textoExtraido: "...",
    resultado: "...",
  })
});
