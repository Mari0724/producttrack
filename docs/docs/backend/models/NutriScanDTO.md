---
id: NutriScanDTO
title: NutriScanDTO
sidebar_label: NutriScan DTO
---

# NutriScanDTO

Este archivo define la **interfaz TypeScript `NutriScanDTO`**, que representa la estructura de los datos utilizados para el análisis nutricional a través de la funcionalidad **NutriScan** en la aplicación. Este DTO (Data Transfer Object) encapsula toda la información relevante de una consulta hecha por un usuario sobre un producto alimenticio mediante OCR e inteligencia artificial.

---

## 🔍 Ubicación

`src/models/NutriScanDTO.ts`

---

## 📌 Propósito

Estandarizar y tipar los datos que se envían al sistema para ejecutar un análisis nutricional inteligente basado en texto extraído por OCR (Reconocimiento Óptico de Caracteres) y procesado por una IA (como GPT o la API de Open Food Facts).

Esto facilita la validación, el mantenimiento del código y la interoperabilidad entre capas (servicio, controlador, etc.).

---

## 🧩 Estructura del modelo

```ts
export interface NutriScanDTO {
  usuarioId: number;
  esAlimento: boolean;
  consulta: string;         // Texto OCR
  respuesta: any;           // JSON generado por GPT u otra IA
  tipoAnalisis: "ocr-gpt-only" | "ocr-openfoodfacts-gpt";
}
````

---

## 🧠 Descripción de los campos

| Campo          | Tipo                                         | Descripción                                                                 |
| -------------- | -------------------------------------------- | --------------------------------------------------------------------------- |
| `usuarioId`    | `number`                                     | ID del usuario que realiza la consulta.                                     |
| `esAlimento`   | `boolean`                                    | Indica si el producto analizado es un alimento (puede usarse para filtros). |
| `consulta`     | `string`                                     | Texto extraído de la imagen mediante OCR (ingredientes, tabla nutricional). |
| `respuesta`    | `any`                                        | Resultado del análisis. Puede ser una respuesta de GPT o JSON enriquecido.  |
| `tipoAnalisis` | `"ocr-gpt-only"` o `"ocr-openfoodfacts-gpt"` | Determina el tipo de análisis aplicado.                                     |

---

## 🔀 Valores permitidos para `tipoAnalisis`

| Valor                     | Descripción                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `"ocr-gpt-only"`          | Solo se usa el texto OCR y se analiza con GPT para generar una respuesta.                         |
| `"ocr-openfoodfacts-gpt"` | Se enriquece el texto OCR con información obtenida de Open Food Facts y luego se analiza con GPT. |

---

## 🧾 Ejemplo de uso

```ts
const nuevaConsulta: NutriScanDTO = {
  usuarioId: 23,
  esAlimento: true,
  consulta: "Fijoles",
  respuesta: {
    caloriasEstimadas: 400,
    ingredientesCriticos: ["azúcar", "aceite vegetal"]
  },
  tipoAnalisis: "ocr-gpt-only"
};
```

---

## ✅ Ventajas del uso de `NutriScanDTO`

* Mejora la organización del flujo de datos en análisis nutricionales.
* Permite validar y transformar la información fácilmente.
* Se integra bien con servicios que combinan OCR + GPT + APIs externas.

---

## 🧠 Notas adicionales

* La propiedad `respuesta` se mantiene como `any` para permitir flexibilidad según el motor de análisis utilizado (GPT, OpenAI, u otro).
* Puede evolucionar a un tipo más estricto (`RespuestaNutricionalDTO`) en el futuro si se estandarizan los resultados.

---