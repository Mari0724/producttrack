---
id: utils-ocr
title: Cliente OCR con Tesseract.js
sidebar_label: ocr
---

# Ocr

Este archivo implementa una función para procesar imágenes y extraer texto utilizando la librería `tesseract.js`. Se utiliza en el backend del sistema NutriScan para realizar reconocimiento óptico de caracteres (OCR) a imágenes cargadas por el usuario.

---

## 🔍 Ubicación

`src/utils/ocr.ts`

---

## 📦 Dependencias

```ts
import { createWorker, PSM } from 'tesseract.js';
````

* **`tesseract.js`**: Librería OCR basada en WebAssembly.
* **`PSM.SPARSE_TEXT`**: Configura el modo de segmentación de páginas para tratar mejor textos cortos o aislados.

---

## 🔧 Función Exportada

### 🔍 `createOcrClient(imagePath: string): Promise<string>`

Realiza el reconocimiento de texto sobre una imagen localizada en `imagePath`.

#### 📥 Parámetros

| Parámetro   | Tipo     | Descripción                                      |
| ----------- | -------- | ------------------------------------------------ |
| `imagePath` | `string` | Ruta (local o temporal) de la imagen a procesar. |

#### 📤 Retorno

Una `Promise<string>` que contiene el texto extraído de la imagen.

---

## ⚙️ Flujo Interno

1. **Crear un worker OCR** usando `createWorker()`.
2. **Cargar los datos del worker** y reinicializarlo con soporte para inglés y español (`eng+spa`).
3. **Configurar el modo de segmentación** como `SPARSE_TEXT`, ideal para textos cortos o dispersos.
4. **Reconocer el texto** de la imagen con `worker.recognize(imagePath)`.
5. **Devolver** `data.text`, el texto reconocido.
6. **Liberar recursos** con `worker.terminate()`.

---

## 🧪 Ejemplo de uso

```ts
const textoExtraido = await createOcrClient("/uploads/temp/imagen.jpg");
console.log(textoExtraido);
```

---

## 🧾 Manejo de errores

* Si ocurre un error durante el OCR, se registra en consola con un mensaje específico.
* Se lanza una excepción con un mensaje claro para manejarla a nivel de controlador o servicio.

---

## 📋 Notas adicionales

* Es necesario tener instalada y correctamente configurada la dependencia `tesseract.js`.
* El worker se destruye (`terminate()`) siempre, incluso si ocurre un error.
* Es compatible con imágenes subidas desde el frontend, generalmente procesadas con `uploadMemory`.

---

## 🧠 Recomendación

Para mejorar los resultados OCR:

* Usa imágenes con buena iluminación y resolución.
* Evita fondos complejos o letras pequeñas.
* Preprocesa imágenes si es necesario (contraste, binarización, etc.).
