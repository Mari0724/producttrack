---
id: use-toast
title: Hook de Toast Personalizado
sidebar_label: useToast

---

El archivo `useToast.tsx` define un **hook personalizado de React** que expone una interfaz sencilla para mostrar notificaciones tipo "toast" en la aplicación, utilizando la librería `sonner`.

Este hook sirve como envoltorio (`wrapper`) del método `toast` exportado por `sonner`, permitiendo su uso estandarizado a través de toda la aplicación sin necesidad de importar directamente la librería en múltiples archivos.

---

## 🔍 Ubicación

`src/hooks/useToast.tsx`

---

## 📦 Dependencias

* **Librería externa:**

  * [`sonner`](https://sonner.emilkowal.ski/) – sistema ligero para toasts.


---

## 🧠 Lógica Interna

### 🔁 Implementación

```tsx
import { toast as shadToast } from "sonner";

export const useToast = () => {
  return {
    toast: shadToast
  };
};
```

* Se importa el método `toast` desde `sonner`, pero se le renombra como `shadToast` para evitar conflictos.
* El hook retorna un objeto que expone `toast`, permitiendo que el resto de la app lo consuma vía destructuring:

```tsx
const { toast } = useToast();
```

---

## 🧪 Ejemplo de Uso

### ✅ Toast Básico

```tsx
import { useToast } from '@/hooks/useToast';

const Demo = () => {
  const { toast } = useToast();

  return (
    <button onClick={() => toast('Operación exitosa')}>
      Mostrar Toast
    </button>
  );
};
```

### 🧠 Toast con configuración

```tsx
toast('Producto actualizado', {
  description: 'Los cambios se guardaron correctamente.',
  duration: 3000
});
```

---

## 🧱 Estructura del Hook

```tsx
useToast: () => {
  return {
    toast: shadToast
  };
}
```

* Es un wrapper directo, **sin lógica adicional**, ideal para desacoplar la dependencia de `sonner` y facilitar su futura sustitución si fuese necesario.

---

## 🎨 Estilos y Diseño

* La apariencia visual del `toast` es gestionada por `sonner`, que ya ofrece estilos por defecto con soporte para dark mode, animaciones suaves y variantes configurables (`success`, `error`, `info`, etc.).
* Este hook **no gestiona directamente estilos**, pero puedes aplicar estilos y variantes usando las opciones de configuración de `sonner`.

---

## 💡 Ventajas del Envoltorio

* Evita repetir la importación de `sonner` en múltiples componentes.
* Permite **centralizar una posible futura migración** a otra librería de toasts.
* Mantiene la coherencia y facilidad de testing en la base de código.

---

## 📝 Notas Adicionales

* `sonner` ofrece múltiples variantes como:

  * `toast.success(...)`
  * `toast.error(...)`
  * `toast.info(...)`

  Todas ellas pueden usarse a través del mismo objeto retornado por `useToast()` si se desea.

* Aunque en este hook se retorna solo `toast`, podrías extenderlo fácilmente para manejar contexto, colas o internacionalización más adelante.