---
id: uploadMemory
title: Middleware de Carga en Memoria
sidebar_label: uploadMemory
---

Este middleware configura `multer` para procesar archivos cargados en la memoria del servidor. Es útil cuando se necesita manipular los archivos directamente (por ejemplo, redimensionar imágenes o realizar OCR) sin almacenarlos en disco.

---

## 🔍  Ubicación

`src/middleware/uploadMemory.ts`

---

## ✨ Descripción

El middleware `uploadMemory` utiliza `multer.memoryStorage()` para guardar archivos en un buffer de memoria temporal en lugar de guardarlos en el sistema de archivos local. Esto es ideal para cargas pequeñas que requieren procesamiento inmediato, como:

- OCR
- Validación de imágenes
- Subida directa a servicios en la nube (Cloudinary, S3, etc.)

---

## 🔧 Implementación

```ts
import multer from 'multer';

export const uploadMemory = multer({ storage: multer.memoryStorage() });
````

---

## 📌 Uso típico en rutas

```ts
import { uploadMemory } from '../middleware/uploadMemory';

router.post('/ocr', uploadMemory.single('file'), extraerTextoDesdeImagen);
```

En este ejemplo:

* `uploadMemory.single('file')`: procesa un solo archivo del campo `file` en el formulario.
* El archivo cargado estará disponible como `req.file.buffer` para procesamiento posterior.

---

## ⚠️ Consideraciones

* **No recomendable para archivos grandes**, ya que la memoria del servidor puede agotarse.
* Asegúrate de validar el tipo y tamaño del archivo antes de continuar con el procesamiento.

---

## 🧪 Acceso al archivo cargado

```ts
const buffer = req.file?.buffer;
const mimeType = req.file?.mimetype;
const originalName = req.file?.originalname;
```

---

## ✅ Beneficios

* Rápido para procesamiento en tiempo real.
* No ensucia el sistema de archivos temporal.
* Ideal para integraciones con APIs de terceros que aceptan buffers.
