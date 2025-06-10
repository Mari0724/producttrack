---
id: login
title: Login
sidebar_label: Login
---

# Componente Login.tsx

Implementa la página de **Inicio de sesión** para la aplicación. Está ubicado en la carpeta `pages` y maneja la entrada del usuario para email y contraseña, así como el inicio de sesión estándar y con Google.

---

## 🔍 Ubicación

`src/pages/Login.tsx`

---

## Descripción general

`Login.tsx` es un componente funcional de React que contiene:

- Formularios controlados para email y contraseña.
- Botón para iniciar sesión con credenciales propias.
- Botón para iniciar sesión con Google (pendiente de integración).
- Navegación hacia la página de registro.
- Estilos responsivos con Tailwind CSS.

---

## Importaciones principales

```tsx
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
````

* `useState` para manejar el estado local de los inputs.
* Iconos de `react-icons/fa` para mostrar íconos en los inputs y botón de Google.
* `useNavigate` de `react-router-dom` para navegación programática.

---

## Estado local

* `email` (string): almacena el correo electrónico ingresado.
* `password` (string): almacena la contraseña ingresada.

---

## Funciones

### `handleLogin`

```
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    // Aquí iría la lógica de autenticación con backend
    console.log("Iniciar sesión con:", { email, password });
    alert("Inicio de sesión exitoso ✅");
  } catch (error) {
    alert("Error al iniciar sesión ❌");
  }
};
```

* Previene el envío por defecto del formulario.
* Aquí debe implementarse la autenticación real con el backend.
* Actualmente muestra alertas para éxito o error.

### `handleGoogleLogin`

```tsx
const handleGoogleLogin = () => {
  // Aquí se debería integrar Google Auth (OAuth2 o Firebase)
  console.log("Iniciar sesión con Google");
};
```

* Función placeholder para integrar autenticación con Google.

---

## Estructura del JSX

El componente está dividido en dos secciones principales dentro de un contenedor flexible:

### Panel izquierdo (bienvenida y registro)

* Fondo verde oscuro.
* Mensaje de bienvenida.
* Botón para navegar a la página de registro (`/register`).

### Panel derecho (formulario de inicio de sesión)

* Título "Iniciar sesión".
* Formulario con campos:

  * Correo electrónico (input con ícono `FaEnvelope`).
  * Contraseña (input con ícono `FaLock`).
* Botón para enviar el formulario (iniciar sesión).
* Botón para iniciar sesión con Google (con ícono `FaGoogle`).

---

## Estilos

* Se usa Tailwind CSS para diseño responsivo y moderno.
* Bordes redondeados, sombras y colores personalizados.
* Efectos hover y foco para mejorar UX.

---

## Uso

Para usar este componente, simplemente importarlo y colocar la ruta `/login` en el sistema de rutas del proyecto.

---

## Próximos pasos

* Implementar conexión real con backend para autenticación.
* Integrar Google OAuth o Firebase Authentication en `handleGoogleLogin`.
* Mejorar manejo de errores y mostrar mensajes en UI.
* Añadir validaciones de formulario (email válido, contraseña no vacía).

