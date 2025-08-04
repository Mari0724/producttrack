---
id: nutriscan.controller
title: Controlador NutriScan
sidebar_label: NutriScanController
---

# NutriScanController

Este controlador gestiona las operaciones CRUD para el módulo **NutriScan**, que permite generar y administrar análisis nutricionales basados en texto, usando inteligencia artificial y OCR. Las acciones están protegidas por autenticación JWT y controladas según el rol del usuario.

---

## 🔍 Ubicación

`src/controller/nutriscan.controller.ts`

---

## 🔒 Seguridad

Todas las rutas están protegidas mediante `@Security("jwt")`. El acceso a cada operación está determinado por el `tipoUsuario` o `rol` autenticado.

| Tipo de Usuario / Rol     | Acciones Permitidas                                         |
|---------------------------|--------------------------------------------------------------|
| `INDIVIDUAL`              | Crear análisis                                              |
| `ADMIN`                   | Ver, crear, actualizar y eliminar cualquier análisis        |
| `DESARROLLADOR`           | Crear análisis de prueba y ver únicamente los suyos         |

---

## 📦 Dependencias clave

- `NutriScanService`: Contiene la lógica de negocio para crear, consultar, actualizar y eliminar análisis.
- `NutriScanSchemaWithoutUserId`: Esquema de validación (`zod`) para crear nuevos registros.
- `NutriScanUpdateSchema`: Esquema de validación para actualizar registros existentes.

---

## 📘 Endpoints

### 📝 `POST /nutriscan`

Crea un nuevo análisis nutricional.  
**Disponible para:** `INDIVIDUAL`, `ADMIN`, `DESARROLLADOR`

#### Validaciones:

- Se valida el cuerpo usando `NutriScanSchemaWithoutUserId`.
- Si el rol es `DESARROLLADOR`, se marca como análisis de prueba (`isTest = true`).

#### Respuestas:

- `201 Created`: Registro creado con éxito.
- `400 Bad Request`: Datos inválidos.
- `403 Forbidden`: El usuario no tiene permiso para usar NutriScan.

---

### 📄 `GET /nutriscan`

Devuelve todos los análisis accesibles según el rol del usuario autenticado.

| Rol             | Acceso                                                              |
|------------------|---------------------------------------------------------------------|
| `ADMIN`          | Ver todos los registros (auditoría).                                |
| `DESARROLLADOR`  | Ver solo los registros de prueba creados por sí mismo.              |
| Otros            | ❌ Acceso denegado.                                                  |

#### Respuestas:

- `200 OK`: Lista de registros.
- `403 Forbidden`: Acceso denegado.

---

### 👤 `GET /nutriscan/usuario/{usuarioId}`

Devuelve los análisis asociados a un usuario específico.  
**Disponible solo para:** `ADMIN`

#### Parámetros:

- `usuarioId`: ID del usuario del cual se quieren consultar los análisis.

#### Respuestas:

- `200 OK`: Lista de análisis del usuario.
- `403 Forbidden`: Acceso denegado.

---

### ✏️ `PUT /nutriscan/{id}`

Actualiza parcialmente un análisis existente.  
**Disponible solo para:** `ADMIN`

#### Parámetros:

- `id`: ID del análisis a modificar.
- `body`: Cuerpo con los campos a actualizar (validado con `NutriScanUpdateSchema`).

#### Respuestas:

- `200 OK`: Registro actualizado correctamente.
- `400 Bad Request`: Validación fallida o cuerpo inválido.
- `403 Forbidden`: Acceso denegado.

---

### 🗑️ `DELETE /nutriscan/{id}`

Elimina un análisis por su ID.  
**Disponible solo para:** `ADMIN`

#### Parámetros:

- `id`: ID del análisis a eliminar.

#### Respuestas:

- `200 OK`: Eliminación exitosa.
- `403 Forbidden`: Acceso denegado.

---

## 🧪 Ejemplo de uso (POST)

```ts
// Crear análisis nutricional (tipo INDIVIDUAL)
fetch("/nutriscan", {
  method: "POST",
  headers: {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    consulta: "Arroz integral",
    esAlimento: true,
    respuesta: {},
    tipoAnalisis: "ocr-gpt-only"
  })
});
````

---

## 📦 Resumen de métodos

| Método   | Ruta                      | Descripción                      | Autorizado para        |
| -------- | ------------------------- | -------------------------------- | ---------------------- |
| `POST`   | `/nutriscan`              | Crear nuevo análisis             | INDIVIDUAL, ADMIN, DEV |
| `GET`    | `/nutriscan`              | Obtener análisis según el rol    | ADMIN, DESARROLLADOR   |
| `GET`    | `/nutriscan/usuario/{id}` | Consultar análisis de un usuario | ADMIN                  |
| `PUT`    | `/nutriscan/{id}`         | Actualizar un análisis           | ADMIN                  |
| `DELETE` | `/nutriscan/{id}`         | Eliminar un análisis             | ADMIN                  |
