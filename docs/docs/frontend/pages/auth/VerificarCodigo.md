---
id: verificar-codigo
title: Pantalla de Verificación de Código
sidebar_label: VerificarCodigo.tsx
---

El componente `VerificarCodigo` permite a los usuarios **restablecer su contraseña** después de haber recibido un **código de verificación de 6 dígitos**. Incluye validación visual de contraseña, interacción con el backend, y retroalimentación clara para el usuario mediante `toast`.

---

## 🔍 Ubicación

`src/pages/auth/VerificarCodigo.tsx`

---

## 📦 Dependencias

* **React Hooks:** `useState`, `useRef`, `useEffect`
* **React Router Dom:** `useNavigate`
* **Lucide Icons:** `Shield`, `Eye`, `EyeOff`, `ArrowLeft`, `CheckCircle`
* **Custom Hooks:** `useToast`
* **Servicios:** `confirmarReset` de `authService`

---

## ⚙️ Propiedades

> El componente **no recibe props**. Toda la lógica y datos están contenidos internamente.

---

## 🧠 Lógica Interna

### 📥 Estado

| Estado               | Tipo       | Descripción                                                               |
| -------------------- | ---------- | ------------------------------------------------------------------------- |
| `code`               | `string[]` | Representa cada dígito del código de verificación ingresado (6 dígitos).  |
| `password`           | `string`   | Nueva contraseña ingresada por el usuario.                                |
| `showPassword`       | `boolean`  | Alterna la visibilidad del campo de contraseña.                           |
| `isLoading`          | `boolean`  | Muestra estado de carga durante la llamada a la API.                      |
| `passwordValidation` | `object`   | Indica si la contraseña cumple con requisitos de seguridad (5 criterios). |

### 🔁 `useEffect`

* Cada vez que `password` cambia, se actualiza `passwordValidation` con base en:

  * Longitud mínima de 8
  * Al menos una mayúscula
  * Al menos una minúscula
  * Al menos un número
  * Al menos un símbolo especial

### 🔢 Manejo de Código de Verificación

* `handleCodeChange(index, value)`

  * Actualiza el dígito en la posición `index`
  * Enfoca automáticamente el siguiente input
* `handleKeyDown(index, e)`

  * Si presiona `Backspace` en un campo vacío, vuelve al anterior

### ✅ Validaciones

* `isPasswordValid`: Retorna `true` si todos los criterios de seguridad se cumplen.
* `isCodeComplete`: Retorna `true` si los 6 dígitos están completos.

---

## 📤 `handleSubmit`

Función que:

1. Valida el código y contraseña.
2. Llama a `confirmarReset(codeString, password)` del backend.
3. Muestra `toast.success` o `toast.error` según resultado.
4. Redirige a `/` al éxito.

---

## 🧱 Estructura del Componente

1. **Contenedor Principal**

   * Pantalla centrada (`flex items-center justify-center`) con un diseño limpio (`shadow-xl`, `rounded-2xl`).

2. **Formulario**

   * Sección de ingreso de código:

     * 6 inputs individuales, con navegación automática
   * Sección de nueva contraseña:

     * Campo con botón de mostrar/ocultar
     * Validaciones visuales con íconos (`CheckCircle`)
   * Botón de envío:

     * Inactivo si no hay código completo o contraseña válida
     * Spinner visible durante carga (`Restableciendo...`)

3. **Botón Volver Atrás**

   * Usa `navigate('/recuperar-clave')` para retroceder

4. **Marca ProductTrack**

   * Pie de página con logo y nombre

---

## 🎨 Estilos y Diseño

* Usa **Tailwind CSS** para una apariencia moderna y responsiva.
* Inputs estilizados con:

  * `focus:ring-vinotinto`
  * `rounded-lg`
  * `text-lg font-semibold`
* Validaciones de contraseña en verde (`text-green-600`) si se cumplen.
* Loader con animación giratoria (`animate-spin`) mientras se envía.

---

## 💡 Ejemplo de Flujo

1. Usuario llega a la página tras solicitar recuperar contraseña.
2. Recibe un código de 6 dígitos en su correo.
3. Ingresan el código y nueva contraseña.
4. Validación visual les guía con feedback inmediato.
5. Al enviar y ser exitoso, son redirigidos al login o home.

---

## 📝 Notas Adicionales

* El componente está totalmente desacoplado del backend salvo por `confirmarReset`.
* Internamente maneja todas sus validaciones y navegación.
* Mejora la experiencia del usuario con validaciones en tiempo real y `toasts` informativos.
* Es clave que el código llegue correctamente vía email y el backend esté sincronizado con esa lógica.