---
id: notificaciones-api
title: API de Notificaciones
sidebar_label: notificaciones
---

Este archivo contiene funciones para interactuar con la API de **notificaciones**, incluyendo obtención de notificaciones, preferencias del usuario, y el envío de notificaciones personalizadas. Utiliza una instancia de Axios configurada para el proyecto.

---

## 🔍 Ubicación

`src/api/notificaciones.ts`

---

## 📦 Dependencias utilizadas

```ts
import axiosInstance from "../utils/axiosInstance";
````

* **axiosInstance**: Instancia de Axios personalizada con configuración global (headers, baseURL, etc.).

---

## 🔧 Funciones disponibles

### 🟢 `GET` - Obtener datos

#### 📬 `getNotificacionesUsuario(idUsuario: number)`

Obtiene todas las notificaciones asociadas al usuario.

```ts
export async function getNotificacionesUsuario(idUsuario: number) {
  const response = await axiosInstance.get(`/notificaciones/usuario/${idUsuario}`);
  return response.data;
}
```

---

#### 📦 `getProductosDelUsuario(idUsuario: number)`

Obtiene los productos registrados por un usuario.

```ts
export async function getProductosDelUsuario(idUsuario: number) {
  const response = await axiosInstance.get(`/productos/nombres/${idUsuario}`);
  return response.data;
}
```

---

#### ⚙️ `getPreferenciasUsuario(idUsuario: number)`

Obtiene las preferencias de notificación actuales del usuario.

```ts
export const getPreferenciasUsuario = async (idUsuario: number) => {
  const response = await axiosInstance.get(`/preferencias-notificaciones/${idUsuario}`);
  return response.data;
};
```

---

### 🟠 `PATCH` - Actualizar datos

#### ✅ `marcarNotificacionLeida(idNotificacion: number)`

Marca una notificación como leída.

```ts
export async function marcarNotificacionLeida(idNotificacion: number) {
  const response = await axiosInstance.patch(`/notificaciones/${idNotificacion}`);
  return response.data;
}
```

---

#### 🧩 `actualizarPreferenciasUsuario(idUsuario, preferencias)`

Actualiza las preferencias del usuario para las notificaciones que desea recibir.

```ts
export const actualizarPreferenciasUsuario = async (
  idUsuario: number,
  preferencias: {
    stockBajo?: boolean;
    productoVencido?: boolean;
    comentarios?: boolean;
    reposicion?: boolean;
    actualizacion?: boolean;
  }
) => {
  const { data } = await axiosInstance.patch(
    `/notificaciones/preferencias/${idUsuario}`,
    preferencias
  );
  return data;
};
```

> 🧠 Este método acepta un objeto con preferencias booleanas. Cada campo es opcional y se puede actualizar parcialmente.

---

### 🔵 `POST` - Enviar notificaciones

#### 🚀 `enviarNotificacionActualizacion(data)`

Envía una notificación general de **actualización de la aplicación** a todos los usuarios.

```ts
export const enviarNotificacionActualizacion = (data: {
  titulo: string;
  mensaje: string;
}) => {
  return axiosInstance.post('/notificaciones/actualizacion-app', data);
};
```

---

#### 🔁 `enviarNotificacionReposicion(data)`

Envía una notificación personalizada de **reposición de producto** a un usuario específico.

```ts
export const enviarNotificacionReposicion = (data: {
  tipo: string;
  titulo: string;
  mensaje: string;
  idUsuario: number;
}) => {
  return axiosInstance.post("/notificaciones", data);
};
```

---

## 🚀 Ejemplo de uso

```ts
import { enviarNotificacionReposicion } from "../api/notificaciones";

await enviarNotificacionReposicion({
  tipo: "reposicion",
  titulo: "¡Reposicion recomendada!",
  mensaje: "El producto 'Crema de Leche' tiene solo 28 unidades disponibles.",
  idUsuario: 42,
});
```

---

## 📝 Notas adicionales

* Este archivo centraliza todas las operaciones relacionadas con las notificaciones del sistema.
* Se divide en tres bloques principales: **obtención de datos**, **actualización de preferencias/estado**, y **envío de notificaciones**.
* Al utilizar `axiosInstance`, se garantiza la uniformidad en las configuraciones de red.