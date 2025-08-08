---
id: legal-page
title: Página Legal
sidebar_label: LegalPage
---

El componente `LegalPage` es una plantilla reutilizable que representa una **página legal estructurada** (como "Términos y Condiciones" o "Política de Privacidad"). Presenta secciones con contenido dinámico, título principal, fecha de última actualización y enlaces de navegación.

---

## 🔍 Ubicación

`src/components/team/LegalPage.tsx`

---

## 📦 Dependencias

* **React Router:** [`Link`](https://reactrouter.com/en/main/components/link) para redirección interna.
* **Lucide React:** [`ArrowLeft`](https://lucide.dev/icons/arrow-left) como ícono decorativo para volver al inicio.
* **Tailwind CSS:** Utilizado para el diseño responsivo, sombras, bordes y colores personalizados.

---

## ⚙️ Props

| Prop           | Tipo                                | Descripción                                                                 |
|----------------|-------------------------------------|-----------------------------------------------------------------------------|
| `title`        | `string`                            | Título principal de la página (por ejemplo: "Términos y Condiciones").     |
| `lastUpdated`  | `string`                            | Fecha de la última actualización del contenido legal.                      |
| `sections`     | `LegalSection[]`                    | Arreglo de secciones legales a renderizar (ver estructura más abajo).      |

### 🧱 Tipo: `LegalSection`

```ts
interface LegalSection {
  title: string;
  content: (string | React.ReactNode)[];
}
````

Cada sección contiene un título y un conjunto de párrafos o nodos JSX que se mostrarán en orden.

---

## 🧱 Estructura del Componente

1. **Header / Encabezado**

   * Fondo en color `olive`, texto blanco.
   * Título animado (`animate-fade-in`) con fecha de última actualización.
   * Enlace de regreso a `/register` con ícono `ArrowLeft`.

2. **Contenido Principal**

   * Contenedor central (`max-w-4xl`) con fondo blanco, sombra y bordes redondeados.
   * Renderiza múltiples secciones (`sections`) usando un `map`, cada una con:

     * Título destacado (`h2`)
     * Párrafos (`<p>`), texto o nodos React.
     * Animación progresiva (`fade-in` con delay).

3. **Footer decorativo**

   * Sección centrada con fondo blanco translúcido.
   * Elementos decorativos: círculos animados (`animate-pulse`) y texto "© 2025 ProductTrack".

---

## 🎨 Estilos y Diseño

* Utiliza Tailwind CSS extensivamente:

  * `bg-gradient-to-br`, `shadow-xl`, `rounded-2xl`, `border`, `text-burgundy`, `text-golden`.
* Fuentes personalizadas (`font-poppins`).
* Animaciones suaves: `animate-fade-in`, `transition`, `group-hover`.
* Diseño **responsivo** y **moderno** para ofrecer una experiencia clara y accesible.

---

## 🧠 Comportamiento

* **Estático** en funcionalidad: no posee hooks, estado interno ni lógica condicional.
* Totalmente **dinámico por props**:

  * El contenido de la página legal depende del array `sections` recibido.
* **Accesible** y **semántico**, con uso correcto de encabezados y listas.

---

## 💡 Ejemplo de Uso

```tsx
import LegalPage from "@/components/team/LegalPage";

const legalContent = [
  {
    title: "1. Introducción",
    content: [
      "Este documento establece los términos y condiciones de uso de ProductTrack...",
      "Al utilizar nuestros servicios, usted acepta..."
    ],
  },
  {
    title: "2. Recopilación de Datos",
    content: [
      "Recolectamos información con el fin de brindar un mejor servicio...",
    ],
  },
];

<LegalPage
  title="Términos y Condiciones"
  lastUpdated="06 de agosto de 2025"
  sections={legalContent}
/>
```

---

## 📌 Notas Adicionales

* Altamente reutilizable para **cualquier tipo de página legal**.
* Puede extenderse fácilmente para incluir anclas por sección, encabezados colapsables o marcadores de navegación.
* Estilo adaptable a diseño corporativo o institucional.