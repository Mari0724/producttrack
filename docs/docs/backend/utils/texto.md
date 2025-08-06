---
id: Texto
title: Utilidades de Texto OCR
sidebar_label: Texto
---

Este módulo contiene funciones auxiliares para el procesamiento, limpieza y análisis del texto extraído por OCR (Reconocimiento Óptico de Caracteres) en el sistema NutriScan. Estas funciones ayudan a mejorar la precisión de las búsquedas y a reducir errores comunes del reconocimiento.

---

## 📌 Ubicación

`src/utils/texto.ts`

---

## ✨ Funciones Exportadas

### 🔹 `limpiarTextoOCR(texto: string): string`

Normaliza el texto extraído por OCR.

#### ✅ Acciones realizadas:

- Convierte a minúsculas.
- Reemplaza saltos de línea por espacios.
- Elimina caracteres no alfanuméricos (excepto espacios y guiones).
- Colapsa espacios múltiples.
- Elimina espacios al inicio y final.

#### 🧪 Ejemplo

```ts
limpiarTextoOCR("LENTEJAS\n- MARCA!!!")
→ "lentejas marca"
````

---

### 🔹 `corregirErroresOCR(texto: string): string`

Corrige errores comunes causados por el OCR.

#### 🔁 Correcciones incluidas:

* `1entejas` → `lentejas`
* `garbansos` → `garbanzos`
* `aros` → `arroz`

*(Puedes ampliar esta lista según los errores más comunes de tu base de datos OCR)*

---

### 🔹 `obtenerCandidatosProductos(texto: string): string[]`

Busca coincidencias con una lista de alimentos comunes en español.

#### 📋 Lista de alimentos comunes por defecto:

```ts
[
  'lentejas', 'arroz', 'avena', 'garbanzos',
  'frijoles', 'papa', 'fideos', 'espagueti',
  'quinua', 'soya', 'trigo'
]
```

#### ✅ Devuelve:

Un array con los alimentos que aparecen dentro del texto OCR.

---

### 🔹 `elegirMejorResultado(resultados: any[], textoOCR: string): any | null`

Elige el resultado más relevante de una lista consultada (por ejemplo, desde OpenFoodFacts), basándose en coincidencias con el texto OCR limpio.

#### 🧠 Lógica aplicada:

1. **Filtra productos irrelevantes** si el OCR no menciona ciertas palabras clave.
2. **Busca coincidencias exactas** en el nombre del producto.
3. Si no hay coincidencias exactas:

   * Retorna el primer resultado relevante.
   * Si no hay relevantes, retorna el primer resultado general.

---

## 🎯 Usos Típicos

Estas utilidades son usadas como parte del flujo de NutriScan:

* Después del reconocimiento OCR (`extraerTextoDesdeImagen`).
* Antes de hacer consultas a OpenFoodFacts.
* Para mejorar las coincidencias entre texto OCR y productos reales.
* Para hacer análisis más preciso con GPT.

---

## 🔍 Ejemplo de Flujo Común

```ts
const textoLimpio = limpiarTextoOCR(textoOCR);
const textoCorregido = corregirErroresOCR(textoLimpio);
const candidatos = obtenerCandidatosProductos(textoCorregido);
```
