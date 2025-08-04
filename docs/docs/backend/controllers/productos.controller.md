---
id: productos.controller
title: ProductosController
sidebar_label: ProductosController
---

# ProductosController

Este controlador maneja las operaciones CRUD sobre los productos del sistema, incluyendo funcionalidades adicionales como filtros, estadísticas por categoría y rango de precio, validaciones de permisos, y generación de historial de cambios.

---

## 🔐 Seguridad

* La mayoría de los endpoints requieren un token JWT válido (`@Security("jwt")`).
* Se validan permisos según el `rol` o `rolEquipo` del usuario.

---

## 🔍 Ubicación

`src/controllers/productos.controller.ts`

---

## 📌 Endpoints

### 📥 Obtener todos los productos con filtros

**GET** `/productos`

Filtra productos según nombre, categoría, estado, fechas de adquisición o vencimiento. El comportamiento depende del tipo de usuario:

* `INDIVIDUAL`: Solo ve sus propios productos.
* `EMPRESARIAL`: Puede ver productos de su empresa.

#### Parámetros (query):

* `nombre` (string)
* `categoria` (string)
* `estado` (string)
* `fechaAdquisicionDesde`, `fechaAdquisicionHasta` (string - ISO date)
* `fechaVencimientoDesde`, `fechaVencimientoHasta` (string - ISO date)

#### Respuesta:

* Lista de productos.

---

### 🗂 Obtener categorías únicas

**GET** `/productos/categorias`

Devuelve una lista de categorías únicas según el tipo de usuario.

#### Requiere:

* `tipoUsuario` como parámetro de consulta.

#### Respuesta:

* Lista de strings o mensaje de error.

---

### 📊 Obtener productos por categoría

**GET** `/productos/por-categoria`

Filtra productos que pertenecen a una categoría específica.

#### Parámetro:

* `categoria` (query)

#### Respuesta:

* Lista de productos o mensaje de error.

---

### 🏷 Obtener nombres de productos de un usuario

**GET** `/productos/nombres/{idUsuario}`

Devuelve solo los nombres de los productos activos de un usuario.

---

### 📈 Cantidad de productos por categoría

**GET** `/productos/cantidad-por-categoria`

Devuelve cuántos productos hay por cada categoría.

#### Respuesta:

* Lista con `categoria` y `cantidad`.

---

### 💰 Cantidad de productos por rango de precio

**GET** `/productos/cantidad-por-rango-precio`

Devuelve la cantidad de productos agrupados por rangos de precio definidos.

#### Respuesta:

* Lista con `rango` y `cantidad`.

---

### 🔍 Obtener producto por ID

**GET** `/productos/{id}`

Devuelve los detalles de un producto por su ID.

#### Respuesta:

* Objeto del producto o error 404 si no existe.

---

### ➕ Crear nuevo producto

**POST** `/productos`

Crea un producto nuevo en el sistema. Requiere validación Zod, verificación de permisos y registro de historial.

#### Requiere:

* Token JWT válido.
* Objeto `ProductosDTO`.

#### Respuesta:

* `201 Created` con los datos del producto.
* `400 Bad Request` si hay errores de validación.
* `403 Forbidden` si no tiene permisos.

---

### ✏️ Actualizar producto

**PUT** `/productos/{id}`

Actualiza un producto específico. Solo es posible si el usuario es propietario o tiene permisos de edición altos (como `EDITOR` o `ADMIN`). También registra el historial de cambios y notifica cambios de stock, vencimiento o reposición.

#### Requiere:

* Token JWT válido.
* Objeto parcial de `ProductosDTO`.

#### Respuesta:

* `200 OK` con mensaje de éxito.
* `403 Forbidden` si no tiene permisos.
* `404 Not Found` si no existe.

---

### ❌ Eliminar producto

**DELETE** `/productos/{id}`

Elimina un producto del sistema. Antes de eliminar, registra el historial de eliminación.

#### Requiere:

* Token JWT válido.

#### Respuesta:

* Mensaje de confirmación o error.
* `403 Forbidden` si no tiene permisos.
* `404 Not Found` si el producto no existe.

---

## 🛠️ Notas técnicas

* El controlador utiliza `zod` para validar el schema del producto.
* Se generan registros automáticos en el historial de inventario (`histInv`).
* El controlador se apoya en servicios especializados para notificaciones:

  * `stockBajo.service.ts`
  * `reposicion.service.ts`
  * `productoVencido.service.ts`
* Los permisos se validan usando la utilidad `puede(accion, rol)`.
* Se utilizan middlewares como `autenticarToken` para proteger los endpoints.

---
