---
id: preferencias-service
title: Servicio de Preferencias de Notificaciones
sidebar_label: Preferencias
---


Este módulo gestiona la **creación y actualización** de las preferencias de notificaciones de un usuario en el sistema.

---

## 🔍 Ubicación

`src/services/preferencias.service.ts`

---

## 📦 Dependencias utilizadas

```ts
import prisma from '../utils/prismaClient';
````

* **`prisma`** → Cliente de base de datos para interactuar con la tabla `preferenciasNotificaciones`.

---

## 🛠 Funciones principales

### `actualizarPreferencias(idUsuario: number, data: Partial<Preferencias>)`

Actualiza o crea las preferencias de notificaciones para un usuario específico.

#### **Parámetros**

* **`idUsuario`** *(number)* → ID del usuario al que se le aplicarán las preferencias.
* **`data`** *(Partial\<Preferencias>)* → Objeto con las preferencias a modificar. Puede incluir:

  * `stockBajo` *(boolean)* → Notificación de stock bajo.
  * `productoVencido` *(boolean)* → Notificación de productos vencidos.
  * `comentarios` *(boolean)* → Notificación de nuevos comentarios.
  * `reposicion` *(boolean)* → Notificación de reposición de stock.
  * `actualizacion` *(boolean)* → Notificación de actualizaciones generales.

---

## 🔄 Lógica de funcionamiento

1. **Consulta inicial**
   Se busca si el usuario ya tiene preferencias registradas:

   ```ts
   const existentes = await prisma.preferenciasNotificaciones.findUnique({
     where: { idUsuario }
   });
   ```

2. **Si existen preferencias previas**

   * Se actualizan únicamente los campos recibidos en `data`.

3. **Si no existen preferencias previas**

   * Se crea un nuevo registro en `preferenciasNotificaciones`.
   * Los campos no especificados en `data` se inicializan en `true` por defecto.

---

## 📂 Ejemplo de uso

```ts
await actualizarPreferencias(5, {
  stockBajo: false,
  productoVencido: true
});
```

📌 Este ejemplo actualiza las preferencias del usuario con ID **5**, desactivando las alertas por stock bajo pero manteniendo activas las de productos vencidos.

---

## ⚙️ Tablas relacionadas

* **`preferenciasNotificaciones`**

  * `idUsuario` *(PK, FK → usuarios.id)*
  * `stockBajo` *(boolean)*
  * `productoVencido` *(boolean)*
  * `comentarios` *(boolean)*
  * `reposicion` *(boolean)*
  * `actualizacion` *(boolean)*

---