---
id: productos-api
title: API de Productos
sidebar_label: productos
---

Este archivo proporciona funciones para **gestionar productos y categorías** en el sistema, incluyendo creación, edición, eliminación, y consultas filtradas. Utiliza una instancia de Axios personalizada para comunicarse con el backend.

---

## 🔍 Ubicación

`src/api/productos.ts`

---

## 📦 Dependencias utilizadas

```ts
import type { Product } from '../types/Product';
import axiosInstance from '../utils/axiosInstance';
````

* **Product**: Tipo TypeScript que define la estructura de un producto.
* **axiosInstance**: Instancia personalizada de Axios con configuración global (baseURL, headers, etc.).

---

## 🔧 Funciones disponibles

### 🟢 `GET` - Obtener productos

#### 📦 `getProductos()`

Obtiene la lista completa de productos disponibles.

```ts
export const getProductos = () =>
  axiosInstance.get<Product[]>('/productos');
```

* **Retorna**: Arreglo de objetos tipo `Product`.

---

#### 🔍 `getProductoPorId(id: number)`

Obtiene los detalles de un producto por su ID.

```ts
export const getProductoPorId = (id: number) =>
  axiosInstance.get<Product>(`/productos/${id}`);
```

* **Parámetros**:

  * `id`: ID del producto.
* **Retorna**: Objeto `Product`.

---

#### 🧩 `getProductosPorCategoria(categoria: string)`

Obtiene todos los productos pertenecientes a una categoría específica.

```ts
export const getProductosPorCategoria = (categoria: string) =>
  axiosInstance.get<Product[]>(`/productos/por-categoria?categoria=${encodeURIComponent(categoria)}`);
```

* **Parámetros**:
  * `categoria`: Nombre de la categoría (string).
* **Retorna**: Arreglo de productos filtrados.

---

### 🟠 `POST` - Crear productos

#### ➕ `crearProducto(data: Product)`

Crea un nuevo producto en la base de datos.

```ts
export const crearProducto = (data: Product) =>
  axiosInstance.post<Product>('/productos', data);
```

* **Parámetros**:

  * `data`: Objeto completo de tipo `Product`.
* **Retorna**: Objeto del producto creado.

---

### 🟡 `PUT` - Editar productos

#### ✏️ `editarProducto(id, data)`

Edita un producto existente, permitiendo actualizar campos de forma parcial.

```ts
export const editarProducto = (id: number, data: Partial<Product>) =>
  axiosInstance.put(`/productos/${id}`, data);
```

* **Parámetros**:

  * `id`: ID del producto.
  * `data`: Objeto parcial con campos de `Product`.
* **Retorna**: Producto actualizado.

---

### 🔴 `DELETE` - Eliminar productos

#### 🗑️ `eliminarProducto(id: number)`

Elimina un producto por su ID.

```ts
export const eliminarProducto = (id: number) =>
  axiosInstance.delete(`/productos/${id}`);
```

* **Parámetros**:

  * `id`: ID del producto.
* **Retorna**: Confirmación de eliminación.

---

## 📚 Funciones de categoría

### 🧷 `getCategorias(tipoUsuario: string)`

Obtiene la lista de categorías disponibles según el tipo de usuario.

```ts
export const getCategorias = (tipoUsuario: string) =>
  axiosInstance.get<string[]>(`/productos/categorias?tipoUsuario=${tipoUsuario}`);
```

* **Parámetros**:

  * `tipoUsuario`: Rol o tipo del usuario (ej: `"administrador"`, `"vendedor"`).
* **Retorna**: Arreglo de strings con los nombres de las categorías disponibles.

---

## 🚀 Ejemplo de uso

```ts
import {
  getProductos,
  crearProducto,
  editarProducto,
  eliminarProducto,
  getCategorias,
  getProductosPorCategoria,
  getProductoPorId
} from "../api/productos";

const productos = await getProductos();

const nuevoProducto = await crearProducto({
  nombre: "Yogurt Natural",
  precio: 2.500,
  stock: 100,
  categoria: "Lácteos",
});

await editarProducto(nuevoProducto.id, { precio: 2.750 });

await eliminarProducto(nuevoProducto.id);

const categorias = await getCategorias("administrador");

const lacteos = await getProductosPorCategoria("Lácteos");
```

---

## 📝 Notas adicionales

* Este módulo centraliza toda la lógica de interacción con el backend relacionada con productos y categorías.
* La estructura de `Product` se define en el archivo `types/Product.ts`.
* Las funciones están organizadas por tipo de operación (`GET`, `POST`, `PUT`, `DELETE`) y se manejan con rutas RESTful.