---
id: preprocesarImagen
title: Preprocesamiento de Imagen
sidebar_label: PreprocesarImagen
---

# Pre Procesar Imagen

Este archivo define una función que aplica una serie de transformaciones a una imagen en formato `Buffer` para mejorar su calidad antes de realizar OCR (Reconocimiento Óptico de Caracteres). Se basa en la librería `sharp`.

---

## 🔍 Ubicación

`src/utils/preprocesarImagen.ts`

---

## 📦 Dependencias

```ts
import sharp from 'sharp';
````

* **`sharp`**: Librería de procesamiento de imágenes de alto rendimiento para Node.js.

---

## 🔧 Función Exportada

### 🔍 `preprocesarImagen(inputBuffer: Buffer): Promise<Buffer>`

Aplica mejoras visuales sobre la imagen para facilitar su análisis con herramientas de OCR como `tesseract.js`.

#### 📥 Parámetros

| Parámetro     | Tipo     | Descripción                           |
| ------------- | -------- | ------------------------------------- |
| `inputBuffer` | `Buffer` | Imagen original en formato de buffer. |

#### 📤 Retorno

Una `Promise<Buffer>` que contiene la imagen preprocesada lista para su análisis OCR.

---

## 🧪 Procesamiento Aplicado

| Etapa            | Descripción                                                               |
| ---------------- | ------------------------------------------------------------------------- |
| `resize`         | Redimensiona la imagen a un ancho máximo de 1000 px sin agrandarla.       |
| `grayscale`      | Convierte la imagen a escala de grises.                                   |
| `normalize`      | Ajusta el contraste y brillo para uniformar la imagen.                    |
| `threshold(150)` | Aplica un umbral binario con valor 150, ideal para resaltar texto oscuro. |
| `png()`          | Convierte la imagen a formato PNG (sin pérdida).                          |
| `toBuffer()`     | Devuelve la imagen procesada en un nuevo `Buffer`.                        |

---

## 🧾 Comentarios en el Código

```ts
/**
 * Preprocesa una imagen recibida como Buffer:
 * - Escala de grises
 * - Normaliza contraste
 * - Umbral binario
 * Retorna un Buffer preprocesado
 */
```

Estos comentarios resumen el objetivo y las etapas del proceso aplicado a la imagen.

---

## 🎯 Ejemplo de uso

```ts
const bufferPreprocesado = await preprocesarImagen(bufferOriginal);
```

Este `bufferPreprocesado` puede ser enviado al módulo OCR (`createOcrClient`) para mejorar la precisión del reconocimiento de texto.

---

## 🧠 Recomendaciones

* Utiliza imágenes con texto legible y fondo claro para mejores resultados.
* Este preprocesamiento es especialmente útil en imágenes tomadas desde móviles donde el contraste es bajo o el fondo es complejo.

