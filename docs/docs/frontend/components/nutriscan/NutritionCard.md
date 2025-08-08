---

id: nutrition-card
title: Tarjeta de Información Nutricional
sidebar_label: NutritionCard
---

Este componente React muestra una **tarjeta visual** con la información nutricional de un alimento, incluyendo su nombre, calorías (si están disponibles) y una descripción detallada generada por IA.

---

## 🔍 Ubicación

`src/components/nutriscan/NutritionCard.tsx`

---

## 📦 Dependencias utilizadas

```ts
import React from 'react';
import { UtensilsCrossed, Info, Lightbulb } from 'lucide-react';
```

* **React**: Para renderizar el componente funcional.
* **lucide-react**: Biblioteca de íconos usada para mejorar la experiencia visual:

  * `UtensilsCrossed`: Ícono decorativo del alimento.
  * `Info`: Encabezado de sección de nutrición.
  * `Lightbulb`: Nota informativa.

---

## 🧩 Propiedades del componente

```ts
interface NutritionData {
  food: string;
  calories?: number;
  nutritionInfo: string;
}

interface NutritionCardProps {
  data: NutritionData;
}
```

| Propiedad | Tipo            | Descripción                                                     |
| --------- | --------------- | --------------------------------------------------------------- |
| `data`    | `NutritionData` | Objeto que contiene la información a mostrar sobre el alimento. |

**Estructura del objeto `data`:**

| Campo           | Tipo     | Requerido | Descripción                                                    |
| --------------- | -------- | --------- | -------------------------------------------------------------- |
| `food`          | `string` | ✅         | Nombre del alimento.                                           |
| `calories`      | `number` | ❌         | Calorías por porción, si están disponibles.                    |
| `nutritionInfo` | `string` | ✅         | Texto descriptivo con la información nutricional del alimento. |

---

## 🧠 Lógica del componente

* El componente es **totalmente presentacional**.
* Si `calories` no está definido, simplemente **omite** esa sección.
* El contenido de `nutritionInfo` se muestra en un contenedor estilizado.
* Se incluye una **nota final** que advierte sobre la naturaleza estimada de la información (generada por IA).

---

## 🖼️ Estructura visual

* **Encabezado** (fondo con degradado verde/amarillo):

  * Ícono de alimento.
  * Nombre del alimento en grande.

* **Cuerpo**:

  * Calorías (si existen), en recuadro amarillo suave.
  * Sección con el texto nutricional detallado.

* **Nota inferior**:

  * Mensaje de advertencia con ícono, sobre la precisión y fuente de los datos.

---

## 💡 Ejemplo de uso

```tsx
<NutritionCard
  data={{
    food: 'Ensalada César',
    calories: 220,
    nutritionInfo:
      'La Ensalada César es rica en grasas saludables, gracias al aceite de oliva y el queso parmesano. Contiene proteínas por el pollo y aporta fibra por la lechuga.',
  }}
/>
```

---

## 📝 Notas adicionales

* Este componente forma parte del flujo de NutriScan, que permite al usuario visualizar la información nutricional luego de escanear o ingresar manualmente un alimento.
* Puede ser reutilizado fácilmente en otras vistas donde se desee presentar datos nutricionales con estilo consistente.
* La fuente de datos (`nutritionInfo`) debería venir validada o preprocesada desde el backend o el motor de IA.