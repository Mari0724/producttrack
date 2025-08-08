---
id: security-settings
title: Configuración de Seguridad
sidebar_label: SecuritySettings

---

El componente `SecuritySettings` permite a los usuarios cambiar su contraseña desde la configuración de su cuenta. Incluye una interfaz para iniciar el proceso, un modal con campos seguros y consejos de seguridad para proteger sus credenciales.

---

## 🔍 Ubicación

`src/components/team/SecuritySettings.tsx`

---

## 📦 Dependencias

* **React:** Hooks como `useState`
* **Lucide React:**

  * `Lock`, `Shield` – íconos de interfaz
  * `Eye`, `EyeOff` – para alternar visibilidad de contraseña

---

## ⚙️ Propiedades

| Propiedad                 | Tipo                                                                        | Descripción                                                        |
| ------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `passwordData`            | `{ currentPassword: string; newPassword: string; confirmPassword: string }` | Objeto con los valores de las contraseñas actuales y nuevas        |
| `setPasswordData`         | `Dispatch<SetStateAction<passwordData>>`                                    | Setter para actualizar los valores del formulario                  |
| `showPassword`            | `{ current: boolean; new: boolean; confirm: boolean }`                      | Controla la visibilidad de cada campo de contraseña                |
| `setShowPassword`         | `Dispatch<SetStateAction<showPassword>>`                                    | Setter para actualizar la visibilidad de cada campo                |
| `isPasswordDialogOpen`    | `boolean`                                                                   | Determina si el modal de cambio de contraseña está abierto         |
| `setIsPasswordDialogOpen` | `(open: boolean) => void`                                                   | Setter para mostrar u ocultar el modal                             |
| `handlePasswordSubmit`    | `() => void`                                                                | Función que maneja el envío del formulario de cambio de contraseña |

---

## 🧠 Lógica Interna

* El componente muestra una sección inicial con un botón para abrir el **modal**.
* Dentro del modal:

  * Se renderizan tres campos: contraseña actual, nueva contraseña, confirmar nueva contraseña.
  * Cada campo permite alternar visibilidad mediante un ícono (👁️ / ❌).
  * Los valores son controlados desde `passwordData`.
  * El botón de envío llama a `handlePasswordSubmit`.

---

## 📤 Estructura del Componente

1. **Sección de Configuración**

   * Título: "Configuración de Seguridad"
   * Botón: "Cambiar Contraseña" (con ícono `Lock`)
2. **Bloque de Consejos de Seguridad**

   * Ícono `Shield`
   * Lista de recomendaciones útiles para una contraseña segura
3. **Modal de Cambio de Contraseña** (si `isPasswordDialogOpen` es `true`)

   * Tres campos de texto (`current`, `new`, `confirm`)
   * Botón para cancelar y botón para confirmar el cambio

---

## 🔒 Consejos de Seguridad Mostrados

* Usar al menos 8 caracteres
* Combinar mayúsculas, minúsculas, números y símbolos
* No compartir contraseñas
* Cambiar contraseñas periódicamente

---

## 🎨 Estilos y Diseño

* **Colores corporativos:** `#667233` (verde oliva), `#f6f6e3` (fondo modal), `#fefce8` (sección de tips)
* **Diseño modal:** centrado, con fondo oscuro translúcido y sombra
* **Inputs:** con visibilidad toggle y validación visual
* **Botones:** estilos diferenciados para acción principal y cancelación

---

## 💡 Ejemplo de Uso

```tsx
<SecuritySettings
  passwordData={passwordData}
  setPasswordData={setPasswordData}
  showPassword={showPassword}
  setShowPassword={setShowPassword}
  isPasswordDialogOpen={isPasswordDialogOpen}
  setIsPasswordDialogOpen={setIsPasswordDialogOpen}
  handlePasswordSubmit={handlePasswordSubmit}
/>
```

---

## 📝 Notas Adicionales

* Este componente no realiza validación por sí mismo, pero está preparado para integrarse con lógica externa.
* Se recomienda conectar `handlePasswordSubmit` con un endpoint seguro en el backend.
* El diseño mobile-friendly facilita la usabilidad desde celulares.