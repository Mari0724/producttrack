---
id: recuperar-clave
title: Página de Recuperación de Clave
sidebar_label: RecuperarClave
---

El componente `RecuperarClave` permite a los usuarios iniciar el proceso de recuperación de contraseña enviando su correo electrónico. Una vez enviado correctamente, se redirige al usuario a la pantalla de verificación de código (`/verificar-codigo`).

Este componente es parte fundamental del **flujo de restablecimiento de contraseña**.

---

## 🔍 Ubicación

`src/pages/auth/RecuperarClave.tsx`

---

## 📦 Dependencias

* **Routing**:

  * `useNavigate` de `react-router-dom` → para redireccionar después del envío.
* **Iconos**:

  * `Mail`, `ArrowLeft` de `lucide-react`
* **Hooks personalizados**:

  * `useToast` → notificaciones (éxito o error)
* **Servicios externos**:

  * `solicitarReset(email)` → función importada de `authService.ts`
* **Tipos**:

  * `AxiosError` (de `axios`) para manejo de errores HTTP

---

## ⚙️ Estado y Hooks

| Estado      | Tipo      | Descripción                                 |
| ----------- | --------- | ------------------------------------------- |
| `email`     | `string`  | Correo electrónico ingresado por el usuario |
| `isLoading` | `boolean` | Indica si se está enviando la solicitud     |
| `navigate`  | Hook      | Para redirigir a otras rutas                |
| `toast`     | Hook      | Muestra mensajes contextuales al usuario    |

---

## 🧠 Lógica de Envío

### 📤 `handleSubmit`

Esta función se ejecuta al enviar el formulario y sigue el siguiente flujo:

1. **Validación básica**:

   * Verifica que el campo de email no esté vacío.
   * Valida el formato del correo electrónico.

2. **Petición a backend**:

   * Llama al servicio `solicitarReset(email)` (en `authService`).
   * Si es exitoso:

     * Muestra un `toast.success`
     * Redirige a `/verificar-codigo`
   * Si ocurre un error:

     * Extrae el mensaje desde `AxiosError` y lo muestra como `toast.error`

---

## 📦 Servicios

**`solicitarReset(email: string): Promise`**

> Se espera que retorne un objeto con la propiedad `mensaje`, el cual se muestra como confirmación de éxito.

---

## 🧱 Estructura del Componente

```tsx
<div className="min-h-screen flex items-center justify-center">
  <div className="max-w-md"> ... formulario ... </div>
</div>
```

### 🟩 Sección principal

* Título: **"Recuperar Contraseña"**
* Descripción: instrucciones breves
* Campo de correo electrónico (con ícono a la izquierda)
* Botón de envío con loader (`Enviando...`)
* Botón para volver a inicio (`/`)

### 🎨 Detalles visuales

* Estilo limpio y centrado (`font-poppins`)
* Usa clases personalizadas como:

  * `bg-verde-oliva`
  * `text-vinotinto`
  * `border-gris-claro`
* Iconos SVG animados (`lucide-react`)

---

## 🧭 Navegación

| Acción           | Ruta destino        |
| ---------------- | ------------------- |
| Envío exitoso    | `/verificar-codigo` |
| Volver al inicio | `/`                 |

---

## 💡 Validaciones

| Validación                                          | Mensaje                                            |
| --------------------------------------------------- | -------------------------------------------------- |
| Campo vacío                                         | `"Por favor ingresa tu correo electrónico"`        |
| Email inválido (regex)                              | `"Por favor ingresa un correo electrónico válido"` |
| Error de backend (por ejemplo, email no registrado) | Mensaje personalizado desde `response.data`        |

---

## 🌀 Carga y Feedback Visual

* El botón de envío muestra un spinner animado (`animate-spin`) mientras `isLoading` es `true`.
* Se desactiva automáticamente para evitar múltiples envíos simultáneos (`disabled:bg-gray-300`).

---

## 📝 Ejemplo de Uso

Esta página es parte del flujo de recuperación de clave. Se puede incluir en tu enrutador de esta forma:

```tsx
<Route path="/recuperar-clave" element={<RecuperarClave />} />
```