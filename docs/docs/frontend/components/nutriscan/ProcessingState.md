---

id: processing-state
title: Estado de Procesamiento de NutriScan
sidebar\_label: ProcessingState
---

Este componente muestra un **estado visual de carga** durante el análisis de una imagen alimenticia. Simula el progreso paso a paso del proceso de escaneo con animaciones suaves y mensajes amigables.

---

## 🔍 Ubicación

`src/components/nutriscan/ProcessingState.tsx`

---

## 📦 Dependencias utilizadas

```ts
import { ScanFace } from 'lucide-react';
```

* **lucide-react**: Utiliza el ícono `ScanFace` como elemento animado para representar visualmente el análisis en curso.

---

## 🧩 Propiedades del componente

Este componente **no recibe props**. Es completamente estático y se renderiza tal como está.

---

## 🎨 Estructura visual

El diseño consiste en una tarjeta central con las siguientes secciones:

### 🎯 Encabezado animado

* Ícono de escaneo (`ScanFace`) con animación de rebote suave (`animate-bounce-gentle`).
* Título principal: **"Analizando tu comida..."**
* Subtítulo con mensaje de progreso: *"Estamos procesando la imagen para extraer la información nutricional."*

### ⏳ Barra de progreso

* Una barra horizontal animada que simula progreso con un gradiente de color (amarillo → verde oliva).
* Usa clases utilitarias como `animate-pulse-slow` para dar sensación de actividad.

### 📋 Pasos del análisis

Se visualizan tres pasos, cada uno con un **punto animado** e ícono de carga:

1. 🟢 **Detectando alimentos...**
2. 🟡 **Calculando nutrientes...**
3. 🔴 **Generando reporte...**

> Cada punto tiene un retraso en su animación (`animationDelay`) para simular una secuencia realista.

---

## 💡 Ejemplo de uso

```tsx
import ProcessingState from '@/components/nutriscan/ProcessingState';

function NutriScanResultView() {
  return (
    <div>
      {/* Se muestra mientras se analiza la imagen */}
      <ProcessingState />
    </div>
  );
}
```

---

## 📝 Notas adicionales

* Este componente **no realiza ninguna lógica interna**. Es visual y su único propósito es mostrar retroalimentación de procesamiento.
* Ideal para mostrarlo **antes de recibir la respuesta del backend** en un flujo como NutriScan o similar.
* Su diseño centrado y estilizado mejora la **percepción de velocidad** y mantiene al usuario informado del progreso.