---

id: product-modal
title: Modal de Producto
sidebar_label: ProductModal

---

El componente `ProductModal` muestra un **formulario modal** para agregar o editar productos del inventario. Incluye campos como nombre, descripción, precio, fechas, estado y una imagen opcional. El formulario se completa automáticamente si se proporcionan datos iniciales para editar.

---

## 🔍 Ubicación

`src/components/producttrack/ProductModal.tsx`

---

## 📦 Dependencias

* **React:** `useState`, `useEffect`, `createPortal`
* **Íconos:**

  * `AiOutlineClose` de `react-icons/ai` para cerrar el modal
* **Contexto:**

  * `useUser` para obtener el usuario actual
* **Hooks personalizados:**

  * `useToast` para mostrar mensajes de error o éxito
* **Servicios externos:**

  * `Cloudinary` para subir imágenes
* **Tipos:**

  * `Product` desde `../../types/Product`

---

## ⚙️ Propiedades

| Propiedad     | Tipo                         | Requerido | Descripción                                                                 |
| ------------- | ---------------------------- | --------- | --------------------------------------------------------------------------- |
| `isOpen`      | `boolean`                    | ✔️ Sí     | Controla si el modal se muestra o no.                                       |
| `onClose`     | `() => void`                 | ✔️ Sí     | Función que se ejecuta al cerrar el modal.                                  |
| `onSave`      | `(product: Product) => void` | ✔️ Sí     | Función que se ejecuta al guardar el producto (nuevo o editado).            |
| `initialData` | `Product`                    | No        | Datos del producto para edición. Si se proporciona, se rellenan los campos. |

---

## 🧠 Lógica Interna

### 📥 Estado

| Estado      | Tipo      | Descripción                                          |
| ----------- | --------- | ---------------------------------------------------- |
| `form`      | `Product` | Objeto que contiene todos los campos del formulario. |
| `uploading` | `boolean` | Indica si se está subiendo una imagen a Cloudinary.  |

### 📤 Funciones

* `handleChange`:
  Maneja los cambios en los campos del formulario.

* `handleImageUpload`:
  Verifica y sube una imagen al servicio de Cloudinary, y actualiza el campo `imagen`.

* `handleSubmit`:
  Valida los campos requeridos, normaliza los datos y ejecuta `onSave`.

* `useEffect`:

  * Carga los datos iniciales si existen (`initialData`).
  * Establece el `usuarioId` del producto con base en el contexto.
  * Controla el `overflow` del body mientras el modal está abierto.

---

## 🧱 Estructura del Componente

1. **Portaled Modal:**

   Se renderiza en `#modal-root` usando `createPortal`.

2. **Contenedor Principal:**

   * Fondo oscuro (`bg-black bg-opacity-40`)
   * Tarjeta blanca (`bg-white p-6 rounded-2xl`)
   * Botón de cerrar (`AiOutlineClose`)

3. **Formulario:**

   Campos con componentes `InputField`, que soportan:

   * Inputs comunes (`text`, `number`, `date`)
   * TextArea para descripción
   * Select para el estado (`DISPONIBLE`, `AGOTADO`)
   * Input para carga de imagen

4. **Previsualización de Imagen:**

   * Si se está subiendo: muestra mensaje de carga
   * Si existe imagen: muestra miniatura
   * Si no hay imagen: muestra fondo gris con mensaje

5. **Botones de Acción:**

   * `Cancelar`: llama `onClose`
   * `Guardar`: valida campos y llama `onSave`

---

## 🎨 Estilos y Diseño

* Usa **Tailwind CSS** con diseño responsivo.
* Modal centrado con desplazamiento (`overflow-auto`)
* Color corporativo `[#81203D]` en botones y títulos
* Estados del formulario visualmente consistentes
* Botón de cerrar con `hover:text-[#81203D]`
* Transiciones suaves al abrir y cerrar

---

## 💡 Ejemplo de Uso

```tsx
import ProductModal from './ProductModal';

<ProductModal
  isOpen={modalAbierto}
  onClose={() => setModalAbierto(false)}
  onSave={(producto) => console.log('Guardar:', producto)}
  initialData={productoSeleccionado}
/>
```

---

## 📝 Notas Adicionales

* **Modular y reutilizable:** Puede usarse tanto para **crear** como para **editar** productos.
* **Validación básica:** Asegura que campos requeridos estén completos antes de guardar.
* **Carga de imágenes:** Se realiza directamente a través de Cloudinary.
* **Responsivo y accesible:** Pensado para funcionar en distintas resoluciones.