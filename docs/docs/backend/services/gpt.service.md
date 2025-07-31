---
id: gpt.service
title: Servicio GPT
sidebar_label: GPTService
---

Este servicio maneja la interacción con **OpenAI GPT** para generar mensajes nutricionales personalizados a partir de la información obtenida de productos analizados con NutriScan. Funciona como un asistente nutricional digital que transforma datos numéricos en recomendaciones o resúmenes comprensibles.

---

## 🔍 Ubicación

`src/services/gpt.service.ts`

---

## 📌 Propósito

Generar un **mensaje descriptivo y personalizado** que resume la información nutricional de un producto alimenticio utilizando un modelo de lenguaje de OpenAI (`gpt-3.5-turbo`).

---

## 🧩 Importaciones clave

```ts
import OpenAI from "openai";
````

> Se importa el cliente oficial para interactuar con la API de OpenAI.

---

## 🔐 Validación de clave API

```ts
const apiKey = process.env.OPENAI_API_KEY;
```

Se obtiene la clave desde el archivo `.env`. Si no se encuentra, el sistema **emitirá una advertencia** y funcionará con respuestas simuladas.

---

## ⚠️ Modo simulación

```ts
if (!apiKey) {
  console.warn("⚠️ No se encontró la clave de OpenAI. Se usarán respuestas simuladas.");
}
```

> 🔒 El sistema se adapta automáticamente si no hay clave API. Aún puede entregar mensajes predeterminados basados en los datos.

---

## 🧠 Clase: `GPTService`

### Método: `generarMensajeNutricional(nombreProducto: string, resultados: any[]): Promise<string>`

#### ✅ Propósito

Generar un resumen nutricional del producto utilizando GPT, con base en los valores encontrados en la base de datos o resultado OCR/OpenFoodFacts.

#### 📥 Parámetros

| Nombre           | Tipo     | Descripción                                                  |
| ---------------- | -------- | ------------------------------------------------------------ |
| `nombreProducto` | `string` | Nombre del producto ingresado o reconocido.                  |
| `resultados`     | `any[]`  | Array con la información nutricional procesada del producto. |

#### 📤 Retorna

Una `Promise<string>` que contiene el **mensaje generado** o un texto alternativo si no hay conexión con GPT.

---

## 🤖 Estructura del prompt

El mensaje enviado a GPT incluye:

* Calorías
* Azúcares
* Grasas (totales, saturadas, trans)
* Sodio
* Fibra
* Proteínas
* Nutriscore
* Grupo NOVA

Ejemplo parcial del `prompt` generado:

```ts
const prompt = `
Eres un nutricionista digital. Tienes la siguiente información nutricional para un producto llamado "${producto.nombre}":

- Calorías: 340 kcal
- Azúcares: 15 g
...
Redacta un mensaje para el usuario resumiendo esta información.
`;
```

> 💡 Se utiliza `temperature: 0.6` para equilibrar creatividad y precisión.

---

## 📦 Manejador de errores

```ts
catch (error: any) {
  console.error("❌ Error generando mensaje nutricional:", error);
  throw new Error(...);
}
```

Muestra el error en consola y lanza una excepción legible para otros servicios del backend.

---

## 🚀 Instancia exportada

```ts
export const gptService = new GPTService();
```

Se exporta una instancia única de `GPTService` lista para usarse en controladores u otros servicios.

---

## 📝 Resumen

| Elemento             | Detalle                                       |
| -------------------- | --------------------------------------------- |
| Modelo GPT utilizado | `gpt-3.5-turbo`                               |
| Dependencia crítica  | `OPENAI_API_KEY` en `.env`                    |
| Modo fallback        | Sí (respuestas simuladas sin GPT)             |
| Uso principal        | Generar mensaje nutricional a partir de datos |
| Exportación          | `gptService` como singleton                   |

---

## 🧠 Notas adicionales

* Apto para extenderse con otros modelos como `gpt-4` si se requiere.
* Ideal para integrarse con rutas como `/nutriscan-ocr` y `/confirmar-nombre`.
* Si el array `resultados` está vacío, se devuelve un mensaje explicativo al usuario.

