---
id: food-analyzer-nutriscan
title: Analizador de Alimentos NutriScan
sidebar_label: FoodAnalyzer
---

Este componente React permite analizar alimentos a partir de imágenes utilizando inteligencia artificial. Se comunica con funciones asincrónicas para realizar análisis nutricionales automáticos o búsquedas manuales cuando es necesario.

---

## 🔍 Ubicación

`src/components/nutriscan/FoodAnalyzer.tsx`

---

## 📦 Dependencias utilizadas

```ts
import { useState } from 'react';
import ImageUpload from './ImageUpload';
import ProcessingState from './ProcessingState';
import NutritionCard from './NutritionCard';
import ManualSearch from './ManualSearch';
import { ShoppingBasket, Search, RotateCcw, ImagePlus } from 'lucide-react';
```

* **React**: Manejo de estado con `useState`.
* **Componentes personalizados**: `ImageUpload`, `ProcessingState`, `NutritionCard`, `ManualSearch`.
* **lucide-react**: Íconos SVG reutilizables como `Search`, `ImagePlus`, etc.

---

## 🧩 Propiedades del componente

```ts
interface FoodAnalyzerProps {
  analizarImagen: (base64: string, token: string, nombreManual?: string) => Promise<RespuestaNutriScan>;
  confirmarConsulta?: (id: number, nombreConfirmado: string, token: string) => Promise<RespuestaNutriScan>;
}
```

| Propiedad           | Tipo                                                                        | Descripción                                                                      |
| ------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `analizarImagen`    | `(base64, token, nombreManual?) => Promise<RespuestaNutriScan>`             | Función para analizar la imagen con IA.                                          |
| `confirmarConsulta` | `(id, nombreConfirmado, token) => Promise<RespuestaNutriScan>` *(opcional)* | Función para confirmar una sugerencia del sistema si requiere validación manual. |

---

## 🧠 Lógica interna

### 📷 Selección de imagen

```ts
const handleImageSelect = (imageUrl: string) => {
  setSelectedImage(imageUrl);
  setNutritionData(null);
  setHasError(false);
};
```

* Limpia el estado anterior y guarda la imagen seleccionada para análisis.

### ⚙️ Análisis automático

```ts
const handleAnalyzeImage = async () => {
  const token = localStorage.getItem("token");
  const result = await analizarImagen(selectedImage, token);
  ...
};
```

* Utiliza el token del usuario desde `localStorage`.
* Llama a `analizarImagen` para obtener el resultado del backend.
* Si se requiere confirmación, activa el flujo de búsqueda manual.
* Si no, muestra la información nutricional recibida en una tarjeta.

### 🔍 Búsqueda manual

```ts
const handleManualSearch = async (productName: string) => {
  const result = await confirmarConsulta(lastRegistroId, productName, token);
  ...
};
```

* Ejecutada cuando la IA requiere confirmación del usuario.
* Envía el nombre del producto elegido manualmente al backend.
* Muestra la respuesta recibida como nutrición válida.

### 🔄 Reset de estado

```ts
const handleReset = () => {
  setSelectedImage(null);
  setNutritionData(null);
  ...
};
```

* Limpia todos los estados y permite al usuario comenzar un nuevo análisis.

---

## 💬 Estructura de datos

### `NutritionData`

```ts
interface NutritionData {
  food: string;
  calories?: number;
  nutritionInfo: string;
}
```

### `RespuestaNutriScan`

```ts
interface RespuestaNutriScan {
  mensajeGPT: string;
  requiereConfirmacion: boolean;
  sugerencia?: string;
  registro: {
    id: number;
    consulta: string;
  };
}
```

---

## 🎨 Diseño y estructura visual

* Interfaz amigable con fondo degradado.
* Imagen del alimento cargada al centro.
* Botones estilizados con íconos para analizar y reiniciar.
* Vista condicional según el estado:

  * Componente `ImageUpload` si aún no hay imagen.
  * Componente `ProcessingState` mientras analiza.
  * Componente `ManualSearch` si se requiere validación.
  * Componente `NutritionCard` al mostrar resultados.

---

## 💡 Ejemplo de uso

```tsx
<FoodAnalyzer
  analizarImagen={analizarImagenFn}
  confirmarConsulta={confirmarConsultaFn}
/>
```

* `analizarImagenFn`: función definida que conecta con la API backend.
* `confirmarConsultaFn`: función opcional para la validación de alimentos no reconocidos.

---

## 📝 Notas adicionales

* Usa `localStorage` para recuperar el token de autenticación del usuario.
* El análisis puede requerir confirmación manual en casos ambiguos.
* El estado se maneja con `useState` de forma granular (imagen, error, procesamiento, etc.).
* El flujo es progresivo: subir → analizar → mostrar o confirmar → mostrar.
* La estructura es totalmente reactiva y fluida para el usuario final.