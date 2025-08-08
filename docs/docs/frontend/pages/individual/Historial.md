---
id: historial-inventario-individual
title: Historial de Inventario Individual
sidebar_label: Historial
---

El componente `HistorialIndividual` muestra el **historial de cambios de inventario** realizados por un usuario individual, permitiendo visualizar de forma clara las entradas, salidas o modificaciones que ha hecho sobre sus productos.

---

## 🔍 Ubicación

`src/pages/individual/Historial.tsx`

---

## 📦 Dependencias

* **React Hooks:** `useState`, `useEffect`
* **Componente Interno:** [`InventoryHistory`](../../components/producttrack/InventoryHistory)
* **API Personalizada:** [`getHistorialInventario`](../../api/historial)
* **Tipo de Datos:** [`InventoryChange`](../../types/Inventory)

---

## ⚙️ Propiedades

> Este componente **no recibe Props** directamente. Utiliza el `idUsuario` desde `localStorage`.

---

## 🧠 Lógica Interna

### 📥 Estado

| Estado    | Tipo                | Descripción                                |
| --------- | ------------------- | ------------------------------------------ |
| `changes` | `InventoryChange[]` | Lista de cambios de inventario del usuario |
| `loading` | `boolean`           | Indica si los datos aún están cargando     |

---

### 🔁 `useEffect`

* Al montar el componente:

  1. Obtiene el `idUsuario` desde `localStorage`.
  2. Llama a `getHistorialInventario` con dicho ID.
  3. Guarda el resultado en el estado `changes`.
  4. Establece `loading` como `false` al finalizar.

---

### 📤 Funciones Auxiliares

* **`getHistorialInventario(idUsuario)`**
  Llama al backend para obtener el historial completo de cambios asociados a un usuario individual.

---

## 🧱 Estructura del Componente

1. **Mensaje de carga**

   * Mientras se recupera la información, se muestra un mensaje "Cargando historial..."

2. **Componente `InventoryHistory`**

   * Una vez cargados los datos, renderiza `InventoryHistory` con la lista de cambios (`changes`) como prop.

---

## 🎨 Estilos y Diseño

* Usa **Tailwind CSS** para estructura y espaciado:

  * `p-6` para padding general
  * Texto de carga con `text-center` y `text-gray-500`

---

## 💡 Ejemplo de Uso

Este componente se monta automáticamente dentro de la sección individual de la app:

```tsx
<Route path="/individual/historial" element={<HistorialIndividual />} />
```

> ✅ Se espera que el usuario esté autenticado y que exista `"idUsuario"` en el `localStorage`.

---

## 📝 Notas Adicionales

* Solo muestra historial para usuarios tipo **INDIVIDUAL**.
* No tiene opciones de filtrado ni edición, es solo **consulta histórica**.
* El componente `InventoryHistory` se encarga de la representación visual (filas, íconos, fechas, etc.).
* Es ideal para auditoría personal o revisión de actividad del usuario.