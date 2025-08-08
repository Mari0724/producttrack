---
id: ad-modal
title: Modal de Anuncio Temporizado
sidebar_label: AdModal.tsx

---

El componente `AdModal` muestra un **modal de anuncio con imagen**, que permanece visible durante un tiempo determinado antes de permitir al usuario cerrarlo. Es útil para mostrar promociones, alertas visuales o mensajes importantes con un retardo controlado.

---

## 🔍 Ubicación

`src/components/team/AdModal.tsx`

---

## 📦 Dependencias

* **React:** `useState`, `useEffect`

---

## ⚙️ Propiedades

| Propiedad      | Tipo         | Requerido | Descripción                                               |
| -------------- | ------------ | --------- | --------------------------------------------------------- |
| `imageUrl`     | `string`     | ✔️ Sí     | URL de la imagen que se muestra en el anuncio.            |
| `delayToClose` | `number`     | ✔️ Sí     | Tiempo en segundos antes de permitir cerrar el modal.     |
| `open`         | `boolean`    | ✔️ Sí     | Controla si el modal se muestra (`true`) o no (`false`).  |
| `onClose`      | `() => void` | ✔️ Sí     | Función que se ejecuta cuando el usuario cierra el modal. |

---

## 🧠 Lógica Interna

### 📥 Estado

| Estado          | Tipo      | Descripción                                                             |
| --------------- | --------- | ----------------------------------------------------------------------- |
| `canClose`      | `boolean` | Indica si el usuario ya puede cerrar el modal.                          |
| `remainingTime` | `number`  | Tiempo restante (en segundos) hasta que se habilite el botón de cierre. |

---

### 📤 `useEffect`

Se ejecuta cada vez que el modal se abre (`open === true`):

1. Resetea `canClose` a `false` y `remainingTime` al valor de `delayToClose`.
2. Inicia un **temporizador (`setInterval`)** que reduce `remainingTime` cada segundo.
3. Cuando `remainingTime` llega a 0:

   * Detiene el temporizador
   * Permite cerrar el modal (`setCanClose(true)`)

---

## 🧱 Estructura del Componente

1. **Contenedor:**

   * Cubre toda la pantalla (`fixed inset-0`)
   * Fondo oscuro (`bg-black bg-opacity-70`)
   * Centrado con `flex`

2. **Modal:**

   * Caja blanca redondeada (`bg-white rounded-lg`)
   * Imagen con `max-h-96` y espaciado (`mb-4`)
   * Si el usuario **no puede cerrar aún**, se muestra un mensaje de espera
   * Si puede cerrar, aparece un botón estilizado que llama a `onClose`

---

## 🎨 Estilos y Diseño

* Modal centrado, con fondo atenuado y caja con sombra
* Imagen ajustada visualmente con `rounded`, `max-h-96`, y centrado
* Botón de cierre con estilo **rosado fuerte**:

  * `bg-rose-700` + `hover:bg-rose-800`
  * Tipografía blanca (`text-white`)
  * Bordes redondeados (`rounded`)
* Contenido accesible y responsivo

---

## 💡 Ejemplo de Uso

```tsx
import AdModal from "./AdModal";

<AdModal
  imageUrl="https://miapp.com/anuncio.png"
  delayToClose={5}
  open={mostrarAnuncio}
  onClose={() => setMostrarAnuncio(false)}
/>
```

---

## 📝 Notas Adicionales

* **Control de tiempo preciso:** Utiliza `setInterval` para actualizar el contador cada segundo.
* **No se puede cerrar inmediatamente:** Previene que el usuario omita el anuncio sin leerlo.
* **Alt para accesibilidad:** El `img` incluye un atributo `alt="Anuncio"` para navegadores accesibles.
* **Limpieza del intervalo:** Se asegura de limpiar el temporizador si el componente se desmonta o reinicia.