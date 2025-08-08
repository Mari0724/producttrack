---
id: email-service
title: Servicio de Correo Electrónico
sidebar_label: Email
---

Este archivo define un **servicio de envío de correos electrónicos** para la aplicación. Utiliza la biblioteca `nodemailer` para enviar correos SMTP a través de Gmail. Está enfocado principalmente en notificaciones de **bienvenida** y **restablecimiento de contraseña**.

---

## 🔍 Ubicación

`src/services/email.service.ts`

---

## 📦 Dependencias

```ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
````

* `nodemailer`: Cliente SMTP para envío de correos.
* `dotenv`: Para cargar variables de entorno (`EMAIL_USER`, `EMAIL_PASS`) desde un archivo `.env`.

---

## ⚙️ Configuración del Transportador

```ts
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

Se crea un transportador con servicio de Gmail. Las credenciales de autenticación se leen desde variables de entorno, lo que protege la seguridad de los datos sensibles.

---

## ✉️ Funciones Exportadas

---

### 🔹 `sendTeamWelcomeEmail(to: string, tempPassword: string, companyName: string): Promise<void>`

**Descripción:**
Envía un correo de bienvenida a un nuevo miembro del equipo cuando una empresa crea su cuenta.

**Parámetros:**

| Nombre         | Tipo     | Descripción                                   |
| -------------- | -------- | --------------------------------------------- |
| `to`           | `string` | Correo electrónico del destinatario.          |
| `tempPassword` | `string` | Contraseña temporal generada para el usuario. |
| `companyName`  | `string` | Nombre de la empresa que creó la cuenta.      |

**Contenido del correo:**

* Mensaje de bienvenida personalizado.
* Información de acceso (correo y contraseña temporal).
* Botón de acceso (estático por ahora).

**Asunto del correo:**

```
¡Te han creado una cuenta en ProductTrack!
```

---

### 🔹 `sendPasswordResetEmail(to: string, token: string): Promise<void>`

**Descripción:**
Envía un correo de restablecimiento de contraseña con un **token de verificación**.

**Parámetros:**

| Nombre  | Tipo     | Descripción                               |
| ------- | -------- | ----------------------------------------- |
| `to`    | `string` | Correo electrónico del destinatario.      |
| `token` | `string` | Código único para restablecer contraseña. |

**Contenido del correo:**

* Mensaje explicando la solicitud de restablecimiento.
* Token para ingresar en la aplicación.
* Duración de validez: 15 minutos.
* Notas de seguridad (mensaje automatizado, no responder).

**Asunto del correo:**

```
Restablecimiento de contraseña - ProductTrack
```

---

## 🔐 Variables de entorno necesarias

Asegúrate de tener configuradas las siguientes variables en tu archivo `.env`:

```env
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion
```

> ⚠️ Se recomienda utilizar una contraseña de aplicación generada desde tu cuenta de Google en lugar de la contraseña personal.

---

## ✅ Resumen

| Función                  | Propósito                                    |
| ------------------------ | -------------------------------------------- |
| `sendTeamWelcomeEmail`   | Enviar bienvenida con datos de acceso.       |
| `sendPasswordResetEmail` | Enviar código de recuperación de contraseña. |

---

## 📝 Notas adicionales

* El HTML de los correos está embebido directamente y estilizado en línea.
* Se recomienda en el futuro usar plantillas externas para mayor mantenimiento.
* El enlace de login aún es estático (`https://producttrack.com/login`), pendiente de implementación.
---