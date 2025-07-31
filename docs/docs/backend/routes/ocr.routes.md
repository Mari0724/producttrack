---
id: ocr-routes
title: Rutas OCR
sidebar_label: OCR
---

# ocr.routes.ts

Este archivo define las rutas del backend relacionadas con el análisis por OCR para el módulo **NutriScan**, permitiendo tanto el procesamiento de una imagen subida por el usuario como la confirmación manual del texto extraído.

---

## 🔍 Ubicación

`src/routes/ocr.routes.ts`

---

## 📌 Propósito

Agrupar y exponer las rutas que permiten:

1. Subir una imagen para extraer texto usando OCR.
2. Confirmar o corregir manualmente el texto extraído por el sistema.

---

## 🧩 Importaciones clave

```ts
import express from 'express';
import { uploadMemory } from '../middleware/uploadMemory';
import { extraerTextoDesdeImagen, confirmarNombreManual } from '../controllers/ocr.controller';
````

| Módulo           | Propósito                                                    |
| ---------------- | ------------------------------------------------------------ |
| `express`        | Framework web para crear rutas y middleware.                 |
| `uploadMemory`   | Middleware que usa `multer` para cargar imágenes en memoria. |
| `ocr.controller` | Controladores que procesan OCR y confirmaciones de texto.    |

---

## 🚦 Definición de rutas

### 📌 `POST /nutriscan-ocr`

```ts
router.post('/nutriscan-ocr', uploadMemory.single('imagen'), extraerTextoDesdeImagen);
```

| Elemento             | Detalle                                                                |
| -------------------- | ---------------------------------------------------------------------- |
| Método               | `POST`                                                                 |
| Ruta                 | `/nutriscan-ocr`                                                       |
| Middleware           | `uploadMemory.single('imagen')` - Procesa una única imagen en memoria. |
| Controlador asociado | `extraerTextoDesdeImagen`                                              |
| Propósito            | Recibe una imagen, la procesa con OCR y devuelve el texto detectado.   |

> 🧠 Ideal para escanear etiquetas de productos alimenticios en tiempo real.

---

### 📌 `POST /confirmar-nombre`

```ts
router.post('/confirmar-nombre', confirmarNombreManual);
```

| Elemento             | Detalle                                                       |
| -------------------- | ------------------------------------------------------------- |
| Método               | `POST`                                                        |
| Ruta                 | `/confirmar-nombre`                                           |
| Controlador asociado | `confirmarNombreManual`                                       |
| Propósito            | Permite al usuario confirmar o ajustar el nombre del producto |
| Body esperado        | Texto manual enviado desde el frontend                        |

> 🔎 Útil cuando el OCR no logra identificar correctamente el nombre del producto.

---

## ✅ Ejemplo de uso (cliente frontend)

### Envío de imagen por formulario:

```ts
const formData = new FormData();
formData.append('imagen', archivoSeleccionado);

await fetch('/api/nutriscan-ocr', {
  method: 'POST',
  body: formData,
});
```

---

### Confirmar nombre manual:

```ts
await fetch('/api/confirmar-nombre', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nombre: 'Chocoramo' }),
});
```

---

## 📝 Resumen

| Ruta                | Método | Middleware              | Controlador               | Propósito                              |
| ------------------- | ------ | ----------------------- | ------------------------- | -------------------------------------- |
| `/nutriscan-ocr`    | POST   | `uploadMemory.single()` | `extraerTextoDesdeImagen` | Procesar imagen y extraer texto OCR    |
| `/confirmar-nombre` | POST   | -                       | `confirmarNombreManual`   | Confirmar o corregir el texto extraído |

---

## 🧠 Notas adicionales

* `uploadMemory` es ideal cuando no se requiere almacenamiento persistente de archivos.
* Estas rutas están pensadas para integrarse con sistemas de análisis como OpenAI (GPT) o bases como Open Food Facts.
