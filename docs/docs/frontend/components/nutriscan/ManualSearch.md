---

id: manual-search
title: Búsqueda Manual de Producto
sidebar_label: ManualSearch
---

Este componente React permite **ingresar manualmente el nombre de un producto** cuando el escaneo visual no logra detectar información válida. Presenta un mensaje de error amigable, un campo de búsqueda manual y botones de acción para intentar nuevamente o consultar la información nutricional.

---

## 🔍 Ubicación

`src/components/nutriscan/ManualSearch.tsx`

---

## 📦 Dependencias utilizadas

```ts
import React, { useState } from 'react';
import { Search, RotateCcw, Lightbulb, Frown } from 'lucide-react';
```

* **React**: Para gestionar el estado del input y manejar el formulario.
* **lucide-react**: Para íconos ilustrativos: búsqueda (`Search`), reinicio (`RotateCcw`), ayuda (`Lightbulb`), error (`Frown`).

---

## 🧩 Propiedades del componente

```ts
interface ManualSearchProps {
  onSearch: (productName: string) => void;
  onReset: () => void;
}
```

| Propiedad  | Tipo                            | Descripción                                                              |
| ---------- | ------------------------------- | ------------------------------------------------------------------------ |
| `onSearch` | `(productName: string) => void` | Callback que se ejecuta con el nombre ingresado para buscar información. |
| `onReset`  | `() => void`                    | Callback que reinicia el flujo, permitiendo subir otra imagen.           |

---

## 🧠 Lógica interna

### 📝 Ingreso de nombre manual

```ts
const [productName, setProductName] = useState('');
```

* Se almacena el valor del campo de texto con el nombre del producto.

### 📤 Envío del formulario

```ts
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (productName.trim()) {
    onSearch(productName.trim());
  }
};
```

* Valida que el campo no esté vacío.
* Llama a `onSearch()` con el valor ingresado por el usuario.

---

## 🎨 Diseño y estructura visual

* **Encabezado amigable** con ícono de error (`Frown`) que indica que no se detectó el producto.
* **Campo de entrada** de texto para escribir manualmente el nombre.
* **Botones de acción**:

  * **Intentar con otra imagen** (amarillo): llama a `onReset()`.
  * **Buscar información nutricional** (verde): llama a `onSearch()` si hay texto.
* **Consejo visual** con ícono (`Lightbulb`) sobre cómo mejorar la toma de imágenes.

---

## 💡 Ejemplo de uso

```tsx
<ManualSearch
  onSearch={(nombre) => {
    buscarProductoPorNombre(nombre);
  }}
  onReset={() => {
    setStep('inicio');
  }}
/>
```

* Permite al usuario ingresar el nombre de un producto si el escaneo falló.
* Se reinicia el proceso o se consulta la información manualmente.

---

## 📝 Notas adicionales

* El botón de búsqueda se desactiva si el input está vacío o con solo espacios.
* Ideal como paso alternativo cuando falla el OCR de una imagen cargada.
* El diseño es responsive, adaptándose a diferentes tamaños de pantalla.
* Mejora la accesibilidad y experiencia del usuario en casos de error.