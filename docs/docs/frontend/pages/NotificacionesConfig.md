---
id: notificaciones-config
title: Notificaciones Config
sidebar_label: Notificaciones Config
---
Este componente representa la **pantalla de configuración de notificaciones** para el usuario.  
Permite activar o desactivar distintos tipos de alertas que la aplicación puede enviar.

---
## 🔍 Ubicación

`src/pages/NotificacionesConfig.tsx`

---


## Componentes y Librerías Usadas

- **React Hooks**
  - `useEffect` → Para cargar las preferencias del usuario al montar el componente.
  - `useState` → Para manejar el estado de las preferencias.
  - `useMemo` → Para obtener y memorizar el `usuarioId` desde `localStorage`.
- **`lucide-react`**
  - `Bell` → Ícono usado en cada opción de notificación.
  - `Settings` → Ícono del encabezado.
  - `AlertCircle` → Ícono de advertencia informativa.
- **`react-hot-toast`** → Muestra notificaciones de éxito o error al actualizar preferencias.
- **API interna**
  - `getPreferenciasUsuario` → Obtiene las preferencias actuales desde el backend.
  - `actualizarPreferenciasUsuario` → Actualiza las preferencias en el backend.

---

## Datos Locales

### `opcionesNotificacion`
Arreglo con las categorías de notificaciones disponibles.

| Campo   | Tipo   | Descripción |
|---------|--------|-------------|
| `id`    | string | Identificador único de la opción. |
| `nombre`| string | Nombre visible para el usuario. |

Ejemplo:
```ts
const opcionesNotificacion = [
  { id: "stockBajo", nombre: "Stock bajo" },
  { id: "productoVencido", nombre: "Producto vencido" },
  { id: "comentarios", nombre: "Comentarios de productos" },
  { id: "reposicion", nombre: "Recomendación de reposición" },
  { id: "actualizacion", nombre: "Actualización de la app" },
];
````

---

## Lógica Principal

### 1. **Obtención del ID de Usuario**

Se obtiene desde `localStorage` y se convierte a número.

### 2. **Carga de Preferencias**

Al montar el componente, si existe `usuarioId`, se llama a `getPreferenciasUsuario` para obtener el estado actual de las notificaciones.

### 3. **Cambio de Preferencias (`handleToggle`)**

* Invierte el valor de la preferencia seleccionada.
* Actualiza el estado local y lo guarda en `localStorage`.
* Llama a `actualizarPreferenciasUsuario` para reflejar el cambio en el backend.
* Muestra un toast de éxito o error.

---

## Renderizado

1. **Encabezado**

   * Fondo degradado, ícono `Settings` y título "Configuración".

2. **Lista de opciones**

   * Cada opción muestra:

     * Ícono `Bell`.
     * Nombre descriptivo.
     * Toggle switch para habilitar o deshabilitar.
   * Si aún no se han cargado preferencias, se muestra un **placeholder animado**.

3. **Nota informativa**

   * Icono `AlertCircle` con mensaje aclaratorio sobre el alcance de las notificaciones.

---

## Estilos y Experiencia de Usuario

* Uso de **Tailwind CSS** para un diseño limpio y responsive.
* Transiciones suaves en `hover`.
* **Gradientes y sombras** para jerarquía visual.
* Componente accesible con `sr-only` para inputs ocultos.

---

## Notas

* El cambio de preferencias solo se aplica **desde el navegador actual**.
* Es importante que el backend soporte el formato esperado de `preferencias`.
* Se recomienda validar que `usuarioId` siempre esté presente antes de mostrar esta pantalla.

---