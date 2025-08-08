---

id: header-product-track
title: Encabezado
sidebar_label: Header

---

El componente `Header` representa la **barra superior fija del panel de control** en ProductTrack. Contiene elementos de la parte derecha como **notificaciones**, **centro de ayuda** y un **avatar de usuario**.

---

## 🔍 Ubicación

`src/components/producttrack/Header.tsx`

---

## 📦 Dependencias

* [`NotificationBell`](./NotificationBell.md): Componente de campana de notificaciones, importado y renderizado dentro del header.

---

## ⚙️ Propiedades

Este componente **no recibe propiedades**. Su contenido es estático y de propósito general para toda la vista principal de ProductTrack.

---

## 🧠 Lógica Interna

* No contiene hooks ni estado.
* La única lógica interna está relacionada con la estructura del layout.

---

## 🧱 Estructura y Diseño

* **Campana de notificaciones:** Incluye el componente `NotificationBell`.
* **Avatar de usuario:** Un círculo verde oliva con la inicial "U" (placeholder).

---

## 💡 Estilos

* Usa clases de Tailwind CSS.
* Sombra sutil (`shadow-sm`), fondo blanco puro y borde inferior gris claro translúcido.
* El diseño es responsive: algunos elementos solo aparecen en pantallas mayores (`sm`).

---

## 🧪 Ejemplo de Visualización

```tsx
<Header />
```

Este encabezado se usa típicamente como parte de un layout principal:

```tsx
<div className="min-h-screen">
  <Header />
  <main className="p-6">Contenido principal aquí</main>
</div>
```

---

## 📝 Notas Adicionales

* El avatar y texto del usuario están actualmente hardcoded. Para una versión más dinámica, podrían conectarse con datos reales del usuario autenticado.
* Es posible extender este componente para incluir navegación lateral, breadcrumb o íconos adicionales.