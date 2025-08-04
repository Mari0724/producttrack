---
id: preferencias.controller
title: PreferenciasNotificacionesController
sidebar_label: PreferenciasController
---

# PreferenciasController

Este controlador gestiona la configuración de notificaciones personalizadas para los usuarios. Permite consultar y actualizar las preferencias relacionadas con eventos importantes como bajo stock, productos vencidos, comentarios, recomendaciones de reposición y actualizaciones generales.

---

## 🔍 Ubicación

`src/controllers/preferencias.controller.ts`

---

## 📌 Endpoints

### 📥 Obtener preferencias del usuario

**GET** `/preferencias-notificaciones/{idUsuario}`

Consulta las preferencias de notificación configuradas por un usuario.

#### Parámetros

- `idUsuario` (path) – ID del usuario cuyas preferencias se desean consultar.

#### Respuesta

Un objeto con los valores actuales de las preferencias (si no existen, se retornan `true` por defecto):

```json
{
  "stockBajo": true,
  "productoVencido": true,
  "comentarios": true,
  "reposicion": true,
  "actualizacion": true
}
````

---

### ✏️ Actualizar preferencias del usuario

**PUT** `/preferencias-notificaciones/{idUsuario}`

Permite actualizar las preferencias de notificación para un usuario.

#### Parámetros

* `idUsuario` (path) – ID del usuario cuyas preferencias se desean modificar.

#### Request Body

Objeto con las preferencias a actualizar (todas son opcionales):

| Campo           | Tipo    | Descripción                                                 |
| --------------- | ------- | ----------------------------------------------------------- |
| stockBajo       | boolean | Notificar cuando el producto tiene bajo stock.              |
| productoVencido | boolean | Notificar cuando un producto ha vencido.                    |
| comentarios     | boolean | Notificar cuando se recibe un nuevo comentario.             |
| reposicion      | boolean | Notificar cuando se recomienda reponer un producto.         |
| actualizacion   | boolean | Notificar cuando hay actualizaciones generales del sistema. |

Ejemplo:

```json
{
  "stockBajo": false,
  "comentarios": true
}
```

#### Respuesta

```json
{
  "mensaje": "Preferencias actualizadas correctamente"
}
```

---

## 🛠️ Notas técnicas

* El método `obtenerPreferencias` retorna los valores guardados en la base de datos; si no existen, asume `true` por defecto para todos.
* El método `actualizarPreferencias` realiza un **upsert**, es decir, crea o actualiza según si ya existen datos para el usuario.
* No requiere autenticación, pero puede extenderse fácilmente con JWT si se desea proteger las rutas en el futuro.
