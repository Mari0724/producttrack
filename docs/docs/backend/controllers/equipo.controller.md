---
id: equipo.controller
title: EquipoController
sidebar_label: EquipoController
---

# Controlador de Equipo

Este controlador maneja las operaciones relacionadas con la gestión de usuarios tipo "equipo" en el sistema. Permite crear, actualizar, filtrar, eliminar (lógicamente) y listar miembros del equipo, con base en el rol y tipo de usuario autenticado.

---
## 🔍 Ubicación

`src/controllers/equipo.controller.ts`

---

## 🔐 Seguridad

Todas las rutas están protegidas por JWT (`@Security("jwt")`).  
Solo los usuarios con **tipoUsuario = EMPRESARIAL** o **rol = ADMIN** pueden realizar acciones sobre los miembros del equipo.

---

## 📌 Endpoints

### 📤 Crear nuevo equipo

**POST** `/equipo`

Crea un nuevo usuario de tipo equipo para una empresa.

#### Requiere
- Token JWT válido.
- Objeto `EquipoDTO` en el cuerpo de la solicitud.
- Si el usuario es `ADMIN`, debe incluir `empresaId` explícitamente.

#### Respuesta
- `201 Created` con el equipo creado.
- `400 Bad Request` si falta `empresaId` siendo `ADMIN`.
- `403 Forbidden` si no tiene permisos.

---

### 📥 Obtener todos los equipos

**GET** `/equipo`

Lista todos los equipos.  
Si el usuario es EMPRESARIAL, se limita a su propia empresa.

#### Requiere
- Token JWT válido.

#### Respuesta
- Lista de equipos según el contexto.
- `403 Forbidden` si no tiene permisos.

---

### 🔎 Filtrar equipos

**GET** `/equipo/filtrar`

Permite filtrar equipos por múltiples parámetros.

#### Parámetros (`query`)
- `nombreCompleto` (string) – Filtrar por nombre.
- `correo` (string) – Filtrar por correo.
- `rolEquipo` (`LECTOR` | `COMENTARISTA` | `EDITOR`) – Rol dentro del equipo.
- `estado` (`activo` | `inactivo`) – Estado del equipo.
- `perfilCompleto` (`true` | `false`) – Si el equipo completó el perfil.

#### Requiere
- Token JWT válido.
- Si es EMPRESARIAL, solo verá equipos de su empresa.

#### Respuesta
- Lista de equipos filtrados.
- `403 Forbidden` si no tiene permisos.

---

### 📄 Obtener equipo por ID

**GET** `/equipo/{id}`

Obtiene los datos de un miembro del equipo por su ID.

#### Requiere
- Token JWT válido.
- Si el usuario es EMPRESARIAL, solo podrá acceder a miembros de su empresa.

#### Respuesta
- Objeto del equipo.
- `403 Forbidden` si intenta acceder a otro equipo fuera de su empresa.

---

### ✏️ Actualizar equipo

**PUT** `/equipo/{id}`

Actualiza campos específicos de un usuario equipo.

#### Requiere
- Token JWT válido.
- Cuerpo con los campos a modificar (`Partial<EquipoDTO>`).
- EMPRESARIAL solo puede modificar equipos de su empresa.

#### Respuesta
- Equipo actualizado.
- `403 Forbidden` si no tiene permisos.

---

### 🗑️ Eliminación lógica de equipo

**DELETE** `/equipo/eliminar-logico/{id}`

Realiza una **eliminación lógica** (no física) de un miembro del equipo.

#### Requiere
- Token JWT válido.
- El equipo debe pertenecer a la empresa del usuario si es EMPRESARIAL.

#### Respuesta
- Confirmación de eliminación.
- `403 Forbidden` si no tiene permisos o el equipo no pertenece a su empresa.
- `404 Not Found` si el equipo no existe.

---

### 🧨 Eliminar todos los equipos de una empresa

**DELETE** `/equipo/todos/{empresaId}`

Elimina todos los usuarios de equipo asociados a una empresa.

#### Requiere
- Token JWT válido.
- Solo `ADMIN` o EMPRESARIAL **de la misma empresa** pueden ejecutar esta acción.

#### Respuesta
- Confirmación de eliminación masiva.
- `403 Forbidden` si se intenta eliminar los equipos de otra empresa.

---

## 🛠️ Notas técnicas

- Toda la lógica está contenida en el `EquipoService`.
- Se aplica validación de acceso según:
  - `req.user.tipoUsuario === "EMPRESARIAL"`
  - `req.user.rol === "ADMIN"`
- Si el usuario es EMPRESARIAL, se restringen acciones a su propio `empresaId`.
- Los campos `estado` y `perfilCompleto` pueden usarse como filtros adicionales en los endpoints de consulta.