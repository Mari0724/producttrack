---
id: productos-service
title: Servicios de Productos
sidebar_label: Servicios de Productos
---

# Servicios de Productos

Este módulo contiene funciones para gestionar productos en la base de datos, incluyendo filtros avanzados, creación, actualización con Cloudinary, eliminación lógica, y análisis como cantidad por categoría o rangos de precio. Utiliza Prisma como ORM y Cloudinary para la gestión de imágenes.

---

## 🔍 Ubicación

`src/services/Productos.service.ts`

---

## 🔎 Función: getAllProductos

```ts
export const getAllProductos = async (filters: any)
```

---

#### ✅ Propósito:

Obtiene todos los productos que cumplen con los filtros opcionales (ID, nombre, categoría, estado, usuarioId y rangos de fechas).

---

## 🔎 Función: getProductoById

```ts
export async function getProductoById(id: number)
```

#### ✅ Propósito:

Devuelve un producto específico según su ID.

---

## 📦 Función: getCategoriasUnicas
```ts
export async function getCategoriasUnicas(): Promise<string[]>
```
#### ✅ Propósito:

Obtiene todas las categorías únicas que han sido asignadas a productos.

---

## 📊 Función: getCantidadPorCategoria
```ts
export async function getCantidadPorCategoria()
```

#### ✅ Propósito:

Cuenta cuántos productos hay en cada categoría, excluyendo los eliminados.

---

## 📁 Función: getProductosPorCategoria

```ts
export async function getProductosPorCategoria(categoria: string)
```

#### ✅ Propósito:

Obtiene todos los productos que pertenecen a una categoría específica.

---

## 💰 Función: getCantidadPorRangoPrecio

```ts
export async function getCantidadPorRangoPrecio()
```

#### ✅ Propósito:
Clasifica los productos según el rango de precios y devuelve la cantidad de productos en cada rango.

---

## ☁️ Función: subirImagenCloudinary

```ts
export const subirImagenCloudinary = async (imagenBase64: string): Promise<string>
```

#### ✅ Propósito:

Sube una imagen codificada en base64 a Cloudinary y devuelve su URL segura.

---

## 🆕 Función: createProducto

```ts
export async function createProducto(data: ProductosDTO)
```

#### ✅ Propósito:
Crea un nuevo producto con los datos proporcionados, convirtiendo tipos donde sea necesario (precio, fechas, etc.).

---

## ✏️ Función: updateProducto

```ts
export async function updateProducto(id: number, data: Partial<ProductosDTO>)
```

#### ✅ Propósito:

Actualiza un producto existente. Si se proporciona una nueva imagen, elimina la anterior de Cloudinary antes de subir la nueva.

---

## ❌ Función: deleteProducto

```ts
export async function deleteProducto(id: number)
```

#### ✅ Propósito:
Realiza una eliminación lógica del producto, marcando su campo eliminadoEn con la fecha actual.

---