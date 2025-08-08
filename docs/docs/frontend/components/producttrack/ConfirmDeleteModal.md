---

id: confirm-delete-modal
title: Modal de Confirmación de Eliminación
sidebar_label: ConfirmDeleteModal
---

Este componente muestra un **modal de confirmación** cuando el usuario intenta eliminar un producto. Brinda una interfaz clara y sencilla para **aceptar o cancelar** la eliminación, destacando que la acción es irreversible.

---

## 🔍 Ubicación

`src/components/producttrack/ConfirmDeleteModal.tsx`

---

## 📦 Dependencias utilizadas

```ts
import React from 'react';
```

* **React**: El componente se declara como un componente funcional de React usando `React.FC`.

---

## 🧩 Propiedades del componente

```ts
interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}
```

| Propiedad     | Tipo         | Descripción                                                  |
| ------------- | ------------ | ------------------------------------------------------------ |
| `isOpen`      | `boolean`    | Controla si el modal debe mostrarse o no.                    |
| `onClose`     | `() => void` | Función que se ejecuta al hacer clic en "Cancelar".          |
| `onConfirm`   | `() => void` | Función que se ejecuta al confirmar la eliminación.          |
| `productName` | `string`     | Nombre del producto que se mostrará en el mensaje del modal. |

> 📌 Si `isOpen` es `false`, el componente **no se renderiza** (retorna `null`).

---

## 🎨 Diseño y comportamiento

El modal se presenta centrado en la pantalla con un fondo semi-transparente para enfocar la atención del usuario.

### 🧾 Contenido del modal

* **Título**: `"¿Eliminar producto?"` en color vino (`#81203D`).
* **Mensaje**: Pregunta al usuario si está seguro de eliminar el producto, incluyendo su nombre en negrita.
* **Botones de acción**:

  * `Cancelar`: Cierra el modal sin realizar ninguna acción.
  * `Sí, eliminar`: Ejecuta la función `onConfirm`.

> ⚠️ El diseño incluye clases de utilidad para estilos responsivos, colores personalizados y sombra (`shadow-xl`).

---

## 💡 Ejemplo de uso

```tsx
import ConfirmDeleteModal from "@/components/producttrack/ConfirmDeleteModal";

function ProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    // Lógica para eliminar el producto
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Eliminar producto</button>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        productName="Manzana verde"
      />
    </>
  );
}
```

---

## 📝 Notas adicionales

* Su diseño minimalista y colores claros hacen que se integre bien con el resto del sistema.
* Puedes reutilizarlo para confirmar la eliminación de cualquier tipo de ítem, no solo productos, cambiando el texto si es necesario.