---
id: resize-image
title: Utilidad para Redimensionar Imágenes
sidebar_label: Redimensionar Imágenes
---

Función que **redimensiona imágenes de forma proporcional** en el cliente, limitando su ancho y alto máximos, y devuelve el resultado en formato **Base64**.

---

## 🔍 Ubicación

`src/utils/resizeImage.ts`

---

## 🧩 Parámetros

| Parámetro   | Tipo     | Requerido | Descripción                                                                                   |
| ----------- | -------- | --------- | --------------------------------------------------------------------------------------------- |
| `file`      | `File`   | ✅ Sí     | Archivo de imagen a redimensionar.                                                            |
| `maxWidth`  | `number` | ❌ No     | Ancho máximo permitido en píxeles. Por defecto es `800`.                                      |
| `maxHeight` | `number` | ❌ No     | Alto máximo permitido en píxeles. Por defecto es `800`.                                       |

---

## 📌 Descripción de la lógica

1. **Lectura del archivo**: Se utiliza `FileReader` para convertir el archivo de imagen en una URL Base64 temporal.
2. **Carga de la imagen**: Una vez cargada, se obtiene su ancho y alto originales.
3. **Escalado proporcional**:  
   - Si la imagen excede el ancho o alto máximos permitidos, se calcula un nuevo tamaño proporcional para mantener la relación de aspecto.
4. **Dibujo en un canvas**: Se crea un `canvas` del tamaño calculado y se dibuja la imagen.
5. **Conversión a Base64**: El `canvas` se convierte a una cadena Base64 con formato JPEG y calidad del 70%.
6. **Retorno**: Se devuelve una `Promise` que resuelve con la cadena Base64 resultante.

---

## 🛠️ Usos comunes

- Optimizar imágenes antes de subirlas al servidor para reducir peso y tiempo de carga.
- Generar vistas previas más ligeras en formularios o galerías.
- Preprocesar imágenes en aplicaciones web sin necesidad de backend.

---

## ✅ Ejemplo de uso

```ts
import { resizeImage } from '@/utils/resizeImage';

const fileInput = document.querySelector('input[type="file"]');

fileInput?.addEventListener('change', async (event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const resized = await resizeImage(file, 600, 600);
    console.log("Imagen redimensionada en Base64:", resized);
  }
});
````

En este ejemplo:

* Se toma el archivo seleccionado por el usuario.
* Se redimensiona a un máximo de **600x600 píxeles**.
* Se obtiene la versión reducida en Base64 lista para enviar o mostrar.

---