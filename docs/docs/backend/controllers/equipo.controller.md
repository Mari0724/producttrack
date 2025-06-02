---
id: equipo.controller
title: AuthController
sidebar_label: Equipos
---


# Controlador de Equipo

Este controlador maneja las operaciones relacionadas con la gestión de usuarios tipo "equipo" en el sistema.



## 🔐 Seguridad

Todas las rutas están protegidas por JWT (`@Security("jwt")`). Solo los usuarios empresariales pueden realizar acciones sobre miembros de su equipo.

---

## 🔍 Ubicación

`src/controllers/equipo.controller.ts`

## 📌 Endpoints

### 📤 Crear nuevo equipo

**POST** `/equipo`

Crea un nuevo usuario de tipo equipo.

#### Requiere
- Token JWT válido (usuario tipo `EMPRESARIAL`).
- Objeto `EquipoDTO` en el cuerpo de la solicitud.

#### Respuesta
- `201 Created` con el equipo creado.
- `403 Forbidden` si no es una empresa.

---

### 📥 Obtener todos los equipos

**GET** `/equipo`

Devuelve una lista de todos los usuarios de equipo registrados por la empresa.

#### Requiere
- Token JWT válido (usuario tipo `EMPRESARIAL`).

#### Respuesta
- Lista de equipos.
- `403 Forbidden` si no es una empresa.

---

### 🔍 Filtrar equipos

**GET** `/equipo/filtrar`

Permite filtrar equipos por nombre, correo o rol dentro del equipo.

#### Parámetros (query)
- `nombreCompleto` (string) - Nombre completo del equipo.
- `correo` (string) - Correo electrónico del equipo.
- `rolEquipo` (`LECTOR` | `COMENTARISTA` | `EDITOR`) - Rol asignado.

#### Respuesta
- Lista de equipos que coinciden con los filtros.

---

### 📄 Obtener equipo por ID

**GET** `/equipo/{id}`

Obtiene un equipo específico por su ID.

#### Requiere
- Token JWT válido (usuario tipo `EMPRESARIAL`).

#### Respuesta
- Objeto del equipo solicitado.
- `403 Forbidden` si el equipo no pertenece a la empresa.

---

### ✏️ Actualizar equipo

**PUT** `/equipo/{id}`

Actualiza los datos de un equipo por su ID.

#### Requiere
- Token JWT válido (usuario tipo `EMPRESARIAL`).
- Cuerpo con campos a actualizar (`Partial<EquipoDTO>`).

#### Respuesta
- Objeto del equipo actualizado.
- `403 Forbidden` si no es la empresa dueña del equipo.

---

### ❌ Eliminar equipo

**DELETE** `/equipo/{id}`

Elimina un equipo por su ID.

#### Requiere
- Token JWT válido (usuario tipo `EMPRESARIAL`).

#### Respuesta
- Confirmación de eliminación.
- `403 Forbidden` si el equipo no pertenece a la empresa.

---

## 🛠️ Notas técnicas

- Se usa `EquipoService` para manejar la lógica de negocio.
- Se realiza verificación de tipo de usuario (`EMPRESARIAL`) antes de cada acción.
- También se verifica que los datos accedidos pertenezcan a la empresa que realiza la acción.