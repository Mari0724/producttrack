---
id: openfoodfacts.service
title: Servicio OpenFoodFacts
sidebar_label: OpenFoodFacts
---

Este servicio proporciona una interfaz para realizar búsquedas de alimentos usando la API pública de **OpenFoodFacts**, con el fin de obtener información nutricional que será utilizada posteriormente por otros módulos como `NutriScanService`.

---

## 📌 Ubicación

`src/services/openfoodfacts.service.ts`

---

## 🎯 Propósito

Permite buscar alimentos por nombre utilizando la API de OpenFoodFacts y devuelve los resultados en un formato limpio, con solo la información nutricional relevante.

---

## 📦 Dependencias

```ts
import axios from "axios";
````

Se utiliza `axios` para realizar solicitudes HTTP.

---

## 🔧 Clase: `OpenFoodFactsService`

### 🔍 Método estático: `buscarAlimentoPorNombre(nombre: string)`

Realiza una búsqueda de alimentos en la API de OpenFoodFacts utilizando un nombre proporcionado.

#### 🚀 Proceso

1. Hace una solicitud `GET` a `https://world.openfoodfacts.org/cgi/search.pl`.
2. Envía los siguientes parámetros:

   * `search_terms`: término de búsqueda.
   * `search_simple`: `1` (modo simple).
   * `action`: `"process"`.
   * `json`: `1` (respuesta en formato JSON).
3. Extrae los primeros 3 productos de la respuesta.
4. Filtra y estructura solo los campos relevantes.

#### 🧪 Ejemplo de uso

```ts
const resultados = await OpenFoodFactsService.buscarAlimentoPorNombre("galletas");
```

#### 📤 Retorno

Un arreglo con hasta 3 objetos que contienen:

| Campo        | Descripción                          |
| ------------ | ------------------------------------ |
| `nombre`     | Nombre del producto.                 |
| `nutriments` | Objeto con nutrientes por 100g.      |
| `nutriscore` | Calificación nutricional (A-E).      |
| `nova_group` | Grado de procesamiento (1-4).        |
| `imagen`     | URL de la imagen del producto.       |
| `link`       | Enlace al producto en OpenFoodFacts. |

>Nota: Todos los valores nutricionales son estimados por cada 100g del producto, según lo reportado por OpenFoodFacts.

Ejemplo de un resultado filtrado:

```ts
{
  nombre: "Galletas de avena",
  nutriments: {
    calorias: 480,
    azucares: 22,
    grasas: 20,
    grasas_saturadas: 8,
    grasas_trans: null,
    sodio: 0.3,
    fibra: 3,
    proteinas: 6
  },
  nutriscore: "c",
  nova_group: 4,
  imagen: "https://...",
  link: "https://..."
}
```

---

## ⚠️ Manejo de errores

* Si ocurre algún error en la solicitud, se captura con `try/catch` y se imprime en consola con `console.error`.
* Se retorna un arreglo vacío como fallback.

---

## 🧾 Resumen

| Elemento          | Descripción                                                   |
| ----------------- | ------------------------------------------------------------- |
| API utilizada     | [OpenFoodFacts](https://world.openfoodfacts.org)              |
| Formato de salida | Simplificado (máx. 3 productos, solo info relevante)          |
| Uso principal     | Integración con `NutriScanService` para análisis nutricional. |
| Fallback          | Retorna `[]` si hay error o no hay resultados.                |


