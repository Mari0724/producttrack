---
id: ocr.controller
title: Controlador OCR
sidebar_label: OCRController 
---

# OCRController

Este controlador maneja la lógica relacionada con el análisis de imágenes usando OCR (Reconocimiento Óptico de Caracteres), GPT e integración con OpenFoodFacts. Proporciona endpoints para extraer texto desde imágenes y confirmar manualmente productos no reconocidos.

---

## 🔍 Ubicación

`src/controller/ocr.controller.ts`

---

## 📦 Dependencias

- `cloudinaryUploadBuffer`, `obtenerUrlPreprocesada`: Subida de imágenes a Cloudinary.
- `createOcrClient`: Cliente OCR que procesa la imagen desde Cloudinary.
- `limpiarTextoOCR`, `corregirErroresOCR`, `obtenerCandidatosProductos`, `elegirMejorResultado`: Utilidades para procesar y analizar texto extraído.
- `OpenFoodFactsService`: Consulta de información alimentaria externa.
- `gptService`: Generación de mensajes nutricionales con IA.
- `prisma`: ORM para registrar datos en la base de datos (`nutriScan`).
- `preprocesarImagen`: Procesamiento previo de imágenes antes de aplicar OCR.

---

## 🚀 Endpoints

### 📤 `POST /ocr/extraerTextoDesdeImagen`

Procesa una imagen enviada, realiza OCR, analiza el texto y genera un mensaje nutricional usando inteligencia artificial.

#### Parámetros

- `req.file`: Imagen (tipo `multipart/form-data`).
- `req.body.usuarioId`: ID del usuario que realiza la solicitud.
- `req.body.tipoAnalisis`: Tipo de análisis. Solo se permite `ocr-gpt-only`.

#### Flujo de trabajo

1. Preprocesa la imagen y la sube a Cloudinary.
2. Extrae texto desde la imagen usando OCR.
3. Limpia y corrige el texto extraído.
4. Detecta posibles nombres de productos.
5. Consulta OpenFoodFacts usando el nombre detectado.
6. Genera un mensaje nutricional con GPT.
7. Registra el análisis en la base de datos (`nutriScan`).

#### Validaciones

- Imagen obligatoria.
- Texto extraído no puede estar vacío.
- Solo se permite el tipo de análisis `ocr-gpt-only`.

#### Respuestas

- `201 Created`: Registro guardado correctamente.
- `400 Bad Request`: Faltan datos o errores de validación.
- `500 Internal Server Error`: Error inesperado en el procesamiento.

#### Ejemplo de respuesta

```json
{
  "mensaje": "Análisis completado",
  "registro": { ... },
  "resultadoOpenFoodFacts": { ... },
  "mensajeGPT": "Este producto contiene...",
  "requiereConfirmacion": false,
  "sugerencia": "Cereal con avena"
}
````

---

### 📝 `POST /ocr/confirmarNombreManual`

Confirma manualmente el nombre de un producto cuando no se detectó correctamente desde la imagen.

#### Parámetros

* `registroId`: ID del análisis previamente creado.
* `nombreProducto`: Nombre proporcionado manualmente.
* `tipoAnalisis` *(opcional)*: Tipo de análisis (por defecto, `"manual"`).

#### Flujo de trabajo

1. Verifica que el nombre y `registroId` sean válidos.
2. Consulta OpenFoodFacts con el nombre proporcionado.
3. Genera mensaje nutricional con GPT.
4. Actualiza el registro existente con la nueva información.

#### Validaciones

* `registroId` y `nombreProducto` son obligatorios.
* El nombre debe tener contenido válido.

#### Respuestas

* `200 OK`: Análisis manual actualizado correctamente.
* `400 Bad Request`: Faltan datos requeridos o errores de validación.
* `500 Internal Server Error`: Error inesperado.

#### Ejemplo de respuesta

```json
{
  "mensaje": "Análisis manual completado",
  "registro": { ... },
  "resultadoOpenFoodFacts": { ... },
  "mensajeGPT": "Contiene azúcares añadidos..."
}
```

---

## ✅ Consideraciones técnicas

* El sistema intenta detectar automáticamente un producto; si falla, sugiere uno y solicita confirmación manual.
* En caso de no haber coincidencias en OpenFoodFacts, se genera igualmente un mensaje con GPT usando el texto corregido.
* Se registra si el análisis fue `ocr-gpt-only` o `manual`, permitiendo seguimiento posterior.
