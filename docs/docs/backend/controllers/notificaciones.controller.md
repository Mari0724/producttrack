---
id: notificaciones.controller
title: NotificacionesController
sidebar_label: NotificacionesController
---

# NotificacionesController

Este controlador gestiona el envío y configuración de notificaciones para los usuarios. Las notificaciones cubren eventos como bajo stock, vencimiento de productos, comentarios, recomendaciones de reposición y actualizaciones de la app.

---

## 🔍 Ubicación

`src/controllers/notificaciones.controller.ts`

---

## 📌 Endpoints

### 📤 Enviar notificaciones

#### 🚨 Stock bajo

**POST** `/notificaciones/stock-bajo`

Envía notificaciones por productos con bajo stock.

##### Body (opcional):

```json
{
  "productos": [{ "id": 1 }, { "id": 2 }]
}
````

##### Respuesta:

```json
{ "mensaje": "Notificaciones de stock bajo enviadas correctamente" }
```

---

#### 🧪 Producto vencido

**POST** `/notificaciones/producto-vencido`

Envía notificaciones por productos vencidos. Si no se especifican productos, se notifican todos los vencidos.

##### Body (opcional):

```json
{
  "productos": [{ "id": 3 }]
}
```

##### Respuesta:

```json
{ "mensaje": "Notificaciones de producto vencido enviadas correctamente" }
```

---

#### 💬 Comentario en producto

**POST** `/notificaciones/comentario-producto`

Envía una notificación cuando alguien comenta un producto.

##### Body:

```json
{ "idComentario": 7 }
```

##### Respuesta:

```json
{ "mensaje": "Notificaciones de comentario enviadas correctamente" }
```

---

#### 🔄 Reposición recomendada

**POST** `/notificaciones/reposicion-recomendada`

Envía notificaciones de productos que se recomienda reponer.

##### Body (opcional):

```json
{
  "productos": [{ "id": 8 }]
}
```

##### Respuesta:

```json
{ "mensaje": "Notificaciones de reposición recomendada enviadas correctamente" }
```

---

#### 🛠️ Actualización de la aplicación

**POST** `/notificaciones/actualizacion-app`

Envía una notificación global sobre actualizaciones en la app.

##### Body:

```json
{
  "titulo": "Nueva versión disponible",
  "mensaje": "La versión 2.0 incluye mejoras importantes."
}
```

##### Respuesta:

```json
{ "mensaje": "Notificaciones de actualización de la app enviadas correctamente" }
```

---

### 📥 Obtener notificaciones del usuario

**GET** `/notificaciones/usuario/{idUsuario}`

Obtiene las últimas 20 notificaciones del usuario, filtradas por sus preferencias.

#### Parámetros:

* `idUsuario` (path) – ID del usuario.

##### Respuesta:

```json
[
  {
    "idNotificacion": 1,
    "tipo": "STOCK_BAJO",
    "titulo": "Alerta de stock",
    "mensaje": "El producto X tiene bajo stock",
    "leida": false,
    "fechaEnvio": "2025-08-03T14:23:00Z"
  }
]
```

> ⚠️ Si el usuario no tiene preferencias configuradas, se crean por defecto con todos los tipos de notificación habilitados.

---

### ✅ Marcar notificación como leída

**PATCH** `/notificaciones/{idNotificacion}`

Marca una notificación específica como leída.

#### Parámetros:

* `idNotificacion` (path) – ID de la notificación.

##### Respuesta:

```json
{ "mensaje": "Notificación marcada como leída" }
```

---

### ⚙️ Actualizar preferencias de notificación

**PATCH** `/notificaciones/preferencias/{idUsuario}`

Permite actualizar las preferencias de notificación del usuario.

#### Parámetros:

* `idUsuario` (path) – ID del usuario.

#### Body:

```json
{
  "stockBajo": true,
  "productoVencido": false,
  "comentarios": true,
  "reposicion": true,
  "actualizacion": true
}
```

##### Respuesta:

```json
{ "mensaje": "Preferencias actualizadas correctamente" }
```

---

## 🛠️ Notas técnicas

* Las preferencias de notificación se almacenan en la tabla `preferenciasNotificaciones`.
* Las notificaciones se filtran según las preferencias activas del usuario antes de ser mostradas.
* Las funciones de envío de notificaciones utilizan servicios separados especializados para cada tipo (`stockBajo`, `productoVencido`, etc.).
* Si un usuario no tiene configuraciones previas, se crean automáticamente con todos los tipos activados.