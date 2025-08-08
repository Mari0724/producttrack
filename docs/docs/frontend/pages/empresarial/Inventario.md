---
id: inventario-empresarial
title: Gestión de Inventario (Vista Empresarial)
sidebar_label: Inventario
---

Este componente representa la **interfaz principal de gestión de inventario** para usuarios empresariales. Permite visualizar, crear, editar, eliminar y filtrar productos por categoría o nombre, integrando múltiples funcionalidades relacionadas con el flujo de inventario y notificaciones.

---

## 🔍 Ubicación

`src/pages/empresarial/Inventario.tsx`

---

## 📦 Dependencias

- **Componentes internos:**
  - `ProductCard` – Muestra información detallada del producto.
  - `FloatingButton` – Botón flotante para añadir productos.
  - `ProductModal` – Modal para crear o editar productos.
  - `ConfirmDeleteModal` – Modal de confirmación de eliminación.
  - `EnterpriseCommentsModal` – Modal para visualizar comentarios empresariales.

- **Tipos y APIs:**
  - `Product` – Interfaz que define la estructura del producto.
  - Funciones de la API: `getProductos`, `getProductoPorId`, `crearProducto`, `editarProducto`, `eliminarProducto`, `getCategorias`, `getProductosPorCategoria`, `enviarNotificacionReposicion`.
  - `useToast` – Hook personalizado para mostrar notificaciones.
  - `puedeNotificar` – Utilidad para controlar si se deben mostrar ciertas notificaciones.

- **Iconos:**
  - `MagnifyingGlassIcon` – Ícono de búsqueda.

---

## 🧩 Props

Este componente **no recibe props directamente**, ya que actúa como una **página principal** para los usuarios empresariales autenticados.

---

## ⚙️ Lógica interna

1. **Estado:**
   - `products`: lista de productos visibles.
   - `categorias`: categorías disponibles para filtrar.
   - `searchTerm`: texto del input de búsqueda.
   - `categoriaSeleccionada`: filtro aplicado por categoría.
   - `productToEdit`: producto actual en modo edición.
   - `productToDelete`: ID del producto seleccionado para eliminar.
   - `showProductModal`, `showConfirmModal`, `showCommentsModal`: control de visibilidad de modales.

2. **Efectos:**
   - Al montar el componente, se cargan productos y categorías (`useEffect`).

3. **Funciones principales:**
   - `fetchProductos`: obtiene y filtra productos del backend.
   - `fetchCategorias`: trae las categorías disponibles.
   - `handleSaveProduct`: crea un nuevo producto y muestra notificaciones.
   - `handleEditProduct`: actualiza un producto existente.
   - `handleAskDelete`, `handleConfirmDelete`: controlan el flujo de eliminación.
   - `handleCategoriaChange`: filtra los productos por categoría.
   - `handleSearchChange`: actualiza el término de búsqueda.

4. **Notificaciones inteligentes:**
   - Se emiten alertas si el **stock es bajo** al agregar un producto.
   - Se envía una **notificación de reposición** si corresponde.

---

## 🧱 Estructuras de datos

```ts
type Product = {
  id?: number;
  nombre: string;
  categoria: string;
  cantidad: number;
  usuarioId?: number;
  usuario?: {
    tipoUsuario?: string;
  };
  // Otros campos según modelo
};
````

---

## 🎨 Diseño visual

* Disposición con padding (`main px-4 sm:px-0`).
* Encabezado destacado (`Inventario de Productos`) en color corporativo (`text-[#81203D]`).
* Filtro de categoría y búsqueda en una cuadrícula responsiva.
* Productos presentados en tarjetas (`ProductCard`) dentro de un `grid`.
* Botón flotante visible solo para usuarios con rol `EDITOR`.
* Uso de modales contextuales para crear, editar y eliminar productos.

---

## 💡 Ejemplo de uso

Este componente se renderiza directamente como una **ruta protegida**:

```
/empresarial/inventario
```

Idealmente, se accede luego de que un usuario empresarial haya iniciado sesión correctamente.

---

## 📝 Notas adicionales

* El componente asume que existen valores en `localStorage` como:

  * `"userId"` – para asociar nuevos productos al usuario.
  * `"rolEquipo"` o `"rol"` – para habilitar edición/eliminación.
  * `"tipoUsuario"` – para filtrar los productos correctos.

* Se podría mejorar incorporando:

  * **Paginación o scroll infinito**.
  * **Indicadores de carga** mientras se cargan los productos.
  * **Validaciones adicionales** antes de crear o editar productos.
  * **Manejo de errores global más robusto** para evitar duplicación de lógica.
