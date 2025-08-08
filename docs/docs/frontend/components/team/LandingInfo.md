---
id: landing-info
title: Información Pública de Inicio
sidebar_label: LandingInfo

---

El componente `LandingInfo` funciona como la **sección de bienvenida** o introducción en la página pública del sistema. Presenta una descripción clara del propósito de la plataforma y destaca las **características principales** del producto de forma visual y concisa.

---

## 🔍 Ubicación

`src/components/team/LandingInfo.tsx`

---

## 📦 Dependencias

* **Lucide React:** Íconos visuales:

  * `ScanSearch`
  * `Package`
  * `History`
  * `Bell`
  * `Smartphone`
  * `Shield`

---

## 🧱 Estructura del Componente

El componente está dividido en **dos secciones principales**:

### 1. 🟩 Hero (Sección de Bienvenida)

* Fondo en verde oliva (`bg-olive`).
* Texto blanco centrado.
* Incluye:

  * Título grande: `¿Qué hacemos?`
  * Descripción clara y directa del propósito del sistema: escanear, organizar, alertar.

### 2. 💡 Características Principales

* Contenido centrado en un contenedor con `padding` generoso.
* Título: `Características principales` (color burgundy).
* Grid responsiva con 6 tarjetas informativas:

  * Cada tarjeta incluye:

    * Icono representativo (`Lucide`).
    * Título de la característica.
    * Descripción breve.

**Lista de características:**

| Ícono           | Título                 | Descripción                                             |
| --------------- | ---------------------- | ------------------------------------------------------- |
| 🔍 `ScanSearch` | NutriScan              | Escanea productos y muestra su información nutricional. |
| 📦 `Package`    | Gestión de Inventario  | Controla tus productos en tiempo real.                  |
| ⏳ `History`     | Historial de Productos | Consulta los cambios recientes.                         |
| 🔔 `Bell`       | Alertas Inteligentes   | Recibe notificaciones personalizadas.                   |
| 📱 `Smartphone` | Multiplataforma        | Accede desde cualquier dispositivo.                     |
| 🛡️ `Shield`    | Seguridad Total        | Protección completa de tus datos.                       |

---

## 🎨 Estilos y Diseño

* Usa **Tailwind CSS** para layout, colores y tipografía.
* Responsive:

  * En pantallas medianas: 2 columnas (`md:grid-cols-2`)
  * En pantallas grandes: 3 columnas (`lg:grid-cols-3`)
* Tarjetas con:

  * Fondo blanco.
  * Bordes redondeados (`rounded-xl`).
  * Sombra y borde sutil para realce visual.

---

## 🧠 Comportamiento

* Componente totalmente **estático y presentacional**.
* No tiene estado, props ni lógica de negocio.
* Se puede colocar en la **landing page pública** de la app.

---

## 💡 Ejemplo de Uso

```tsx
import LandingInfo from "@/components/team/LandingInfo";

function PublicHome() {
  return (
    <div>
      <LandingInfo />
      {/* Aquí podrías añadir más secciones como testimonios, CTA, etc. */}
    </div>
  );
}
```

---

## 📌 Notas Adicionales

* ✅ Ideal para mostrar el valor de la plataforma a usuarios nuevos.
* 🧩 Fácil de extender con nuevas características o íconos.
* ♿ Accesible gracias al uso semántico de encabezados y texto descriptivo.
* 🧪 No incluye navegación ni llamadas a acciones; solo informativo.