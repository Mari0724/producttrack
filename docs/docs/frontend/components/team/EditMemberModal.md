---
id: edit-member-modal
title: Modal para Editar Miembro del Equipo
sidebar_label: EditMemberModal

---

El componente `EditMemberModal` muestra un **modal interactivo** para editar la información de un miembro del equipo. Permite modificar su **nombre, correo electrónico y rol**, validando los campos antes de enviar los cambios. Es útil para mantener los datos del equipo actualizados de forma segura y sencilla.

---

## 🔍 Ubicación

`src/components/team/EditMemberModal.tsx`

---

## 📦 Dependencias

* **React:** `useState`, `useEffect`
* **Íconos de `lucide-react`:** `X`, `User`, `Mail`, `Shield`
* **Hook personalizado:** `useToast` para mostrar notificaciones
* **Tipos locales:** `TeamMember`, `UserRole` desde `../../types/team`

---

## ⚙️ Propiedades

| Propiedad | Tipo                                       | Requerido | Descripción                                                             |
| --------- | ------------------------------------------ | --------- | ----------------------------------------------------------------------- |
| `isOpen`  | `boolean`                                  | ✔️ Sí     | Controla la visibilidad del modal.                                      |
| `member`  | `TeamMember \| null`                       | ✔️ Sí     | Información actual del miembro a editar.                                |
| `onClose` | `() => void`                               | ✔️ Sí     | Función que cierra el modal sin guardar cambios.                        |
| `onEdit`  | `(member: Omit<TeamMember, "id">) => void` | ✔️ Sí     | Función que se llama con los datos editados para actualizar el miembro. |

---

## 🧠 Lógica Interna

### 📥 Estado

| Estado         | Tipo                                              | Descripción                                                      |
| -------------- | ------------------------------------------------- | ---------------------------------------------------------------- |
| `formData`     | `{ name: string, email: string, role: UserRole }` | Contiene los datos del formulario.                               |
| `errors`       | `Record<string, string>`                          | Guarda mensajes de error por campo si hay validaciones fallidas. |
| `isSubmitting` | `boolean`                                         | Indica si el formulario está siendo enviado.                     |

---

### 📤 Funciones

#### `validateForm()`

* Verifica que:

  * El nombre no esté vacío y tenga mínimo 2 caracteres.
  * El email no esté vacío y tenga un formato válido.
* Retorna `true` si es válido, `false` si hay errores.

#### `handleSubmit(e)`

* Previene el envío por defecto del formulario.
* Ejecuta validación.
* Simula una espera de 500ms y luego llama a `onEdit`.
* Muestra notificaciones con `toast()` según el resultado.

#### `handleInputChange(field, value)`

* Actualiza el valor del campo en el estado.
* Limpia errores si ya fueron corregidos.

---

## 🧱 Estructura del Componente

1. **Modal base:**

   * Fondo negro translúcido.
   * Centrado con `z-50`.

2. **Encabezado:**

   * Título "Editar Miembro".
   * Botón para cerrar (`X`).

3. **Formulario:**

   * Campos:

     * **Nombre completo** (con ícono `User`)
     * **Correo electrónico** (con ícono `Mail`)
     * **Rol asignado** (con ícono `Shield`, selector con 3 opciones)
   * Muestra errores de validación debajo de cada campo cuando aplica.

4. **Acciones:**

   * Botón "Cancelar": cierra sin guardar.
   * Botón "Guardar Cambios": envía el formulario (deshabilitado durante el envío).

---

## 🎨 Estilos y Diseño

* Usa **Tailwind CSS** para espaciado, colores, foco y transiciones.
* Inputs personalizados con íconos para mejor usabilidad.
* Rol se elige con un `select`, ofreciendo descripciones útiles.
* Botones estilizados:

  * **Cancelar:** botón secundario claro.
  * **Guardar:** clase `producttrack-button-primary`, con estados de desactivación.

---

## 💡 Ejemplo de Uso

```tsx
import { EditMemberModal } from "./EditMemberModal";

<EditMemberModal
  isOpen={mostrarModal}
  member={{
    id: 2,
    name: "Laura Pérez",
    email: "laura@miempresa.com",
    role: "EDITOR",
    estado: "ACTIVO"
  }}
  onClose={() => setMostrarModal(false)}
  onEdit={(datosEditados) => actualizarMiembro(datosEditados)}
/>
```

---

## 📝 Notas Adicionales

* Ideal para integrarse con dashboards de administración de equipos.
* No se permite editar el `id` ni el estado desde este modal.
* Mejora accesibilidad visual con íconos e indicadores de error.
* Flexible para extender con más campos en el futuro (ej: teléfono, área).