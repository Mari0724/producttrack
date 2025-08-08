---
id: tesseractTypes
title: Tipado para Tesseract
sidebar_label: Tesseract
---

Este archivo declara el módulo **`tesseract.js`** para que TypeScript lo reconozca correctamente en el proyecto.  
Es útil cuando la librería no cuenta con tipados oficiales (`@types/tesseract.js`) o cuando se desea evitar errores de compilación al importarla.

---

## 🔍 Ubicación

`src/types/tesseract.d.ts`

---

## 📌 Descripción general

* Declara la existencia del módulo `tesseract.js` sin definir tipados específicos para sus funciones.
* Permite que TypeScript compile el proyecto aunque no se conozca la forma exacta de la API de la librería.
* El control de tipos para este módulo es **implícito** (`any`), por lo que no se obtendrá autocompletado detallado a menos que se creen tipados más específicos.

---

## 🔗 Uso

Este tipado permite importar `tesseract.js` sin que TypeScript genere errores:

```ts
import Tesseract from 'tesseract.js';

Tesseract.recognize('imagen.png', 'eng')
  .then(({ data: { text } }) => {
    console.log('Texto detectado:', text);
  });
````

---

## 🧩 Relación con otros módulos

* Se utiliza en funcionalidades OCR (Reconocimiento Óptico de Caracteres) dentro del sistema.
* Puede combinarse con utilidades de procesamiento de imágenes para mejorar la precisión antes de la lectura.

---

## ⚠️ Consideraciones

* Al no tener tipados detallados, se pierde validación y autocompletado en TypeScript.
* Si en el futuro se instala un paquete de tipados oficial o comunitario, este archivo podría eliminarse.

---