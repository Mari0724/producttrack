---
id: equipo.controller
title: EquipoController
sidebar_label: Equipos
---

# Controlador de Equipo

Este controlador maneja las operaciones relacionadas con la gestión de usuarios tipo "equipo" en el sistema.

## 🔐 Seguridad

Todas las rutas están protegidas por JWT (`@Security("jwt")`). Solo los usuarios **tipo EMPRESARIAL** o con rol **ADMIN** pueden realizar acciones sobre los miembros del equipo.

---

## 🔍 Ubicación

`src/controllers/equipo.controller.ts`

## 📌 Endpoints

### 📤 Crear nuevo equipo

**POST** `/equipo`

Crea un nuevo usuario de tipo equipo para una empresa.

#### Requiere
- Token JWT válido.
- Objeto `EquipoDTO` en el cuerpo de la solicitud.
- **Solo pueden acceder usuarios con `tipoUsuario: EMPRESARIAL` o `rol: ADMIN`.**
  - Si el usuario es `ADMIN`, debe incluir `empresaId` en el cuerpo.

#### Respuesta
- `201 Created` con el equipo creado.
- `400 Bad Request` si falta `empresaId` siendo ADMIN.
- `403 Forbidden` si no tiene permisos.

---

### 📥 Obtener todos los equipos

**GET** `/equipo`

Devuelve una lista de todos los usuarios de equipo.

#### Requiere
- Token JWT válido.
- **Solo pueden acceder usuarios con `tipoUsuario: EMPRESARIAL` o `rol: ADMIN`.**

#### Respuesta
- Lista de equipos.
- `403 Forbidden` si no tiene permisos.

---

### 🔍 Filtrar equipos

**GET** `/equipo/filtrar`

Permite filtrar equipos por nombre, correo o rol dentro del equipo.

#### Parámetros (query)
- `nombreCompleto` (string) - Nombre completo del equipo.
- `correo` (string) - Correo electrónico.
- `rolEquipo` (`LECTOR` | `COMENTARISTA` | `EDITOR`) - Rol asignado.

#### Requiere
- Token JWT válido.
- **Solo pueden acceder usuarios con `tipoUsuario: EMPRESARIAL` o `rol: ADMIN`.**
- Si el usuario es EMPRESARIAL, solo puede ver equipos de su empresa.

#### Respuesta
- Lista de equipos que coinciden con los filtros.
- `403 Forbidden` si no tiene permisos.

---

### 📄 Obtener equipo por ID

**GET** `/equipo/{id}`

Obtiene un equipo específico por su ID.

#### Requiere
- Token JWT válido.
- **Solo pueden acceder usuarios con `tipoUsuario: EMPRESARIAL` o `rol: ADMIN`.**
- Los usuarios EMPRESARIALES solo pueden ver equipos que pertenezcan a su empresa.

#### Respuesta
- Objeto del equipo solicitado.
- `403 Forbidden` si el equipo no pertenece a su empresa.

---

### ✏️ Actualizar equipo

**PUT** `/equipo/{id}`

Actualiza los datos de un equipo por su ID.

#### Requiere
- Token JWT válido.
- Cuerpo con campos a actualizar (`Partial<EquipoDTO>`).
- **Solo pueden acceder usuarios con `tipoUsuario: EMPRESARIAL` o `rol: ADMIN`.**

#### Respuesta
- Objeto del equipo actualizado.
- `403 Forbidden` si no tiene permisos o no pertenece a su empresa.

---

### ❌ Eliminar equipo

**DELETE** `/equipo/{id}`

Elimina un equipo por su ID.

#### Requiere
- Token JWT válido.
- **Solo pueden acceder usuarios con `tipoUsuario: EMPRESARIAL` o `rol: ADMIN`.**
- Los usuarios EMPRESARIALES solo pueden eliminar equipos de su propia empresa.

#### Respuesta
- Confirmación de eliminación.
- `403 Forbidden` si no tiene permisos o no pertenece a su empresa.

---

### ❌ Eliminar todos los equipos de una empresa

**DELETE** `/equipo/todos/{empresaId}`

Elimina todos los equipos asociados a una empresa.

#### Requiere
- Token JWT válido.
- **Solo pueden acceder:**
  - Usuarios con `rol: ADMIN`.
  - Usuarios EMPRESARIALES que quieran eliminar los equipos de su **propia** empresa.

#### Parámetros
- `empresaId` (path) – ID de la empresa cuyos equipos serán eliminados.

#### Respuesta
- Confirmación de eliminación masiva.
- `403 Forbidden` si intenta eliminar los equipos de otra empresa.

---

## 🛠️ Notas técnicas

- Todas las acciones usan `EquipoService` para la lógica de negocio.
- Se verifica el tipo de usuario (`EMPRESARIAL`) o el rol (`ADMIN`) en cada endpoint.
- Se protege el acceso y la integridad de los datos según el `empresaId`.
