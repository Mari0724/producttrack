---
id: inventario-individual
title: Inventario Individual
sidebar_label: Inventario
---

La página `Inventario.tsx` gestiona el **inventario personal** del usuario tipo **"individual"**, permitiéndole **crear, editar, eliminar, buscar y filtrar productos**, así como agregar **notas personales** a cada uno.

Cuenta con una **interfaz interactiva y dinámica** que integra múltiples componentes modales, buscador en tiempo real, filtros por categoría y control sobre el backend.

---

## 🔍 Ubicación

`src/pages/individual/Inventario.tsx`

---

## 📦 Dependencias

* **React Hooks:** `useState`, `useEffect`
* **Componentes personalizados:**

  * `ProductCard`
  * `ProductModal`
  * `ConfirmDeleteModal`
  * `FloatingButton`
  * `ProductCommentsModal`
* **API personalizada:**

  * `getProductos`, `crearProducto`, `editarProducto`, `eliminarProducto`
  * `getCategorias`, `getProductosPorCategoria`
  * `enviarNotificacionReposicion`
* **Utilidades:**

  * `puedeNotificar` (para verificar preferencias de notificación)
  * `useToast` (para mostrar alertas al usuario)
* **Iconos:** `MagnifyingGlassIcon` de `@heroicons/react`

---

## ⚙️ Propiedades

> Este componente **no recibe props directamente**, ya que obtiene toda la información desde el estado y APIs internas.

---

## 🧠 Lógica Interna

### 📥 Estado

| Estado                  | Tipo              | Descripción                                                    |
| ----------------------- | ----------------- | -------------------------------------------------------------- |
| `products`              | `Product[]`       | Lista filtrada de productos del usuario individual             |
| `categorias`            | `string[]`        | Categorías disponibles para filtro                             |
| `categoriaSeleccionada` | `string`          | Categoría actualmente seleccionada                             |
| `searchTerm`            | `string`          | Texto del campo de búsqueda                                    |
| `showProductModal`      | `boolean`         | Controla si se muestra el modal de creación/edición            |
| `productToEdit`         | `Product \| null` | Producto que se está editando                                  |
| `productToDelete`       | `number \| null`  | ID del producto a eliminar                                     |
| `showConfirmModal`      | `boolean`         | Controla si se muestra el modal de confirmación de eliminación |
| `selectedProduct`       | `Product \| null` | Producto sobre el que se consultan notas personales            |
| `showCommentsModal`     | `boolean`         | Controla el modal de comentarios/notas                         |

---

### 🔁 `useEffect`

1. **Al iniciar:**

   * Se cargan todos los productos del usuario individual.
   * Se obtienen las categorías registradas para ese usuario.

2. **Cada que cambia la categoría:**

   * Se filtran los productos desde la API o en memoria.

---

### 📤 Funciones Clave

* **`fetchProductos()`**
  Carga productos desde la API y filtra por tipo de usuario (`INDIVIDUAL`).

* **`handleSaveProduct(product)`**
  Crea un nuevo producto, lo asigna al usuario, actualiza el estado y, si aplica, **envía una notificación automática**.

* **`handleEditProduct(product)`**
  Edita un producto existente mediante su ID.

* **`handleCategoriaChange(event)`**
  Filtra los productos por categoría seleccionada.

* **`handleConfirmDelete()`**
  Elimina el producto seleccionado y actualiza el listado.

* **`handleSearchChange(event)`**
  Actualiza el término de búsqueda en tiempo real.

* **`openEditModal(product)`**
  Abre el modal para editar un producto existente.

* **`openCommentsModal(product)`**
  Abre el modal de **notas personales** para productos individuales.

---

## 🧱 Estructura del Componente

1. **Encabezado y filtros**

   * Selector de categorías
   * Campo de búsqueda con ícono

2. **Listado de productos**

   * `ProductCard` para cada producto
   * Botón adicional de “Notas personales” para usuarios individuales

3. **Botón Flotante**

   * Abre el modal de nuevo producto

4. **Modales Condicionales**

   * `ProductModal`: crear/editar
   * `ConfirmDeleteModal`: confirmar eliminación
   * `ProductCommentsModal`: notas personales

---

## 🎨 Estilos y Diseño

* Basado en **Tailwind CSS**:

  * Diseño responsivo (`grid`, `sm`, `lg`)
  * Colores de marca (`#81203D`)
  * Sombras suaves y campos accesibles

* Interfaz clara y consistente para acciones CRUD

---

## 💡 Ejemplo de Uso

Este archivo representa una **página entera**, por lo que se usa directamente en el router asociado a `/individual/inventario`.

```tsx
<Route path="/individual/inventario" element={<Inventario />} />
```

---

## 📝 Notas Adicionales

* Este módulo está **optimizado para usuarios individuales**.
* Almacena el `tipoUsuario` desde `localStorage` para aplicar filtros.
* Incluye lógica para **notificaciones automáticas** al añadir productos (si el usuario lo permite).
* Su diseño desacoplado permite reutilizar varios componentes (`ProductModal`, `FloatingButton`, etc.) en otras vistas.