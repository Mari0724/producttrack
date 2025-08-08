---
id: sidebar
title: Barra Lateral de Navegación
sidebar_label: Sidebar

---

El componente `Sidebar` muestra una barra lateral de navegación adaptable según el tipo de usuario (`empresarial`, `desarrollador`, `individual`) y su rol (`ADMIN`, `DESARROLLADOR`, etc.). Brinda acceso rápido a las secciones clave de la aplicación con íconos representativos, diseño colapsable y enlaces dinámicos.

---

## 🔍 Ubicación

`src/components/Sidebar.tsx`

---

## 📦 Dependencias

* **React Hooks:** `useEffect`, `useState`
* **React Router:** `Link`, `useLocation` para navegación y detección de rutas activas
* **react-icons:**

  * `FaHome`, `FaChartBar`, `FaBox`, `FaHistory`, `FaQrcode`, `FaCog`, `FaClipboardList`
* **clsx:** para aplicar clases condicionalmente

---

## ⚙️ Comportamiento

* Detecta el tipo de usuario (`tipoUsuario`) y rol (`rol`) desde `localStorage`
* Define dinámicamente el `basePath` para rutas internas según el tipo de usuario
* Muestra u oculta ítems del menú con base en el rol del usuario
* Expande el sidebar al hacer hover (de `w-20` a `w-60`)
* Aplica resaltado visual en el ítem activo mediante comparación con `location.pathname`

---

## 🧠 Lógica Interna

| Estado        | Tipo             | Descripción                                                  |
| ------------- | ---------------- | ------------------------------------------------------------ |
| `tipoUsuario` | `string \| null` | Tipo de cuenta: `empresarial`, `desarrollador`, `individual` |
| `rol`         | `string \| null` | Rol del usuario: `ADMIN`, `DESARROLLADOR`, etc.              |

* El `useEffect` inicializa estos valores leyendo del `localStorage`.
* `basePath` se construye en función de `tipoUsuario`.

---

## 🧭 Estructura del Menú

| Ícono             | Texto         | Ruta                          | Visibilidad Condicional        |
| ----------------- | ------------- | ----------------------------- | ------------------------------ |
| `FaHome`          | Home          | `${basePath}/home`            | Todos los usuarios             |
| `FaBox`           | Inventario    | `${basePath}/inventario`      | Todos los usuarios             |
| `FaChartBar`      | Reportes      | `/app/desarrollador/reportes` | Solo `DESARROLLADOR`           |
| `FaHistory`       | Historial     | `${basePath}/historial`       | Todos los usuarios             |
| `FaQrcode`        | NutriScan     | `/nutriscan`                  | Solo usuarios `individual`     |
| `FaClipboardList` | Auditoría     | `/auditoria`                  | Solo `ADMIN` y `DESARROLLADOR` |
| `FaCog`           | Configuración | `${basePath}/configuracion`   | Todos los usuarios             |

---

## 🎨 Diseño y Comportamiento Visual

* **Colores:**

  * Fondo: `#404D2C` (verde oscuro)
  * Hover: texto `#FCDDEC` (rosado claro)
* **Animaciones:**

  * Transición suave al expandirse (`w-20` a `w-60`)
  * Etiquetas de menú ocultas hasta hacer hover (`group-hover`)
* **Accesibilidad:**

  * Íconos visibles siempre
  * Texto visible en hover

---

## 💡 Ejemplo de Uso

Este componente se puede usar directamente dentro de una vista principal o layout:

```tsx
<Sidebar />
```

> Asegúrate de que el `localStorage` contenga `tipoUsuario` y `rol` antes de renderizarlo, ya que esos valores determinan el contenido mostrado.

---

## 📝 Notas Adicionales

* El componente **no es responsive por defecto** (fijo a la izquierda con altura completa `h-screen`).
* Se puede envolver en un layout flexible para adaptar mejor el diseño en móviles o tablets.
* El uso de `clsx` mejora la claridad y legibilidad de las clases condicionales de Tailwind.