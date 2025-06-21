---
id: nutriscan.controller
title: Controlador NutriScan
sidebar_label: NutriScan
---

# NutriScanController

Este controlador maneja las operaciones CRUD del módulo **NutriScan**, una herramienta para generar análisis nutricionales a partir de texto OCR o entradas manuales. La lógica de negocio es delegada al `NutriScanService` y se controla el acceso por tipo de usuario o rol (`INDIVIDUAL`, `ADMIN`, `DESARROLLADOR`).

---

## 🔍 Ubicación

`src/controller/nutriscan.controller.ts`

---

## 🔒 Seguridad

Todas las rutas están protegidas con `@Security("jwt")` y validan el `rol` o `tipoUsuario` del usuario autenticado.

| Tipo de Usuario / Rol     | Acciones Permitidas                   |
|---------------------------|----------------------------------------|
| `INDIVIDUAL`              | Crear análisis                        |
| `ADMIN`                   | Ver, crear, actualizar y eliminar     |
| `DESARROLLADOR`           | Crear análisis de prueba y ver los suyos |

---

## 🧱 Dependencias clave

- `NutriScanService`: Lógica principal de NutriScan.
- `NutriScanSchemaWithoutUserId`: Validación de datos de entrada (`zod`).
- `NutriScanUpdateSchema`: Validación para actualizaciones.

---

## 📘 Endpoints

### 📝 `POST /nutriscan`

Crea un nuevo análisis nutricional.  
**Disponible para:** `INDIVIDUAL`, `ADMIN`, `DESARROLLADOR`

#### Validaciones:

- Se usa `NutriScanSchemaWithoutUserId` para validar el cuerpo.
- Si el usuario es desarrollador, el análisis se marca como prueba (`isTest = true`).

#### Respuestas:

- `201 Created`: Registro creado con éxito.
- `400 Bad Request`: Datos inválidos.
- `403 Forbidden`: Acceso denegado.

---

### 📄 `GET /nutriscan`

Devuelve los análisis disponibles según el rol del usuario.

| Rol           | Acceso                                     |
|---------------|---------------------------------------------|
| `ADMIN`       | Todos los registros (auditoría)             |
| `DESARROLLADOR` | Solo los registros de prueba que ha creado |
| Otro          | ❌ Acceso denegado                          |

#### Respuestas:

- `200 OK`: Lista de análisis.
- `403 Forbidden`: Acceso denegado.

---

### 👤 `GET /nutriscan/usuario/{usuarioId}`

Devuelve los análisis de un usuario específico.  
**Disponible para:** `ADMIN`

#### Parámetros:

- `usuarioId`: ID numérico del usuario.

#### Respuestas:

- `200 OK`: Registros encontrados.
- `403 Forbidden`: Acceso denegado.

---

### ✏️ `PUT /nutriscan/{id}`

Actualiza parcialmente un análisis.  
**Disponible para:** `ADMIN`

#### Parámetros:

- `id`: ID del análisis.
- `body`: Datos a modificar, validados con `NutriScanUpdateSchema`.

#### Respuestas:

- `200 OK`: Registro actualizado.
- `400 Bad Request`: Error de validación.
- `403 Forbidden`: Acceso denegado.

---

### 🗑️ `DELETE /nutriscan/{id}`

Elimina un análisis por su ID.  
**Disponible para:** `ADMIN`

#### Parámetros:

- `id`: ID numérico del análisis.

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

| Método | Ruta                      | Descripción                           | Autorizado para        |
| ------ | ------------------------- | ------------------------------------- | ---------------------- |
| POST   | `/nutriscan`              | Crear un nuevo análisis               | INDIVIDUAL, ADMIN, DEV |
| GET    | `/nutriscan`              | Obtener análisis según rol            | ADMIN, DESARROLLADOR   |
| GET    | `/nutriscan/usuario/{id}` | Ver análisis de un usuario específico | ADMIN                  |
| PUT    | `/nutriscan/{id}`         | Actualizar un análisis                | ADMIN                  |
| DELETE | `/nutriscan/{id}`         | Eliminar un análisis                  | ADMIN                  |

