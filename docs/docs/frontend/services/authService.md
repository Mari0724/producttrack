---
id: auth-service
title: Servicio de Autenticación
sidebar_label: Autenticación
---

Este archivo define las funciones del servicio relacionadas con el **restablecimiento de contraseñas** en el sistema. Utiliza `axiosInstance` para comunicarse con la API y enviar/recibir datos sobre el proceso de recuperación.

---

## 🔍 Ubicación

`src/services/authService.ts`

---

## 📌 Propósito

Gestionar el flujo de restablecimiento de contraseña:

- Solicitar un enlace de recuperación mediante correo electrónico.
- Confirmar el restablecimiento proporcionando un token y la nueva contraseña.

---

## 🧩 Importaciones clave

```ts
import axiosInstance from '../utils/axiosInstance';
````

| Módulo          | Propósito                                                            |
| --------------- | -------------------------------------------------------------------- |
| `axiosInstance` | Cliente Axios preconfigurado para realizar peticiones HTTP a la API. |

---

## 🧰 Funciones exportadas

### 🔹 `solicitarReset(correo: string): Promise<any>`

Inicia el proceso de recuperación de contraseña enviando el correo electrónico del usuario al endpoint correspondiente.

**Parámetros:**

* `correo` (`string`): Dirección de correo electrónico del usuario que solicita el restablecimiento.

**Retorna:**
La respuesta del backend, generalmente un mensaje de confirmación.

---

### 🔹 `confirmarReset(token: string, nuevaContrasena: string): Promise<any>`

Confirma el restablecimiento de la contraseña usando el token proporcionado por correo electrónico y la nueva contraseña.

**Parámetros:**

* `token` (`string`): Token de validación enviado al correo del usuario.
* `nuevaContrasena` (`string`): Nueva contraseña que se establecerá en la cuenta.

**Retorna:**
La respuesta del backend, normalmente confirmando el cambio de contraseña.

---

## 🧠 Detalles técnicos

* Ambas funciones utilizan `axiosInstance.post()` para enviar datos en formato JSON al servidor.
* Las rutas de la API utilizadas son:

  * `POST /auth/solicitar-reset`
  * `POST /auth/confirmar-reset`
* No realizan transformaciones de datos; devuelven directamente la respuesta del servidor (`response.data`).

---

## ✅ Resumen

| Función          | Propósito                                                       |
| ---------------- | --------------------------------------------------------------- |
| `solicitarReset` | Inicia el proceso de recuperación de contraseña mediante correo |
| `confirmarReset` | Establece una nueva contraseña validando con un token           |

---