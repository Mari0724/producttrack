---
id: historial-individual
title: Historial de Cambios de Inventario (Vista Empresarial)
sidebar_label: Historial
---

Este componente muestra el **historial de cambios** realizados en el inventario por un usuario empresarial. Recupera la información del backend usando el `idUsuario` almacenado en `localStorage` y la presenta a través del componente `InventoryHistory`.

---

## 🔍 Ubicación

`src/pages/empresarial/Historial.tsx`

---

## 📦 Dependencias

- `useEffect`, `useState` – Hooks de React para manejar estado y efectos secundarios.
- `InventoryHistory` – Componente reutilizable que presenta la lista de cambios.
- `InventoryChange` – Tipo TypeScript que define la estructura de cada cambio en el inventario.
- `getHistorialInventario` – Función API que obtiene los cambios desde el backend.

---

## 🧩 Props

Este componente **no recibe props** directamente, ya que funciona como una página principal. Los datos se obtienen mediante llamada API basada en el usuario logueado.

---

## ⚙️ Lógica interna

1. **Obtiene el `idUsuario` desde `localStorage`.**
2. Llama a `getHistorialInventario(idUsuario)` para obtener los cambios.
3. Almacena los resultados en `changes` y actualiza el estado de `loading`.
4. Mientras se cargan los datos, muestra un mensaje de **"Cargando historial..."**.
5. Cuando los datos están listos, renderiza el componente `InventoryHistory`.

---

## 🧱 Estructuras de datos

```ts
type InventoryChange = {
  id: number;
  productId: number;
  action: "add" | "update" | "delete";
  timestamp: string;
  quantityBefore: number;
  quantityAfter: number;
  description?: string;
};
````

---

## 🎨 Diseño visual

* Se presenta un `div` con **padding (`p-6`)**.
* Mientras los datos se cargan, se muestra el texto centrado `"Cargando historial..."` con estilo gris (`text-center text-gray-500`).
* Una vez cargado, muestra `InventoryHistory`, que maneja el diseño y estructura visual de los cambios.

---

## 💡 Ejemplo de uso

Este componente se usa directamente como una **página del sistema empresarial**. Puede ser accedido a través de rutas como:

```
/empresarial/historial
```

---

## 📝 Notas adicionales

* Se asume que el `idUsuario` ya fue guardado en `localStorage` durante el proceso de autenticación.
* El componente no incluye lógica de manejo de errores. Podría mejorarse incluyendo un mensaje si la llamada falla o si no hay datos disponibles.
