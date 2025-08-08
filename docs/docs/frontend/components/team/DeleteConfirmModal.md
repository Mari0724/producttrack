---
id: delete-confirm-modal
title: Modal de Confirmación de Eliminación de Miembro
sidebar_label: DeleteConfirmModal

---

El componente `DeleteConfirmModal` muestra un **modal de confirmación** cuando se intenta eliminar a un miembro del equipo. Ofrece una advertencia clara, información del miembro a eliminar y opciones para **cancelar o confirmar** la acción de manera segura.

---

## 🔍 Ubicación

`src/components/team/DeleteConfirmModal.tsx`

---

## 📦 Dependencias

* **React:** `useState`
* **Íconos de `lucide-react`:** `X`, `AlertTriangle`
* **Custom Hook:** `useToast` para mostrar notificaciones al usuario
* **Tipos locales:** `TeamMember` desde `../../types/team`

---

## ⚙️ Propiedades

| Propiedad   | Tipo                 | Requerido | Descripción                                                     |
| ----------- | -------------------- | --------- | --------------------------------------------------------------- |
| `isOpen`    | `boolean`            | ✔️ Sí     | Controla si el modal está visible.                              |
| `member`    | `TeamMember \| null` | ✔️ Sí     | Información del miembro a eliminar (nombre, correo, etc.).      |
| `onClose`   | `() => void`         | ✔️ Sí     | Función que se ejecuta al cerrar el modal sin eliminar.         |
| `onConfirm` | `() => void`         | ✔️ Sí     | Función que se ejecuta al confirmar la eliminación del miembro. |

---

## 🧠 Lógica Interna

### 📥 Estado

| Estado       | Tipo      | Descripción                                            |
| ------------ | --------- | ------------------------------------------------------ |
| `isDeleting` | `boolean` | Indica si se está ejecutando la acción de eliminación. |

---

### 📤 Funciones

#### `handleConfirm`

* Muestra un estado de carga mientras elimina.
* Simula una espera de 500ms (puede adaptarse a llamadas reales a API).
* Llama a `onConfirm()` para realizar la acción.
* Usa `toast()` para mostrar notificación de éxito o error.
* Siempre restaura el estado final (`setIsDeleting(false)`).

---

## 🧱 Estructura del Componente

1. **Modal de fondo:**

   * Cubre la pantalla completa con fondo oscuro (`bg-black/50`)
   * Centrado con `flex` y `z-50`

2. **Caja de diálogo:**

   * Fondo blanco, esquinas redondeadas y sombra
   * Encabezado con título y botón ❌ para cerrar

3. **Cuerpo:**

   * Ícono de advertencia (`AlertTriangle`) con fondo rojo claro
   * Nombre y correo del miembro a eliminar
   * Mensaje de advertencia clara sobre la **irreversibilidad** de la acción

4. **Botones:**

   * `Cancelar`: cierra el modal sin eliminar
   * `Eliminar`: inicia proceso de eliminación (deshabilitado mientras está en progreso)

---

## 🎨 Estilos y Diseño

* Usa **Tailwind CSS** para espaciado, tipografía, color y responsividad.
* Botón de "Eliminar" utiliza clase personalizada `producttrack-button-danger`:

  * Colores rojos
  * Estados deshabilitados (`opacity-50`, `cursor-not-allowed`)
* Íconos vectoriales (`lucide-react`) con significado visual claro.
* Modal con `max-w-md` para mantener foco y claridad.

---

## 💡 Ejemplo de Uso

```tsx
import { DeleteConfirmModal } from "./DeleteConfirmModal";

<DeleteConfirmModal
  isOpen={mostrarModal}
  member={{ name: "Carlos Pérez", email: "carlos@miempresa.com", id: 12 }}
  onClose={() => setMostrarModal(false)}
  onConfirm={() => eliminarMiembro(12)}
/>
```

---

## 📝 Notas Adicionales

* Mejora la experiencia del usuario con confirmaciones visuales claras.
* Compatible con diferentes tipos de equipo y estructuras de miembro (`TeamMember`).
* Accesible con enfoque visual y semántica de acción.
* Ideal para integrarse con acciones críticas dentro de flujos administrativos o de gestión de equipos.