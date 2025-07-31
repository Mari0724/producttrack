---
id: equipo.service
title: Servicio Equipo
sidebar_label: Equipo Service
---

# Equipo Service

Este servicio administra a los **usuarios del tipo EQUIPO** dentro de una empresa. Permite crear, consultar, filtrar, actualizar y eliminar registros del rol `EQUIPO`.

---

## 🔍 Ubicación

`src/services/equipo.service.ts`

---

## 📦 Dependencias

* `prisma`: Cliente ORM para interactuar con la base de datos.
* `EquipoDTO`: Tipo de datos para validación de entradas.
* `equipoSchema`: Esquema Zod que valida los datos de entrada.

---

## 🧩 Clase: `EquipoService`

---

### 🛠️ `async crearEquipo(data: EquipoDTO, empresaId: number)`

Crea un nuevo usuario con rol `EQUIPO` dentro de una empresa específica.

#### Parámetros:

* `data`: Objeto con los datos del nuevo equipo (validado por `equipoSchema`).
* `empresaId`: ID de la empresa a la que pertenece.

#### Retorna:

* Objeto del equipo recién creado.

#### Lanza:

* Error si los datos no cumplen el esquema de validación.

---

### 📄 `async obtenerTodosLosEquipos()`

Obtiene todos los usuarios con rol `EQUIPO`, sin aplicar filtros.

#### Retorna:

* Lista de usuarios con el rol `EQUIPO`.

---

### 🔍 `async filtrarEquipos(filtros: {...})`

Permite aplicar múltiples filtros para buscar usuarios `EQUIPO`.

#### Parámetros:

```ts
{
  nombreCompleto?: string;
  correo?: string;
  rolEquipo?: "LECTOR" | "COMENTARISTA" | "EDITOR";
  empresaId?: number;
}
````

#### Retorna:

* Lista de equipos que cumplen con los criterios dados.

#### Observaciones:

* La búsqueda por `nombreCompleto` y `correo` es insensible a mayúsculas/minúsculas.

---

### 🔎 `async obtenerEquipoPorId(id: number)`

Busca un usuario `EQUIPO` por su `idUsuario`.

#### Parámetros:

* `id`: Identificador único del usuario.

#### Retorna:

* Objeto del equipo correspondiente.

#### Lanza:

* Error si el usuario no existe o no tiene rol `EQUIPO`.

---

### ✏️ `async actualizarEquipo(id: number, datosActualizados: Partial<EquipoDTO>, empresaId?: number)`

Actualiza los datos de un usuario `EQUIPO`.

#### Parámetros:

* `id`: ID del equipo a actualizar.
* `datosActualizados`: Objeto con los campos que se desean modificar.
* `empresaId`: *(Opcional)* ID de la empresa que posee al equipo. Si se incluye, se valida la pertenencia.

#### Retorna:

* Objeto actualizado del equipo.

#### Lanza:

* Error si el equipo no existe o no pertenece a la empresa especificada (si se proporciona).

---

### 🗑️ `async eliminarEquipo(id: number, empresaId?: number)`

Elimina un usuario `EQUIPO` por ID.

#### Parámetros:

* `id`: Identificador del equipo a eliminar.
* `empresaId`: *(Opcional)* ID de la empresa. Si se incluye, valida pertenencia.

#### Retorna:

* Objeto del equipo eliminado.

#### Lanza:

* Error si el usuario no existe o no tiene el rol correcto o no pertenece a la empresa.

---

### 🧨 `async eliminarTodoElEquipo(empresaId: number)`

Elimina a **todos los usuarios del equipo** asociados a una empresa específica.

#### Parámetros:

* `empresaId`: ID de la empresa cuyos equipos serán eliminados.

#### Retorna:

* Objeto con un mensaje que indica cuántos equipos fueron eliminados.

---

## ✅ Validación

* Todos los datos se validan usando el esquema `equipoSchema`.
* Se usa `.partial()` en `actualizarEquipo()` para permitir actualizaciones parciales.
* Se verifica el rol `"EQUIPO"` y opcionalmente la pertenencia a una empresa (`empresaId`).

---

## 🧪 Ejemplo de uso

```ts
const servicio = new EquipoService();

// Crear nuevo equipo
await servicio.crearEquipo({
  nombreCompleto: "Juan Pérez",
  correo: "juan@empresa.com",
  password: "segura123",
  username: "jperez",
  telefono: "3214567890",
  direccion: "Calle 123",
  rolEquipo: "EDITOR"
}, 1);

// Filtrar por empresa y rol
const resultado = await servicio.filtrarEquipos({
  empresaId: 1,
  rolEquipo: "LECTOR"
});

// Eliminar equipo individual
await servicio.eliminarEquipo(10, 1);

// Eliminar a todos los equipos de una empresa
await servicio.eliminarTodoElEquipo(1);
```
