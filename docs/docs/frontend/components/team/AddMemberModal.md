---
id: add-member-modal
title: Modal para Agregar Miembro
sidebar_label: AddMemberModal.tsx

---

El componente `AddMemberModal` muestra un **modal con formulario** para agregar un nuevo miembro al equipo. Permite capturar el nombre, correo, contraseña y rol del nuevo usuario, con validaciones integradas y una interfaz amigable.

---

## 🔍 Ubicación

`src/components/team/AddMemberModal.tsx`

---

## 📦 Dependencias

* **React:** `useState`
* **Iconos (Lucide):**

  * `X`, `User`, `Mail`, `Lock`, `Eye`, `EyeOff`, `Shield`
* **Tipos:**

  * `TeamMember`, `UserRole` desde `../../types/team`
* **Hooks personalizados:**

  * `useToast` para mostrar notificaciones

---

## ⚙️ Propiedades

| Propiedad | Tipo                                                              | Requerido | Descripción                                                          |
| --------- | ----------------------------------------------------------------- | --------- | -------------------------------------------------------------------- |
| `isOpen`  | `boolean`                                                         | ✔️ Sí     | Determina si el modal se muestra o no.                               |
| `onClose` | `() => void`                                                      | ✔️ Sí     | Función que se ejecuta al cerrar el modal.                           |
| `onAdd`   | `(member: Omit<TeamMember, "id"> & { password: string }) => void` | ✔️ Sí     | Función que se ejecuta al confirmar el registro de un nuevo miembro. |

---

## 🧠 Lógica Interna

### 📥 Estado

| Estado         | Tipo                              | Descripción                                              |
| -------------- | --------------------------------- | -------------------------------------------------------- |
| `formData`     | `{ name, email, password, role }` | Datos del nuevo miembro a agregar                        |
| `errors`       | `Record<string, string>`          | Mapeo de errores por campo                               |
| `isSubmitting` | `boolean`                         | Controla el estado de envío para evitar múltiples envíos |
| `showPassword` | `boolean`                         | Muestra u oculta la contraseña                           |

---

### 📤 Funciones

#### `validateForm`

Valida todos los campos del formulario y establece errores en caso de:

* Nombre vacío o con menos de 2 caracteres
* Email inválido
* Contraseña con:

  * Menos de 8 caracteres
  * Sin mayúsculas, minúsculas, número o símbolo

#### `handleInputChange`

Actualiza un campo específico del `formData` y limpia su error correspondiente si existía.

#### `handleSubmit`

Valida el formulario, muestra feedback, y llama a `onAdd` con los datos. Simula una espera con `setTimeout` y reinicia el formulario si todo sale bien.

#### `toast`

Usado para mostrar mensajes de éxito o error al usuario.

---

## 🧱 Estructura del Componente

1. **Modal:**

   * Fondo oscuro semitransparente
   * Centrado y responsivo con `max-w-md`
   * Cierre con botón (`X`) en la esquina superior derecha

2. **Formulario:**

   * **Nombre completo:** con ícono `User`, validación y placeholder
   * **Correo electrónico:** con ícono `Mail` y validación de formato
   * **Contraseña:** con ícono `Lock`, alternancia visual (`Eye`/`EyeOff`) y validación robusta
   * **Rol:** con ícono `Shield` y selector con tres opciones (`LECTOR`, `COMENTARISTA`, `EDITOR`)
   * **Botones:**

     * `Cancelar`: llama a `onClose`
     * `Agregar Miembro`: llama a `handleSubmit`, muestra estado de envío

---

## 🎨 Estilos y Diseño

* Totalmente estilizado con **Tailwind CSS**
* Componentes con `focus`, `hover`, `disabled`, y `transition-colors`
* Colores personalizados para ProductTrack (`producttrack-olive`)
* Modal accesible y responsivo
* Inputs con íconos posicionados dentro (`absolute left-3`)
* Mensajes de error claramente visibles bajo cada campo

---

## 💡 Ejemplo de Uso

```tsx
import { AddMemberModal } from "./AddMemberModal";

<AddMemberModal
  isOpen={mostrarModal}
  onClose={() => setMostrarModal(false)}
  onAdd={(nuevoMiembro) => {
    console.log("Nuevo miembro:", nuevoMiembro);
    // Aquí iría la lógica para enviar a backend
  }}
/>
```

---

## 📝 Notas Adicionales

* **Contraseña segura:** El componente exige contraseñas con criterios de seguridad estrictos (longitud, mayúsculas, símbolos…).
* **Validación completa:** Todas las entradas críticas son validadas antes de enviar.
* **Toasts amigables:** Mensajes de éxito o error acompañan al usuario en su flujo.
* **Formulario reiniciable:** Al agregar un miembro exitosamente, se limpian los campos.
* **UX mejorado:** Permite mostrar u ocultar la contraseña fácilmente.