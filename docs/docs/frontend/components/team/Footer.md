---
id: footer
title: Pie de Página General
sidebar_label: Footer

---

El componente `Footer` representa el **pie de página** del sitio, proporcionando información institucional, enlaces legales y datos de contacto. Es una sección estática que aparece en la parte inferior de la mayoría de las vistas del sistema.

---

## 🔍 Ubicación

`src/components/team/Footer.tsx`

---

## 📦 Dependencias

* **React Router:** [`Link`](https://reactrouter.com/en/main/components/link) para navegación interna.
* **Lucide React:** Íconos `FileText` y `Shield`.

---

## 🧱 Estructura del Componente

1. **Contenedor Principal**

   * Fondo blanco con borde superior (`border-t`).
   * Padding vertical generoso (`py-12`).

2. **Contenido Central (Grid)**

   * Diseño en cuadrícula: `md:grid-cols-4`, dividido en:

     * 🧾 **Sección de marca:**

       * Logo "ProductTrack" con tipografía personalizada.
       * Descripción general de la plataforma.
       * Correo de contacto (`producttrack5@gmail.com`).
       * Íconos decorativos "P" y "T".
     * ⚖️ **Sección Legal:**

       * Título "Legal".
       * Enlaces a:

         * Términos y Condiciones (`/terminos-y-condiciones`)
         * Política de Privacidad (`/politica-de-privacidad`)
       * Cada enlace usa un ícono: `FileText` y `Shield`.

3. **Pie Inferior**

   * Línea divisoria superior (`border-t`).
   * Texto centrado: `© 2025 ProductTrack. Todos los derechos reservados.`

---

## 🎨 Estilos y Diseño

* Construido con **Tailwind CSS**:

  * Colores personalizados: `burgundy`, `golden`, `olive`, `light-gray`.
  * Uso de `flex`, `grid`, `space`, `text`, `border`, `rounded` y `hover`.
* Diseño **responsive**:

  * Layout en columna en dispositivos pequeños.
  * En columnas separadas en pantallas medianas o mayores (`md:grid-cols-4`).

---

## 🧠 Comportamiento

* Componente **estático** (sin estado ni lógica dinámica).
* Navegación **client-side** gracias al uso de `Link` de React Router.
* Íconos visuales que **refuerzan el propósito** de los enlaces legales.

---

## 💡 Ejemplo de Uso

Este componente se puede usar en el layout principal de la app para que aparezca en todas las vistas:

```tsx
import Footer from "@/components/team/Footer";

function Layout() {
  return (
    <>
      <main className="min-h-screen">{/* contenido dinámico */}</main>
      <Footer />
    </>
  );
}
```

---

## 📌 Notas Adicionales

* **Responsive-friendly**: se adapta a distintos tamaños de pantalla.
* Extensible: puedes añadir redes sociales, links de ayuda o versión del sistema.
* Accesible: los íconos tienen propósito visual, pero no interrumpen el flujo semántico.