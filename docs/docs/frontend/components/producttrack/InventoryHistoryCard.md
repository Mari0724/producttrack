---

id: inventory-history-card
title: Tarjeta de Historial de Cambios
sidebar_label: InventoryHistoryCard

---

El componente `InventoryHistoryCard` representa **visualmente un cambio específico en el inventario**, mostrando información relevante como el producto afectado, fecha del cambio, acción (agregado, modificado o eliminado), cantidades, precios anteriores y nuevos.

Está diseñado para usarse dentro del componente padre [`InventoryHistory`](./InventoryHistory.md).

---

## 🔍 Ubicación

`src/components/producttrack/InventoryHistoryCard.tsx`

---

## 📦 Dependencias

* [`lucide-react`](https://lucide.dev): Se usan íconos como `Plus`, `Minus` y `X` para representar acciones.
* `InventoryChange`: Tipo importado desde `src/types/Inventory.ts`.
* `React.FC`: Definición funcional de componente en TypeScript.

---

## ⚙️ Propiedades

| Propiedades   | Tipo              | Descripción                                       |
| ------ | ----------------- | ------------------------------------------------- |
| change | `InventoryChange` | Objeto que representa un cambio en el inventario. |

---

## 🧠 Lógica Interna

### `getActionConfig(action)`

Devuelve un objeto de configuración con estilos, colores, íconos y etiquetas según el tipo de acción:

* `added`: Verde, ícono de ➕
* `modified`: Azul, ícono de ➖
* `deleted`: Rojo, ícono de ❌
* `default`: Gris, acción desconocida

### `formatDate(date)`

Formatea la fecha del cambio a formato legible `dd/mm/yyyy, hh:mm` con locales en español (`es-ES`).

### `formatPrice(price)`

Formatea el precio en pesos colombianos (`COP`) o retorna `'-'` si no hay valor.

---

## 🧱 Estructura del Componente

1. **Encabezado**

   * Ícono representativo del tipo de cambio
   * Nombre del producto
   * Etiqueta de acción
   * Fecha del cambio

2. **Contenido Condicional**

   * **Modificado**: Muestra comparaciones entre cantidades y precios anteriores/nuevos.
   * **Agregado**: Muestra valores iniciales.
   * **Eliminado**: Muestra valores finales.

---

## 🎨 Estilos y Diseño

* Estilos dinámicos según tipo de acción (`bgColor`, `textColor`, `iconColor`, etc).
* Usa utilidades de **Tailwind CSS** para diseño responsivo, bordes redondeados, espaciado, colores y animaciones (`animate-fade-in`).
* Íconos encapsulados en círculos con colores suaves según el tipo de acción.

---

## 💡 Ejemplo de Uso

```tsx
import InventoryHistoryCard from './InventoryHistoryCard';
import type { InventoryChange } from '../../types/Inventory';

const change: InventoryChange = {
  id: '1',
  action: 'modified',
  changeDate: new Date(),
  productName: 'Producto X',
  previousQuantity: 20,
  newQuantity: 35,
  previousPrice: 5000,
  newPrice: 6000
};

<InventoryHistoryCard change={change} />;
```

---

## 📝 Notas Adicionales

* Este componente es **puro y reutilizable**.
* Se adapta dinámicamente al tipo de cambio y a los valores disponibles.
* Mejora la comprensión del historial para usuarios no técnicos, al representar visualmente los cambios con claridad.
* Está optimizado para ser usado en **listas responsivas** dentro de grids.