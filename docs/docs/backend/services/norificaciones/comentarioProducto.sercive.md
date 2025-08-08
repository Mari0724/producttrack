---
id: comentarioProductos.service
title: Servicio de Notificaciones por Comentario de Producto
sidebar_label: Comentario Producto 
---

Este servicio se encarga de **notificar a todos los miembros de una empresa** cuando un producto recibe un nuevo comentario.

---

## 🔍 Ubicación

`src/services/notificaciones/comentarioProductos.service.ts`

---

## 📦 Dependencias utilizadas

- [`prismaClient`](../../utils/prismaClient.ts) — Cliente de Prisma configurado para interactuar con la base de datos.
- [`TipoNotificacion`](https://www.prisma.io/docs/) — Enumeración generada por Prisma para definir tipos de notificaciones.
- [`puedeNotificar`](../../utils/notificaciones/preferenciasNotificaciones.ts) — Función que verifica si un usuario tiene habilitado recibir cierto tipo de notificación.

---

## 🧩 Función: `notificarComentarioProducto(idComentario: number)`

Envía una notificación a todos los miembros de la empresa propietaria de un producto que ha recibido un nuevo comentario.

### Parámetros

| Nombre        | Tipo     | Descripción |
|---------------|----------|-------------|
| `idComentario`| `number` | ID único del comentario que activó la notificación. |

---

### 📜 Flujo de ejecución

1. **Obtener el comentario y sus relaciones**  
   Busca en la base de datos el comentario por su `idComentario`, incluyendo el producto al que pertenece y el usuario dueño del producto.

2. **Validar existencia**  
   Si no existe el comentario, el producto o el usuario propietario, se emite una advertencia y se detiene el proceso.

3. **Validar pertenencia a empresa**  
   Si el usuario propietario del producto no pertenece a una empresa (`empresaId`), se detiene el proceso.

4. **Obtener miembros de la empresa**  
   Busca todos los usuarios que pertenecen a la misma empresa.

5. **Construir mensaje y título de la notificación**  
   Ejemplo:
```

Título: Nuevo comentario en producto: Producto X
Mensaje: Se ha comentado el producto "Producto X": "Texto del comentario"

````

6. **Filtrar miembros que pueden recibir la notificación**  
Usa la función `puedeNotificar` para verificar si cada miembro tiene activado el tipo de notificación `COMENTARIO_EQUIPO`.

7. **Enviar notificaciones**  
Inserta todas las notificaciones en la base de datos mediante `prisma.notificaciones.createMany`.

---

### Ejemplo de uso

```ts
await notificarComentarioProducto(45);
````

Este ejemplo enviará la notificación a los miembros de la empresa propietaria del producto comentado con ID de comentario `45`.

---

## 🧠 Observaciones

* Si no se encuentran miembros en la empresa, no se enviarán notificaciones.
* Usa `puedeNotificar` para respetar las preferencias individuales de notificación.
* La relación entre comentario → producto → usuario es clave para identificar a los destinatarios.

---