---
id: login
title: Página de Login
sidebar_label: Login
---

El componente `Login` es la página de **autenticación principal** del sistema. Permite a los usuarios ingresar sus credenciales para acceder a la aplicación y maneja la lógica de autenticación, almacenamiento de tokens e información de sesión.

Además, ofrece una navegación fácil hacia el registro y recuperación de contraseña, junto con una interfaz visualmente amigable.

---

## 🔍 Ubicación

`src/pages/auth/Login.tsx`

---

## 📦 Dependencias

* **Iconos**:

  * `react-icons` → `FaEnvelope`, `FaLock`
  * `lucide-react` → `Eye`, `EyeOff` (mostrar/ocultar contraseña)
* **Routing y navegación**:

  * `useNavigate` (de `react-router-dom`)
* **Componentes internos**:

  * `LandingInfo` → sección informativa post-login
  * `Footer` → pie de página común
* **Contextos y hooks**:

  * `useUser` (contexto para el usuario)
  * `useToast` (para notificaciones)
* **Constantes**:

  * `url` (endpoint base del backend)

---

## ⚙️ Estado y Hooks

| Estado         | Tipo      | Descripción                              |
| -------------- | --------- | ---------------------------------------- |
| `email`        | `string`  | Correo del usuario ingresado             |
| `password`     | `string`  | Contraseña ingresada                     |
| `showPassword` | `boolean` | Controla si se muestra la contraseña     |
| `useNavigate`  | Hook      | Permite redirigir tras login exitoso     |
| `setUsuario`   | Context   | Guarda el usuario en el contexto global  |
| `toast`        | Hook      | Muestra mensajes de error o confirmación |

> También se usa un `useEffect` para hacer **scroll al tope de la página** al cargarla.

---

## 🔐 Autenticación

### 📤 `handleLogin` – Función principal

Realiza una solicitud `POST` a `/auth/login` con los datos del formulario.

#### 🧪 Validaciones

* Si las credenciales no son válidas: lanza un error y muestra un `toast`.

#### 📦 Almacenamiento en `localStorage`

Guarda los siguientes datos al iniciar sesión:

| Clave                 | Contenido                                   |
| --------------------- | ------------------------------------------- |
| `token`               | Token JWT de autenticación                  |
| `tipoUsuario`         | `"INDIVIDUAL" \| "EMPRESARIAL" \| "EQUIPO"` |
| `rol`                 | Rol del usuario dentro de la plataforma     |
| `username`            | Nombre visible del usuario                  |
| `perfilCompleto`      | `"true"` si aún debe completar perfil       |
| `rolEquipo`           | Rol dentro del equipo                       |
| `userId`, `idUsuario` | ID único del usuario                        |

#### 🧭 Redirección

* Si es un usuario con rol `"EQUIPO"` y su perfil aún no está completo, lo redirige a `/completar-perfil`.
* De lo contrario, lo lleva al dashboard raíz (`/`).

---

## 🧱 Estructura del Componente

El layout de la página está dividido en dos columnas:

```tsx
<div className="flex">
  <div className="bg-[#35492c]"> ... lado izquierdo de bienvenida ... </div>
  <div className="p-6"> ... formulario de login ... </div>
</div>
```

### 🟩 Lado izquierdo

* Mensaje de bienvenida
* Botón para navegar a `/register`

### 🟨 Lado derecho

* Formulario de login

  * Campo de correo
  * Campo de contraseña con botón para mostrar/ocultar
  * Enlace a recuperación de contraseña (`/recuperar-clave`)
  * Botón de envío

---

## 🎨 Estilos y Diseño

* Utiliza **Tailwind CSS** para una apariencia moderna y responsiva.
* Usa clases como `rounded-full`, `shadow-lg`, `bg-[#35492c]`, `hover:bg-yellow-700` para mejorar la UX.
* Pensado para **pantallas móviles y de escritorio** (`flex-col md:flex-row`).

---

## 💡 Flujo de Usuario

1. Usuario accede a la página `/login`
2. Ingresa correo y contraseña
3. El sistema:

   * Verifica credenciales
   * Guarda datos necesarios
   * Redirige según su rol y estado de perfil
4. Si hay un error → se muestra un `toast` con el mensaje

---

## 📌 Comportamientos Especiales

* El componente **nunca renderiza anuncios (`AdModal`)** porque está diseñado para enfocarse solo en el login.
* Hace scroll automático al top al cargar.
* Es parte del flujo de autenticación junto con:

  * `/register` → página de registro
  * `/recuperar-clave` → recuperación de contraseña
  * `/completar-perfil` → solo si es equipo sin perfil completo

---

## 📝 Ejemplo de Uso

Este componente es una **ruta independiente** y no debe envolverse en `Layout.tsx`.

```tsx
<Route path="/login" element={<Login />} />
```