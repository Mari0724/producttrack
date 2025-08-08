---
id: log.service
title: Servicio Log
sidebar_label: Log 
---

# Log Service

Este servicio gestiona la **autenticación de usuarios**, el **inicio de sesión**, y el **restablecimiento de contraseñas**.  
Incluye validación de credenciales, generación de tokens JWT seguros, y envío de correos para recuperación de cuenta.

---

## 🔍 Ubicación

`src/services/log.service.ts`

---

## 📦 Dependencias

- [`bcryptjs`](https://www.npmjs.com/package/bcryptjs)  
  Para comparar y generar contraseñas hasheadas.
- [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken)  
  Para generar tokens JWT.
- [`prisma`](../utils/prismaClient)  
  Cliente ORM para interactuar con la base de datos.
- [`crypto`](https://nodejs.org/api/crypto.html)  
  Para generar tokens aleatorios de recuperación.
- [`email.service`](./email.service.md)  
  Para enviar correos electrónicos de restablecimiento.
- Variables de `config/token`:
  - `JWT_SECRET`: Clave secreta para firmar el token.
  - `TOKEN_EXPIRES_IN`: Tiempo de expiración del token JWT.

---

## 🧩 Clase: `LogService`

### 🔐 `async login(correo: string, password: string)`

Realiza el proceso de autenticación:

1. **Busca el usuario** en la base de datos por correo electrónico.
2. **Valida su existencia**.
3. **Compara contraseñas** usando `bcryptjs.compare`.
4. **Genera un token JWT** con información relevante:
   - `id`
   - `rol`
   - `tipoUsuario`
   - `rolEquipo`
   - `perfilCompleto`
   - `empresaId` (resuelto según tipo de usuario)
5. **Verifica si el perfil está incompleto** (solo para rol `"EQUIPO"`, si faltan `telefono` o `direccion`).

#### Parámetros
- `correo`: Email del usuario.
- `password`: Contraseña en texto plano.

#### Retorna
```ts
{
  user: {
    idUsuario,
    username,
    correo,
    rol,
    tipoUsuario,
    rolEquipo,
    perfilCompleto,
    empresaId
  },
  token,                   // JWT válido por TOKEN_EXPIRES_IN
  requiereCompletarPerfil  // true | false
}
````

#### Lanza

* `Error("Usuario no encontrado")` si el correo no existe.
* `Error("Contraseña incorrecta")` si la clave no coincide.

---

### 📩 `async solicitarReset(correo: string)`

Inicia el proceso de **recuperación de contraseña**:

1. **Verifica que el usuario exista**.
2. **Genera un token aleatorio** de 6 caracteres (HEX).
3. **Registra la solicitud** en la tabla `passwordReset` con:

   * Fecha de solicitud.
   * Fecha de expiración (15 minutos).
   * Estado `usado: false`.
4. **Envía un correo electrónico** con el token.

#### Parámetros

* `correo`: Correo electrónico registrado.

#### Retorna

```ts
{ mensaje: "Solicitud registrada. Revisa tu correo para continuar." }
```

#### Lanza

* `Error("No existe una cuenta con ese correo")` si el usuario no existe.

---

### 🔄 `async confirmarReset(token: string, nuevaContrasena: string)`

Confirma y procesa el **cambio de contraseña**:

1. **Busca el token** en la tabla `passwordReset`:

   * No usado.
   * No expirado.
   * Más reciente (orden por fechaSolicitud desc).
2. **Hashea la nueva contraseña** con `bcryptjs.hash`.
3. **Usa una transacción** para:

   * Marcar el token como usado.
   * Actualizar la contraseña del usuario.

#### Parámetros

* `token`: Token recibido por correo.
* `nuevaContrasena`: Nueva contraseña en texto plano.

#### Retorna

```ts
{ mensaje: "Contraseña restablecida con éxito." }
```

#### Lanza

* `Error("Token inválido o expirado")` si no se encuentra un token válido.
* `Error("Este token ya fue utilizado.")` si fue usado en otra transacción.

---

## 🧪 Función auxiliar: `validarCredenciales`

```ts
export const validarCredenciales = async (email: string, password: string)
```

Invoca directamente `login()` para validar credenciales.

#### Parámetros

* `email`: Correo electrónico.
* `password`: Contraseña.

#### Retorna

* El mismo objeto que `login()`.

---

## ✅ Ejemplo de uso

```ts
import { validarCredenciales } from "./services/log.service";

// Inicio de sesión
const { user, token, requiereCompletarPerfil } =
  await validarCredenciales("correo@ejemplo.com", "secreta123");

if (requiereCompletarPerfil) {
  console.log("Debe completar su perfil antes de continuar.");
}

// Solicitud de recuperación
await new LogService().solicitarReset("correo@ejemplo.com");

// Confirmación de cambio de clave
await new LogService().confirmarReset("abc123", "NuevaClaveSegura!");
```

---

## 🔐 Consideraciones de seguridad

* Las contraseñas nunca se exponen.
* Los tokens de recuperación expiran a los 15 minutos.
* El JWT incluye únicamente datos esenciales para la sesión.
* Las operaciones críticas usan **transacciones** para evitar inconsistencias.

```

---
