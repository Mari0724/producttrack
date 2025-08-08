---
id: axios-instance
title: Axios Instance
sidebar_label: Axios
---

Este archivo define una instancia personalizada de **Axios** para gestionar las peticiones HTTP hacia la API de ProductTrack.  
Centraliza la configuración de cabeceras, URL base e interceptores para el manejo automático de autenticación.

---

## 🔍 Ubicación

`src/utils/axiosInstance.ts`

---

## 📌 Propósito

- Establecer una **URL base** para todas las solicitudes.
- Definir **cabeceras comunes** como `Content-Type`.
- Añadir automáticamente el **token JWT** a las peticiones cuando esté disponible en `localStorage`.
- Evitar duplicación de configuración en cada solicitud HTTP.

---

## 🧩 Importaciones clave

| Módulo           | Propósito                                           |
| ---------------- | --------------------------------------------------- |
| `axios`          | Cliente HTTP para realizar solicitudes a la API.    |
| `url`            | Constante con la URL base de la API.                 |

---

## 🧰 Elementos principales

### 🔹 Creación de la instancia

Se utiliza `axios.create()` para definir:
- `baseURL`: la URL raíz de la API, importada desde `../constants`.
- `headers`: configuración por defecto para enviar datos en formato JSON.

---

### 🔹 Interceptor de solicitudes

Antes de enviar cada petición:
1. Obtiene el token de autenticación almacenado en `localStorage`.
2. Si el token existe, añade el encabezado `Authorization` con formato `Bearer <token>`.
3. Este proceso se realiza de forma automática, sin intervención manual en cada llamada.

---

## 🧠 Detalles técnicos

- Funciona tanto en entornos de **desarrollo** como de **producción**.
- Permite que cualquier módulo que lo importe haga peticiones autenticadas sin repetir lógica.
- El token solo se agrega si está presente en el almacenamiento local.

---

## 💡 Ejemplo de uso

```ts
import axiosInstance from '@/utils/axiosInstance';

async function getProductos() {
  const { data } = await axiosInstance.get('/productos');
  return data;
}
````

En este ejemplo:

* No es necesario incluir la URL completa de la API.
* El encabezado `Authorization` se agrega automáticamente si hay un token válido.

---

## ✅ Resumen

| Elemento                  | Propósito                                             |
| ------------------------- | ----------------------------------------------------- |
| **Instancia Axios**       | Define configuración común para todas las solicitudes |
| **Interceptor**           | Agrega token JWT automáticamente                      |
| **URL base centralizada** | Facilita el mantenimiento y evita errores repetidos   |

---