---
id: productos-service
title: Servicio de Productos
sidebar_label: Productos
---

Este servicio gestiona todas las operaciones relacionadas con productos: creación, actualización, eliminación, búsqueda, categorización, estadísticas y gestión de imágenes.

---

## 🔍  Ubicación

`src/services/productos.service.ts`

---

## 📦 Dependencias

```ts
import prisma from '../utils/prismaClient';
import { ProductosDTO } from '../models/ProductosDTO';
import { EstadoProducto, TipoUsuario } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';
````

* **`prisma`** → Cliente para interactuar con la base de datos.
* **`ProductosDTO`** → Definición del DTO para productos.
* **`EstadoProducto`** y **`TipoUsuario`** → Tipos de Prisma.
* **`cloudinary`** → Servicio de almacenamiento de imágenes.

---

## 🔄 Funciones

### 1️⃣ `getAllProductos(filters)`

Obtiene la lista de productos aplicando múltiples filtros opcionales:

* `productoId`, `nombre`, `categoria`, `estado`, `usuarioId`
* Rango de `fechaAdquisicion` y `fechaVencimiento`
* Por defecto excluye productos con estado `"ELIMINADO"`

---

### 2️⃣ `getProductoById(id)`

Obtiene un producto específico por su ID.

---

### 3️⃣ `getCategoriasUnicas(tipoUsuario)`

Devuelve las categorías únicas de productos según el tipo de usuario (`INDIVIDUAL` o `EMPRESARIAL`).

---

### 4️⃣ `getCantidadPorCategoria()`

Agrupa productos por categoría y devuelve la cantidad de productos en cada una.

---

### 5️⃣ `getProductosPorCategoria(categoria)`

Devuelve los productos que pertenecen a una categoría específica (búsqueda insensible a mayúsculas/minúsculas).

---

### 6️⃣ `obtenerNombresProductosUsuario(idUsuario)`

Devuelve un arreglo con los nombres de todos los productos activos de un usuario.

---

### 7️⃣ `getCantidadPorRangoPrecio()`

Clasifica y cuenta los productos en rangos de precio:

* Menos de 50 mil
* 50 mil – 100 mil
* 100 mil – 200 mil
* Más de 200 mil

---

### 8️⃣ `subirImagenCloudinary(imagenBase64)`

Sube una imagen codificada en base64 a Cloudinary y devuelve la URL segura.

---

### 9️⃣ `createProducto(data: ProductosDTO)`

Crea un nuevo producto:

* Convierte fechas a formato `Date`
* Crea recordatorio de stock mínimo según tipo de usuario:

  * **INDIVIDUAL** → `cantidadMinima = 2`
  * **EMPRESARIAL** → `cantidadMinima = 30`

---

### 🔟 `updateProducto(id, data)`

Actualiza un producto:

* Si la imagen cambia, reemplaza la anterior en Cloudinary.
* Actualiza solo los campos enviados.
* Registra `updatedAt`.

---

### 1️⃣1️⃣ `obtenerProductoPorId(id)`

Obtiene un producto incluyendo su información de usuario (útil para validaciones).

---

### 1️⃣2️⃣ `deleteProducto(id)`

Elimina lógicamente un producto:

* Borra su imagen en Cloudinary si existe.
* Cambia su `estado` a `"ELIMINADO"` y registra `eliminadoEn`.

---

## 📂 Tablas relacionadas

* **`productos`**

  * `id`, `nombre`, `descripcion`, `precio`, `cantidad`, `fechaAdquisicion`, `fechaVencimiento`, `usuarioId`, `estado`, `imagen`, `categoria`, `codigoBarras`, `codigoQR`, `eliminadoEn`
* **`users`**

  * `idUsuario`, `tipoUsuario`, `empresaId`
* **`recorStock`**

  * `productoId`, `cantidadMinima`, `estado`, `fechaRecordatorio`

---

## 💡 Ejemplo de uso

```ts
// Obtener productos filtrados por nombre y estado
const productos = await getAllProductos({
  nombre: "laptop",
  estado: "DISPONIBLE"
});

// Crear un producto nuevo
const nuevo = await createProducto({
  nombre: "Monitor 24''",
  descripcion: "Full HD IPS",
  cantidad: 10,
  precio: 350000,
  fechaAdquisicion: "2025-08-01",
  fechaVencimiento: "2026-08-01",
  usuarioId: 7,
  estado: "DISPONIBLE",
  categoria: "Electrónica",
  imagen: "data:image/png;base64,..."
});
```

---

📌 **Notas**:

* Todas las funciones que interactúan con la base de datos son asíncronas.
* Las imágenes se manejan exclusivamente mediante **Cloudinary**.
* Las eliminaciones son **lógicas** para mantener el historial y trazabilidad.

---