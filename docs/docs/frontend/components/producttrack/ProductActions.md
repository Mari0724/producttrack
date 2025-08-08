---

id: product-actions
title: Acciones del Producto
sidebar_label: ProductActions

---

El componente `ProductActions` renderiza un conjunto de **botones de acción** (editar, eliminar, ver) que permiten al usuario interactuar con un producto de inventario.
Adapta su contenido y estilo en función del **rol del usuario** (`EDITOR`, `COMENTARISTA`, etc.) y su **tipo de cuenta** (`INDIVIDUAL` o `EMPRESARIAL`).

---

## 🔍 Ubicación

`src/components/producttrack/ProductActions.tsx`

---

## 📦 Dependencias

* **React:** `React.FC`
* **Íconos de `react-icons/fa`:**

  * `FaEdit` → ícono para editar
  * `FaTrash` → ícono para eliminar
  * `FaEye` → ícono para ver detalles o notas

---

## ⚙️ Propiedades

| Propiedad     | Tipo         | Requerido | Descripción                                                           |
| ------------- | ------------ | --------- | --------------------------------------------------------------------- |
| `onEdit`      | `() => void` | No        | Función que se ejecuta al hacer clic en "Editar".                     |
| `onDelete`    | `() => void` | No        | Función que se ejecuta al hacer clic en "Eliminar".                   |
| `onView`      | `() => void` | ✔️ Sí     | Función que se ejecuta al hacer clic en "Ver más / Notas personales". |
| `tipoUsuario` | `string`     | ✔️ Sí     | Define si el usuario es `INDIVIDUAL` o `EMPRESARIAL`.                 |
| `rol`         | `string`     | No        | Rol del usuario: puede ser `EDITOR`, `COMENTARISTA`, etc.             |

---

## 🧠 Lógica Interna

### 🔁 Evaluaciones

* Se determina si el usuario es **individual** con:

  ```tsx
  const isIndividual = tipoUsuario === 'INDIVIDUAL';
  ```

* Se adaptan las etiquetas y colores de los botones según este tipo:

  * Si es `INDIVIDUAL`: botón de ver → `Notas personales`, color vino (`bg-[#81203D]`)
  * Si es `EMPRESARIAL`: botón de ver → `Ver más`, color gris oscuro (`bg-gray-700`)

### 🧪 Condicionales por Rol

* Si el `rol` es `"EDITOR"`:

  * Se muestran los botones de **Editar** y **Eliminar**
* Si el `rol` es `"EDITOR"`, `"COMENTARISTA"` o el usuario es `INDIVIDUAL`:

  * Se muestra el botón de **ver notas** o **ver más**

---

## 🧱 Estructura del Componente

```tsx
<div className="flex gap-3 pt-3 text-white">
  {rol === "EDITOR" && (
    <>
      <button onClick={onEdit}>Editar</button>
      <button onClick={onDelete}>Eliminar</button>
    </>
  )}

  {(rol === "EDITOR" || rol === "COMENTARISTA" || isIndividual) && (
    <button onClick={onView}>Ver más / Notas</button>
  )}
</div>
```

* Botones con íconos y estilos adaptados
* Usa **Tailwind CSS** para espaciado, color y forma

---

## 🎨 Estilos y Diseño

| Acción   | Color de Fondo       | Hover             | Ícono     | Texto           |
| -------- | -------------------- | ----------------- | --------- | --------------- |
| Editar   | `#81203D`            | `#60162F`         | `FaEdit`  | Editar          |
| Eliminar | `#FFBA00` (amarillo) | `#E6A700`         | `FaTrash` | Eliminar        |
| Ver      | Depende del usuario  | Tonos más oscuros | `FaEye`   | Ver más / Notas |

> Todos los botones tienen clases `px-3 py-1.5 rounded-lg text-sm` para mantener uniformidad visual.

---

## 💡 Ejemplo de Uso

```tsx
<ProductActions
  onEdit={() => console.log('Editar producto')}
  onDelete={() => console.log('Eliminar producto')}
  onView={() => console.log('Ver detalles')}
  tipoUsuario="INDIVIDUAL"
  rol="EDITOR"
/>
```

---

## 📝 Notas Adicionales

* El componente es **reutilizable** y altamente adaptable según contexto.
* No realiza validaciones ni confirma acciones (por ejemplo, eliminar); se espera que esto se maneje fuera del componente.
* Ideal para usarse dentro de tarjetas de producto o filas de tablas interactivas.