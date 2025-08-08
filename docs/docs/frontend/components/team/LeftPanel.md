---
id: left-panel
title: Panel Izquierdo del Equipo
sidebar_label: LeftPanel
---

Este componente muestra el **panel izquierdo** de la interfaz de inicio de sesión para equipos. Ofrece un mensaje de bienvenida e invita al usuario a iniciar sesión mediante un botón. Está diseñado con una **estética elegante y centrada** en proporcionar una experiencia amigable y accesible.

---

## 🔍 Ubicación

`src/components/team/LeftPanel.tsx`

---

## ⚙️ Props

| Prop     | Tipo     | Descripción                                           |
|----------|----------|-------------------------------------------------------|
| onLogin  | `() => void` | Función que se ejecuta cuando el usuario hace clic en el botón "Iniciar Sesión". |

---

## 🧩 Descripción General

`LeftPanel` forma parte de una interfaz dividida (usualmente en combinación con un panel derecho) y está pensado para proporcionar un espacio visualmente atractivo que motive al usuario a iniciar sesión. El botón cuenta con efectos de transición y estilos adaptativos para distintas resoluciones.

---

## 🎨 Estilos Destacados

- Fondo verde oscuro (`#35492c`)
- Texto blanco y tipografía serif para los títulos
- Botón redondeado rojo oscuro (`#7a1d27`) con efecto *hover*
- Responsive: adaptado para móviles y pantallas medianas con clases de Tailwind

---

## ✅ Comportamiento

Al hacer clic en el botón **Iniciar Sesión**, se ejecuta la función `onLogin` pasada como prop. Esto permite personalizar el comportamiento del login, por ejemplo, abriendo un modal, redireccionando o autenticando al usuario.

---

## 🧪 Ejemplo de Uso

```tsx
import LeftPanel from "./LeftPanel";

const handleLogin = () => {
  console.log("Login iniciado");
};

<LeftPanel onLogin={handleLogin} />
````