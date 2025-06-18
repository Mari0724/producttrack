---
id: ocr.controller
title: Controlador OCR
sidebar_label: OCR 
---

# OCRController

Este módulo expone dos endpoints principales para procesar imágenes con texto y obtener un análisis nutricional automático utilizando OCR (Reconocimiento Óptico de Caracteres), inteligencia artificial (GPT) y datos de OpenFoodFacts. También permite confirmar manualmente un nombre de producto si no se pudo detectar automáticamente.

---

## 🔍 Ubicación

`src/controller/ocr.controller.ts`

---

## 📦 Dependencias

- `cloudinaryUploadBuffer`, `obtenerUrlPreprocesada`: Utilidades para subir imágenes a Cloudinary.
- `createOcrClient`: Cliente para realizar OCR usando una imagen desde Cloudinary.
- `limpiarTextoOCR`, `corregirErroresOCR`, `obtenerCandidatosProductos`, `elegirMejorResultado`: Funciones para limpiar, corregir y analizar texto.
- `OpenFoodFactsService`: Búsqueda de productos alimenticios por nombre.
- `gptService`: Generación de análisis nutricional con inteligencia artificial.
- `prisma`: Acceso a base de datos y modelo `nutriScan`.

---

## 🚀 Endpoints

### 📤 `POST /ocr/extraerTextoDesdeImagen`

Procesa una imagen enviada, realiza OCR, analiza el texto y genera un mensaje nutricional.

#### Parámetros:

- `req.file`: Imagen enviada en el formulario (`multipart/form-data`).
- `req.body.usuarioId`: ID del usuario que realiza la solicitud.
- `req.body.tipoAnalisis`: Tipo de análisis, solo se permite `ocr-gpt-only`.

#### Flujo:

1. Sube la imagen preprocesada a Cloudinary.
2. Realiza OCR usando Cloudinary.
3. Limpia y corrige el texto detectado.
4. Extrae posibles nombres de productos.
5. Consulta OpenFoodFacts.
6. Genera respuesta nutricional usando GPT.
7. Registra los resultados en la base de datos `nutriScan`.

#### Respuestas:

- `201 Created`: Registro guardado exitosamente.
- `400 Bad Request`: Imagen ausente, texto vacío o tipo de análisis inválido.
- `500 Internal Server Error`: Error interno del servidor.

#### Ejemplo de respuesta:

```json
{
  "mensaje": "Análisis completado",
  "registro": { /* datos de nutriScan */ },
  "resultadoOpenFoodFacts": { /* info nutricional */ },
  "mensajeGPT": "Este producto contiene...",
  "requiereConfirmacion": false,
  "sugerencia": "Cereal con avena"
}
