---

id: notification-bell
title: Campanita de Notificaciones
sidebar_label: NotificationBell.tsx

---

El componente `NotificationBell` muestra una **campanita interactiva** que abre un panel desplegable con las notificaciones personalizadas del usuario.
Permite **leer y marcar como leídas** y visualizar detalles de cada notificación, brindando una experiencia clara y centralizada de alertas.

---

## 🔍 Ubicación

`src/components/producttrack/NotificationBell.tsx`

---

## 📦 Dependencias

* **React Hooks:** `useState`, `useRef`, `useEffect`
* **Iconos de `lucide-react`:** `Bell`, `Edit`, `X`, `MessageSquare`, `Check`
* **API personalizada:**

  * `getNotificacionesUsuario`
  * `marcarNotificacionLeida`
  * `getProductosDelUsuario`
  * `getPreferenciasUsuario`

---

## ⚙️ Propiedades

> Este componente **no recibe Propiedades** directamente. Utiliza datos del usuario autenticado desde `localStorage`.

---

## 🧠 Lógica Interna

### 📥 Estado

| Estado                    | Tipo                   | Descripción                                                 |
| ------------------------- | ---------------------- | ----------------------------------------------------------- |
| `isOpen`                  | `boolean`              | Controla si el dropdown está abierto                        |
| `notifications`           | `Notification[]`       | Lista completa de notificaciones del usuario                |
| `selectedNotification`    | `Notification \| null` | Notificación seleccionada para mostrar en modal             |
| `nombresProductosUsuario` | `string[]`             | Lista de nombres de productos del usuario (modo individual) |
| `preferencias`            | `object`               | Preferencias del usuario sobre tipos de notificaciones      |

### 🔎 Filtro Inteligente

* Filtra las notificaciones según el tipo de usuario (`INDIVIDUAL` o `EMPRESARIAL`) y sus preferencias.
* Las notificaciones tipo `STOCK_BAJO`, `PRODUCTO_VENCIDO`, `COMENTARIO_EQUIPO`, etc., son evaluadas y filtradas dinámicamente.

### 🔁 `useEffect`

* Al montar el componente:

  * Obtiene notificaciones, preferencias del usuario y productos (si es usuario individual).
  * Almacena resultados en el estado.

### 📤 Funciones Auxiliares

* `getIcon(tipo)`: Retorna el ícono correspondiente al tipo de notificación.
* `getIconBg(tipo)`: Devuelve el fondo apropiado para el ícono.
* `formatTimestamp(fecha)`: Formatea fechas como "hace 5 min", "hace 2h" o fecha completa.
* `markAsRead(id)`: Marca una notificación como leída tanto en el backend como en el estado local.
* `cerrarModal()`: Cierra el modal de detalle.

---

## 🧱 Estructura del Componente

1. **Modal de Detalle**

   * Muestra información completa de la notificación seleccionada.
   * Se cierra manualmente con la ❌.

2. **Campanita**

   * Ícono principal (`Bell`)
   * Animación si hay nuevas notificaciones
   * Badge con conteo de no leídas (máx. 9+)

3. **Dropdown de Notificaciones**

   * **Encabezado**: Título y cantidad de nuevas
   * **Cuerpo**: Lista con cada notificación

     * Ícono representativo
     * Título, mensaje, fecha
     * Botón opcional para marcar como leída
     * Indicador rojo si no ha sido leída

---

## 🎨 Estilos y Diseño

* Usa **Tailwind CSS** para diseño responsivo, bordes redondeados, sombras suaves y animaciones:

  * `animate-fade-in`
  * `animate-bell-ring` (para atención)
  * `hover:bg-gray-light/10`
  * Badge animado con `animate-scale-in`
* Cada tipo de notificación tiene color e ícono específico.
* Dropdown con scroll (`max-h-96 overflow-y-auto`) si excede el largo.

---

## 💡 Ejemplo de Uso

```tsx
import NotificationBell from './NotificationBell';

const Header = () => (
  <div className="flex justify-end p-4">
    <NotificationBell />
  </div>
);
```

> ⚠️ El componente requiere que el usuario esté autenticado, con `localStorage` conteniendo:
>
> * `"idUsuario"`: número
> * `"tipoUsuario"`: `'INDIVIDUAL'` o `'EMPRESARIAL'`

---

## 📝 Notas Adicionales

* Soporta tipos de notificación como:

  * `STOCK_BAJO`
  * `PRODUCTO_VENCIDO`
  * `COMENTARIO_EQUIPO`
  * `REPOSICION_RECOMENDADA`
  * `ACTUALIZACION_APP`
* Totalmente desacoplado, pero depende del backend para estado de lectura y contenido.
* Mejora la experiencia del usuario con feedback visual y accesibilidad móvil.
* Integra bien con cabeceras (`Header`) o paneles superiores de control.