---
id: user.service
title: Servicio de Usuarios
sidebar_label: User Service
---

Este servicio gestiona todas las operaciones relacionadas con **usuarios**, incluyendo creación, consulta, actualización, eliminación, reactivación, cambio de contraseña y manejo de empresas.  
Incluye además la generación de **tokens JWT** al momento de crear usuarios.

---

## 📍 Ubicación

`src/services/user.service.ts`

---

## 📦 Dependencias

- [`prisma`](https://www.prisma.io/) — Cliente de base de datos.
- [`cloudinary`](https://cloudinary.com/) — Manejo de imágenes de perfil.
- [`bcryptjs`](https://www.npmjs.com/package/bcryptjs) — Encriptación de contraseñas.
- [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken) — Generación y verificación de tokens JWT.
- [`UserDTO`](../models/UserDTO) — Definición de datos de usuario.

---

## 🔑 Variables de Entorno

- `JWT_SECRET` — Clave secreta para firmar tokens JWT.

---

## 📜 Funciones

### 1. `getAllUsers(filters: Partial<UserDTO>)`

Obtiene una lista de usuarios filtrada por campos opcionales.

**Parámetros:**
- `filters`: Objeto parcial con propiedades de `UserDTO` para filtrar (búsqueda insensible a mayúsculas en `username`, `correo`, `nombreCompleto`).

**Retorna:**  
Lista de usuarios coincidentes.

---

### 2. `getUserById(id: number)`

Obtiene un usuario específico por su `idUsuario`.

**Parámetros:**
- `id`: Número identificador del usuario.

**Retorna:**  
El usuario encontrado o `null` si no existe.

---

### 3. `createUser(data: UserDTO)`

Crea un nuevo usuario con validaciones según su rol y retorna también un **token JWT**.

**Validaciones:**
- Si `rol === "USUARIO"` → `tipoUsuario` es obligatorio.
- Si `rol === "EQUIPO"` → `empresaId` es obligatorio y debe pertenecer a una empresa de tipo `"EMPRESARIAL"`.
- Contraseña siempre encriptada antes de guardar.
- Estado inicial `"activo"`.

**Payload del token generado (`24h` de expiración):**
```json
{
  "id": idUsuario,
  "username": username,
  "correo": correo,
  "rol": rol,
  "tipoUsuario": tipoUsuario,
  "rolEquipo": rolEquipo,
  "perfilCompleto": perfilCompleto,
  "empresaId": empresaId
}
````

**Retorna:**

```ts
{
  user: UsuarioCreado,
  token: string
}
```

**Errores posibles:**

* `"El tipoUsuario es obligatorio para rol USUARIO"`
* `"empresaId es obligatorio para rol EQUIPO"`
* `"La empresa especificada no existe o no es de tipo EMPRESARIAL"`

---

### 4. `getEmpresaById(id: number)`

Obtiene una empresa validando que sea de tipo `"EMPRESARIAL"`.

**Parámetros:**

* `id`: ID de la empresa.

**Errores:**

* `"Empresa no encontrada"`
* `"El usuario no es de tipo EMPRESARIAL"`

---

### 5. `updateUser(id: number, data: Partial<UserDTO>)`

Actualiza un usuario existente.

**Restricciones:**

* No se permite cambiar el rol.
* Si se envía una nueva contraseña, se encripta antes de guardar.
* Si se envía nueva `fotoPerfil` y el usuario ya tenía una, la anterior se elimina de **Cloudinary**.

**Errores:**

* `"Usuario no encontrado"`
* `"No está permitido cambiar el rol del usuario."`

---

### 6. `changeUserPassword(id: number, currentPassword: string, newPassword: string)`

Cambia la contraseña de un usuario validando la actual.

**Parámetros:**

* `id`: ID del usuario.
* `currentPassword`: Contraseña actual.
* `newPassword`: Nueva contraseña.

**Flujo:**

1. Verifica que el usuario exista.
2. Compara `currentPassword` con la almacenada.
3. Si coincide, hashea y actualiza la contraseña.

**Retorna:**

```ts
{ message: "Contraseña actualizada correctamente" }
```

**Errores:**

* `"Usuario no encontrado"`
* `"La contraseña actual es incorrecta"`

---

### 7. `reactivarUsuario(id: number)`

Restaura el estado de un usuario a `"activo"` si estaba inactivo o eliminado.

**Errores:**

* `"Usuario no encontrado"`
* `"El usuario ya está activo"`

---

### 8. `deleteUser(id: number)`

Elimina **lógicamente** un usuario (no se borra de la base de datos).

**Acciones:**

* Cambia `estado` a `"inactivo"`.
* Asigna fecha a `deletedAt`.
* Si el usuario es **EMPRESA** (`rol === "USUARIO"` y `tipoUsuario === "EMPRESARIAL"`), inactiva a todo su equipo (`rol: "EQUIPO"`) que esté activo.

**Errores:**

* `"Usuario no encontrado"`

---

## 🧠 Observaciones

* Todas las contraseñas se almacenan encriptadas con `bcryptjs`.
* El borrado es **blando** (soft delete), permitiendo reactivación posterior.
* El servicio centraliza la lógica de roles y relaciones empresa–equipo.
* El token JWT generado en `createUser` está pensado para autenticación en endpoints protegidos.

---

