---
id: security-service
title: Security Service
sidebar_label: Security 
---

Este archivo define el servicio encargado de la **gestión de cambio de contraseña** de usuarios en el sistema, enviando la solicitud al backend a través de una instancia configurada de Axios.

---

## 🔍 Ubicación
`src/service/securityService.ts`

---

## 📌 Funciones

### 🔹 `changeUserPassword`

**Descripción:**  
Permite a un usuario cambiar su contraseña actual por una nueva, enviando los datos al endpoint correspondiente de la API.

**Parámetros:**

| Nombre           | Tipo     | Descripción |
|------------------|----------|-------------|
| `id`             | `number` | Identificador único del usuario. |
| `currentPassword`| `string` | Contraseña actual del usuario. |
| `newPassword`    | `string` | Nueva contraseña que reemplazará la actual. |

**Retorna:**  
```ts
Promise<{ message: string }>
````

Un objeto con un mensaje de confirmación enviado desde el backend.

---

## 🔄 Flujo de ejecución

1. Recibe el `id`, la `currentPassword` y la `newPassword`.
2. Realiza una **petición HTTP PUT** al endpoint `/usuarios/cambiarContrasena`.
3. Envía el cuerpo de la petición con los datos necesarios.
4. Retorna el mensaje de respuesta enviado por el servidor.

---

## 📌 Ejemplo de uso

```ts
import { changeUserPassword } from "../service/securityService";

async function actualizarContrasena() {
  try {
    const respuesta = await changeUserPassword(12, "vieja123", "nueva456");
    console.log(respuesta.message); // "Contraseña actualizada correctamente"
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
  }
}
```

---

## 🔗 Dependencias

* [`axiosInstance`](../utils/axiosInstance.md) → Cliente Axios configurado para manejar peticiones HTTP en el sistema.

---