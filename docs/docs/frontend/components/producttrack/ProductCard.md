---

id: product-card
title: Tarjeta de Producto
sidebar_label: ProductCard

---

El componente `ProductCard` muestra una **tarjeta visual** de un producto del inventario, incluyendo su nombre, categoría, stock, fecha de vencimiento, imagen y botones de acción según el **rol del usuario**. También permite **ver y gestionar notas** mediante modales personalizados para usuarios individuales o empresariales.

---

## 🔍 Ubicación

`src/components/producttrack/ProductCard.tsx`

---

## 📦 Dependencias

* **React:** `useState`
* **Íconos de `lucide-react`:**

  * `BadgeCheck` → Categoría
  * `CalendarDays` → Fecha de vencimiento
* **Componentes internos:**

  * `ProductActions`
  * `CommentsModal` (notas para usuarios `INDIVIDUAL`)
  * `CompanyCommentsModal` (notas para usuarios `EMPRESARIAL`)

---

## ⚙️ Propiedades

| Propiedad  | Tipo         | Requerido | Descripción                                                                                                      |
| ---------- | ------------ | --------- | ---------------------------------------------------------------------------------------------------------------- |
| `product`  | `Product`    | ✔️ Sí     | Objeto con los datos del producto a renderizar.                                                                  |
| `onEdit`   | `() => void` | No        | Función que se ejecuta al hacer clic en "Editar".                                                                |
| `onDelete` | `() => void` | No        | Función que se ejecuta al hacer clic en "Eliminar".                                                              |
| `onView`   | `() => void` | No        | Función personalizada al hacer clic en "Ver notas/detalles". Si no se proporciona, se abre un modal por defecto. |
| `rol`      | `string`     | No        | Rol del usuario: `EDITOR`, `COMENTARISTA`, etc.                                                                  |

---

## 🧠 Lógica Interna

### 📥 Estado

| Estado              | Tipo      | Descripción                                               |
| ------------------- | --------- | --------------------------------------------------------- |
| `showDetails`       | `boolean` | Muestra u oculta la información detallada del producto.   |
| `showCommentsModal` | `boolean` | Controla si se abre el modal de comentarios del producto. |

### 🧪 Evaluaciones

* Se determina el `tipoUsuario` a partir del objeto `usuario` del producto:

  ```tsx
  const tipoUsuario = (usuario?.tipoUsuario || 'INDIVIDUAL').toUpperCase();
  ```

* Se evalúa si el producto tiene **stock bajo**:

  ```tsx
  const isLowStock = tipoUsuario === 'EMPRESARIAL' ? cantidad <= 30 : cantidad <= 1;
  ```

* Se asigna un estilo de color al stock dependiendo de si está bajo:

  ```tsx
  const getStockStyle = () => {
    return isLowStock
      ? 'bg-red-100 text-red-700 border border-red-300'
      : 'bg-green-100 text-green-700 border border-green-300';
  };
  ```

### 🔁 `handleView`

Función auxiliar para abrir el modal de comentarios en caso de no pasar un `onView` externo.

---

## 🧱 Estructura del Componente

1. **Contenedor Principal:**

   * Tarjeta con borde, sombra y diseño responsive
   * Imagen destacada (si existe)
   * Nombre del producto (click para expandir detalles)

2. **Detalles (condicional):**

   * Categoría
   * Stock (con semáforo visual)
   * Fecha de vencimiento
   * Acciones disponibles (`ProductActions`) si el usuario tiene permisos

3. **Modal (condicional):**

   * `CommentsModal` o `CompanyCommentsModal` según el tipo de usuario

---

## 🎨 Estilos y Diseño

* Usa **Tailwind CSS** para diseño moderno y responsivo.
* Efecto hover con `hover:shadow-xl` y transición animada.
* Colores personalizados según branding:

  | Elemento         | Clase Tailwind                                 |
  | ---------------- | ---------------------------------------------- |
  | Fondo Tarjeta    | `bg-[#FFF5F7]`                                 |
  | Título Producto  | `text-[#81203D]` con `hover:underline`         |
  | Stock Bajo       | `bg-red-100 text-red-700 border-red-300`       |
  | Stock Suficiente | `bg-green-100 text-green-700 border-green-300` |

---

## 💡 Ejemplo de Uso

```tsx
import ProductCard from './ProductCard';

<ProductCard
  product={producto}
  onEdit={() => console.log('Editar producto')}
  onDelete={() => console.log('Eliminar producto')}
  onView={() => console.log('Ver detalles')}
  rol="EDITOR"
/>
```

---

## 📝 Notas Adicionales

* El componente es completamente **modular** y puede integrarse fácilmente en dashboards.
* Muestra distintos botones y estilos dinámicamente según el **rol y tipo de usuario**.
* No se conecta directamente a una API; espera propiedades externas para manejo de eventos.
* Muestra los modales de comentarios según si el usuario es **INDIVIDUAL** o **EMPRESARIAL**.