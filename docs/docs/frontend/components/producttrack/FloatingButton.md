---

id: floating-button
title: Botón Flotante para Agregar Producto
sidebar_label: FloatingButton

---

Este componente renderiza un **botón flotante** fijo en la esquina inferior derecha de la pantalla. Su propósito principal es **permitir al usuario agregar un nuevo producto** al inventario de forma rápida. Al hacer clic, ejecuta la función proporcionada a través de la prop `onAddProduct`.

---

## 🔍 Ubicación

`src/components/producttrack/FloatingButton.tsx`

---

#### 📦 **Dependencias**

* [`react-icons`](https://react-icons.github.io/react-icons/) – para el ícono de suma (`MdAdd`) proveniente de Material Design.

---

#### 🧩 **Props**

| Prop           | Tipo         | Requerido | Descripción                                                                                                                           |
| -------------- | ------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `onAddProduct` | `() => void` | No        | Función que se ejecuta al hacer clic en el botón flotante. Usualmente usada para abrir un modal o formulario de registro de producto. |

---

#### ⚙️ **Lógica Interna**

* El componente es una función de React (`React.FC`) que recibe una prop opcional `onAddProduct`.
* Renderiza un botón flotante en la esquina inferior derecha de la pantalla (`bottom-6 right-6`) con `position: fixed`.

---

#### 🗂️ **Estructuras de Datos**

No utiliza estructuras de datos complejas, solo props simples y el ícono importado.

---

#### 🎨 **Diseño Visual**

* **Estilo**: Redondo, color naranja (`bg-orange-400`), sombra (`shadow-lg`), animación al hacer hover (`scale-110`, `hover:shadow-xl`).
* **Ícono**: `MdAdd` con tamaño 24px.
* **Posición**: Fijo en la parte inferior derecha para mantener la visibilidad constante.

---

#### 🔧 **Ejemplo de Uso**

```tsx
import FloatingButton from "./components/producttrack/FloatingButton";

const InventoryPage = () => {
  const handleAdd = () => {
    // lógica para abrir modal de nuevo producto
  };

  return (
    <div>
      {/* contenido del inventario */}
      <FloatingButton onAddProduct={handleAdd} />
    </div>
  );
};
```

---

#### 📝 **Notas Adicionales**

* Este componente está pensado para usarse en interfaces donde se necesite una acción rápida y destacada, como agregar un nuevo producto.
* El botón es altamente personalizable gracias al uso de Tailwind CSS.