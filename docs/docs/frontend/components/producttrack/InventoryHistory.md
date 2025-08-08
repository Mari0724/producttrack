---
id: inventory-history
title: Historial de Cambios en Inventario
sidebar_label: InventoryHistory
---

El componente `InventoryHistory` muestra un **registro visual de los cambios realizados en el inventario**, permitiendo al usuario **filtrar por tipo de acción**: agregados, modificados o eliminados. Presenta los datos ordenados por fecha y los renderiza como tarjetas individuales usando `InventoryHistoryCard`.

---

## 🔍 Ubicación

`src/components/producttrack/InventoryHistory.tsx`

---

## 📦 Dependencias

* [`InventoryHistoryCard`](../components/InventoryHistoryCard.md): Componente para representar visualmente cada cambio individual.
* `useState` de React para manejar el filtro activo.
* `InventoryChange` del archivo:

---

## ⚙️ Propiedades

| Propiedades      | Tipo                | Descripción                                    |
| ---------------- | ------------------- | ---------------------------------------------- |
| `changes`        | `InventoryChange[]` | Lista de cambios registrados en el inventario. |

---

## 🧠 Lógica Interna

* **Estado (`filterAction`)**: Controla qué tipo de cambio se está mostrando. Puede ser:
  * `"all"` (por defecto)
  * `"added"`
  * `"modified"`
  * `"deleted"`
* **Ordenamiento**: Los cambios se ordenan de forma descendente según la fecha (`changeDate`).
* **Filtrado**: Se aplica un filtro según la acción seleccionada.

---

## 🧱 Estructura del Componente

1. **Validación de cambios vacíos**: Si `changes.length === 0`, se muestra un mensaje amigable diciendo que aún no hay cambios registrados.
2. **Encabezado**:
   * Título "Historial de Cambios"
   * Contador de cambios visibles tras el filtro
3. **Botones de filtro**: Cuatro botones permiten cambiar la categoría visible.
4. **Listado de tarjetas**: Se renderizan tarjetas (`InventoryHistoryCard`) con los cambios filtrados.

---

## 🎨 Estilos y Diseño

* Usa clases de **Tailwind CSS** para el diseño responsivo y estilizado.
* El grid de tarjetas cambia según el tamaño de pantalla: 1 o 2 columnas.
* Cada botón de filtro cambia de color y estilo dinámicamente según el filtro seleccionado.

---

## 💡 Ejemplo de Uso

```tsx
import InventoryHistory from './InventoryHistory';
import type { InventoryChange } from '../../types/Inventory';

const mockChanges: InventoryChange[] = [
  { id: '1', action: 'added', changeDate: '2025-08-06' /* otrosCampos */ },
  { id: '2', action: 'deleted', changeDate: '2025-08-05' /* otrosCampos */ },
];

<InventoryHistory changes={mockChanges} />