---
id: preferencias-api
title: API de Preferencias de Notificación
sidebar_label: preferencias
---

Este archivo proporciona funciones para **obtener y actualizar las preferencias de notificación** de un usuario. Utiliza una instancia personalizada de Axios para conectarse con el backend.

---

## 🔍 Ubicación

`src/api/preferencias.ts`

---

## 📦 Dependencias utilizadas

```ts
import axiosInstance from "../utils/axiosInstance";
````

* **axiosInstance**: Instancia de Axios preconfigurada para peticiones HTTP con baseURL, headers y autenticación si es necesario.

---

## 🔧 Funciones disponibles

### 🟢 `GET` - Obtener preferencias

#### ⚙️ `getPreferenciasNotificaciones(idUsuario: number)`

Obtiene las preferencias de notificación guardadas para un usuario.

```ts
export async function getPreferenciasNotificaciones(idUsuario: number) {
  const response = await axiosInstance.get(`/preferencias-notificaciones/${idUsuario}`);
  return response.data;
}
```

* **Parámetros**:

  * `idUsuario`: número de identificación del usuario (number).
* **Retorna**: Objeto con las preferencias actuales del usuario, por ejemplo:

```ts
{
  stockBajo: true,
  productoVencido: false,
  comentarios: true,
  reposicion: true,
  actualizacion: false
}
```

---

### 🟡 `PUT` - Actualizar preferencias

#### 🔧 `updatePreferenciasNotificaciones(idUsuario, preferencias)`

Actualiza las preferencias de notificación de un usuario específico.

```ts
export async function updatePreferenciasNotificaciones(
  idUsuario: number,
  preferencias: {
    stockBajo?: boolean;
    productoVencido?: boolean;
    comentarios?: boolean;
    reposicion?: boolean;
    actualizacion?: boolean;
  }
) {
  const response = await axiosInstance.put(`/preferencias-notificaciones/${idUsuario}`, preferencias);
  return response.data;
}
```

* **Parámetros**:

  * `idUsuario`: ID del usuario (number).
  * `preferencias`: Objeto parcial con las preferencias a actualizar.

* **Ejemplo del cuerpo (`preferencias`)**:

```ts
{
  productoVencido: true,
  actualizacion: true
}
```

* **Retorna**: Objeto actualizado con las nuevas preferencias del usuario.

> ✅ Se pueden enviar solo los campos que se desean modificar. Los valores que no se incluyan permanecen sin cambios.

---

## 🚀 Ejemplo de uso

```ts
import {
  getPreferenciasNotificaciones,
  updatePreferenciasNotificaciones
} from "../api/preferencias";

const preferenciasActuales = await getPreferenciasNotificaciones(7);

await updatePreferenciasNotificaciones(7, {
  stockBajo: false,
  comentarios: true,
});
```

---

## 📝 Notas adicionales

* Este módulo se enfoca exclusivamente en las **preferencias de notificaciones** y su persistencia en el backend.
* El método `PUT` permite una modificación completa o parcial de las preferencias.
* El endpoint `/preferencias-notificaciones/:idUsuario` es reutilizado tanto para lectura como para escritura.