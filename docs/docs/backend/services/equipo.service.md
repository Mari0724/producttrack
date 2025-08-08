---
id: equipo.service
title: Servicio Equipo
sidebar_label: Equipo
---

Este servicio administra a los **usuarios del tipo EQUIPO** dentro de una empresa.  
Permite crear, consultar, filtrar, actualizar y realizar eliminación lógica de registros del rol `EQUIPO`.

---

## 🔍 Ubicación

`src/services/equipo.service.ts`

---

## 📦 Dependencias

* `prisma`: Cliente ORM para interactuar con la base de datos.
* `EquipoDTO`: Tipo de datos para validación de entradas.
* `equipoSchema`: Esquema Zod que valida los datos de entrada.
* `sendTeamWelcomeEmail`: Servicio de correo para enviar credenciales al equipo.
* `bcrypt`: Para el cifrado de contraseñas.

---

## 🧩 Clase: `EquipoService`

---

### 🛠️ `async crearEquipo(data: EquipoDTO, empresaId: number)`

Crea un nuevo usuario con rol `EQUIPO` dentro de una empresa específica y envía un correo de bienvenida con sus credenciales.

#### Parámetros:
* `data`: Objeto con los datos del nuevo equipo (validado por `equipoSchema`).
* `empresaId`: ID de la empresa a la que pertenece.

#### Retorna:
* Objeto del equipo recién creado.

#### Lanza:
* Error si los datos no cumplen el esquema de validación.

#### Observaciones:
* La contraseña se almacena en formato **hash** usando `bcrypt`.
* El correo de bienvenida incluye la contraseña original y el nombre de la empresa.

---

### 📄 `async obtenerTodosLosEquipos(empresaId?: number)`

Obtiene todos los usuarios con rol `EQUIPO` y estado activo, ignorando los eliminados lógicamente.

#### Parámetros:
* `empresaId`: *(Opcional)* Si se especifica, se filtra solo por los equipos de esa empresa.

#### Retorna:
* Lista de usuarios activos con el rol `EQUIPO` que no tienen `deletedAt` registrado.

---

### 🔍 `async filtrarEquipos(filtros: {...})`

Permite aplicar múltiples filtros para buscar usuarios `EQUIPO`.

#### Parámetros:
```ts
{
  nombreCompleto?: string;
  correo?: string;
  rolEquipo?: "LECTOR" | "COMENTARISTA" | "EDITOR";
  estado?: "activo" | "inactivo";
  perfilCompleto?: boolean;
  empresaId?: number;
}
````

#### Retorna:

* Lista de equipos que cumplen con los criterios dados.

#### Observaciones:

* La búsqueda por `nombreCompleto` y `correo` es **insensible a mayúsculas/minúsculas**.

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
* `empresaId`: *(Opcional)* ID de la empresa que posee al equipo.
  Si se incluye, se valida la pertenencia.

#### Retorna:

* Objeto actualizado del equipo.

#### Lanza:

* Error si el equipo no existe o no pertenece a la empresa especificada (si se proporciona).

#### Observaciones:

* Se usa `.partial()` en `equipoSchema` para permitir actualizaciones parciales.

---

### 🗑️ `async eliminarLogico(id: number, empresaId?: number)`

Realiza una **eliminación lógica** de un usuario `EQUIPO`.
Se marca como `inactivo` y se registra la fecha en `deletedAt`.

#### Parámetros:

* `id`: Identificador del equipo a eliminar.
* `empresaId`: *(Opcional)* ID de la empresa. Si se incluye, valida pertenencia.

#### Retorna:

* Objeto del equipo con su estado actualizado.

#### Lanza:

* Error si el usuario no existe, no tiene el rol correcto o no pertenece a la empresa.

---

### 🧨 `async eliminarTodoElEquipo(empresaId: number)`

Realiza una **eliminación lógica masiva** de todos los usuarios del equipo de una empresa específica.

#### Parámetros:

* `empresaId`: ID de la empresa cuyos equipos serán marcados como inactivos.

#### Retorna:

* Objeto con un mensaje que indica cuántos equipos fueron marcados como inactivos.

---

## ✅ Validación

* Todos los datos se validan usando el esquema `equipoSchema`.
* Las actualizaciones permiten campos parciales (`partial()`).
* En todas las operaciones críticas se valida que el rol sea `"EQUIPO"` y, si aplica, la pertenencia a la empresa.
* La eliminación es **lógica**, preservando los registros en la base de datos.

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

// Eliminar equipo individual (lógico)
await servicio.eliminarLogico(10, 1);

// Eliminar lógicamente a todos los equipos de una empresa
await servicio.eliminarTodoElEquipo(1);
```
---