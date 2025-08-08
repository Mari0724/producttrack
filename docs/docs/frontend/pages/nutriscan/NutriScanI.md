---
id: nutriscan
title: NutriScan
sidebar_label: NutriScan
---

La página `NutriScan` permite analizar imágenes de productos alimenticios usando OCR para extraer información nutricional.  
Incluye funciones para enviar la imagen al backend y confirmar manualmente el nombre del producto detectado.  

Se integra con el componente `FoodAnalyzer` para la interfaz y lógica de análisis.

---
## 🔍 Ubicación

`src/pages/nutriscan/NutriScan.tsx`

---

## Importaciones principales
- `FoodAnalyzer` (componente de análisis y UI)
- `axios` para solicitudes HTTP
- `url` constante base para llamadas a API
- Tipo TypeScript `RespuestaNutriScan` para tipar respuestas del análisis

---

## Funciones definidas

### `analizarImagen(entrada: string, token: string, _nombreManual?: string): Promise<RespuestaNutriScan>`
- Recibe una imagen en base64 (`entrada`) y un token de autenticación.
- Valida que la imagen sea base64, convierte el string en un archivo `File` para enviarlo como `FormData`.
- Agrega parámetros como `tipoAnalisis` y `usuarioId`.
- Realiza petición POST a la API `/api/ocr/nutriscan-ocr` con la imagen.
- Retorna la respuesta con el resultado del análisis nutricional.
- Maneja errores mostrando mensajes en consola y relanza el error.

### `confirmarConsulta(registroId: number, nombreProducto: string, token: string): Promise<RespuestaNutriScan>`
- Envia la confirmación manual del nombre detectado para un registro específico.
- Realiza petición POST a `/api/ocr/confirmar-nombre` con `registroId` y `nombreProducto`.
- Retorna la respuesta actualizada.
- Maneja errores mostrando mensajes en consola y relanza el error.

---

## Renderizado

- Devuelve un contenedor `div` que ocupa todo el espacio disponible.
- Renderiza el componente `FoodAnalyzer`, pasándole las funciones `analizarImagen` y `confirmarConsulta` como props para manejar la lógica del análisis y confirmación.

---

## Consideraciones Técnicas
- Actualmente sólo acepta imágenes en formato base64.
- El `usuarioId` se fija en `"1"` dentro de `analizarImagen`, aunque podría inferirse del token para mayor seguridad.
- Se utiliza `multipart/form-data` para enviar la imagen al backend.
- Usa Axios para comunicación con el backend, con manejo específico para errores de red o servidor.
- El componente principal `FoodAnalyzer` abstrae la UI y parte del flujo del análisis.

---

## Ejemplo de integración

```tsx
import NutriScan from '../pages/nutriscan/NutriScan';

function App() {
  return (
    <NutriScan />
  );
}
````
---