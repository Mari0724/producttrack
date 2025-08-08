---
id: ad-images
title: adImages
sidebar_label: adImages
---

El archivo `adImages.ts` define un arreglo con las rutas de las imágenes publicitarias que se mostrarán dentro de la aplicación.

---

## 🔍 Ubicación

`src/utils/cloudinary.ts`

---

## Contenido

```ts
export const adImages = [
  '/ads/anuncio1.jpg',
  '/ads/anuncio2.jpg'
];
````

### Descripción

* **`adImages`**: arreglo de tipo `string[]` que contiene las rutas relativas de las imágenes que se usarán como anuncios en la interfaz.
* Las imágenes están almacenadas en la carpeta pública `/ads` del proyecto.
* Este arreglo puede ser utilizado en componentes que requieran mostrar publicidad rotativa o estática.

### Ejemplo de uso

```ts
import { adImages } from '@/utils/adImages';

console.log(adImages);
// Salida: ["/ads/anuncio1.jpg", "/ads/anuncio2.jpg"]
```

---