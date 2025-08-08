---

id: image-upload
title: Componente de Subida de Imagen
sidebar_label: ImageUpload
---

Este componente React permite **subir o capturar una imagen** desde el dispositivo del usuario (galería o cámara), redimensionarla y enviarla al componente padre como un string en formato base64. Se utiliza en el flujo de escaneo visual de productos en NutriScan.

---

## 🔍 Ubicación

`src/components/nutriscan/ImageUpload.tsx`

---

## 📦 Dependencias utilizadas

```ts
import React, { useRef } from 'react';
import { Camera, Upload, ImagePlus, Image, Ruler } from 'lucide-react';
import { resizeImage } from '../../utils/resizeImage';
```

* **React**: Para referencias (`useRef`) y estructura funcional del componente.
* **lucide-react**: Para íconos visuales como cámara, regla y carga de imagen.
* **resizeImage**: Función personalizada para redimensionar la imagen antes de enviarla.

---

## 🧩 Propiedades del componente

```ts
interface ImageUploadProps {
  onImageSelect: (imageUrl: string) => void;
}
```

| Propiedad       | Tipo                         | Descripción                                                                 |
| --------------- | ---------------------------- | --------------------------------------------------------------------------- |
| `onImageSelect` | `(imageUrl: string) => void` | Callback que se dispara con la imagen en formato base64 tras ser procesada. |

---

## 🧠 Lógica interna

### 📸 Captura o selección de imagen

El componente ofrece dos métodos para subir imágenes:

1. **Captura desde cámara** (dispositivos móviles compatibles).
2. **Selección desde galería o sistema de archivos**.

Ambos métodos utilizan inputs tipo `file` ocultos, controlados por botones personalizados.

```ts
const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const resizedBase64 = await resizeImage(file, 800);
    onImageSelect(resizedBase64);
  }
};
```

* Se selecciona una imagen desde input.
* Se redimensiona a un ancho máximo de 800px.
* Se envía como string base64 al padre mediante `onImageSelect`.

---

## 🎨 Diseño y estructura visual

* **Caja contenedora** con bordes redondeados y sombra (`shadow-lg`).
* Título y subtítulo centrado.
* Dos botones grandes:

  * **Tomar Foto** (amarillo): Dispara la cámara del dispositivo.
  * **Subir Foto** (verde oliva): Abre la galería o explorador de archivos.
* Sección inferior con información de formatos y tamaño máximo soportado.
* Todos los textos están estilizados con fuentes amigables (`font-poppins`).

---

## 💡 Ejemplo de uso

```tsx
<ImageUpload
  onImageSelect={(base64Img) => {
    setSelectedImage(base64Img);
  }}
/>
```

* Este ejemplo permite a un componente padre guardar la imagen seleccionada/redimensionada.
* Útil en flujos de escaneo de etiquetas, análisis nutricional o carga de productos.

---

## 📝 Notas adicionales

* El componente no hace validaciones específicas de tipo o tamaño de imagen, pero muestra advertencias visuales.
* La redimensión de la imagen evita cargas innecesarias de archivos pesados.
* `capture="environment"` sugiere el uso de la cámara trasera del dispositivo.
* Puede integrarse fácilmente en formularios, modales o flujos de análisis visual.