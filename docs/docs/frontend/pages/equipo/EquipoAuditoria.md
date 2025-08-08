---
id: equipo-auditoria
title: Auditoría del Equipo
sidebar_label: EquipoAuditoria
---

Este componente representa una **vista administrativa de auditoría** para gestionar y revisar los miembros del equipo de una empresa. Permite filtrar, editar roles, marcar perfiles como completos/incompletos, activar usuarios inactivos y realizar eliminaciones lógicas (soft delete).

---

## 🔍 Ubicación

`src/pages/equipo/EquipoAuditoria.tsx`

---

## 📦 Dependencias

- **Hooks y contexto:**
  - `useUser` – Hook que proporciona el usuario autenticado actual.
  - `useToast` – Hook personalizado para mostrar notificaciones.
  - `useEffect`, `useState` – Hooks de React.

- **Librerías externas:**
  - `axios` – Cliente HTTP para consumir endpoints protegidos por token.
  - `lucide-react` – Iconos (`Pencil`, `Trash`).

- **Constantes:**
  - `url` – URL base para las peticiones a la API.

---

## 🧩 Props

Este componente **no recibe props directamente**. Está diseñado como **una vista protegida** para usuarios con roles `ADMIN` o `DESARROLLADOR`.

---

## 🧱 Estructuras de datos

```ts
interface MiembroEquipo {
  idUsuario: number;
  nombreCompleto: string;
  correo: string;
  rolEquipo: "LECTOR" | "COMENTARISTA" | "EDITOR";
  estado: "activo" | "inactivo";
  perfilCompleto: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  empresaId: number;
}
````

---

## ⚙️ Lógica interna

### 📌 Estado:

* `miembros`: lista de usuarios cargados desde el backend.
* `filtroNombre`, `filtroCorreo`, `filtroRol`, `filtroEstado`, `filtroPerfilCompleto`: filtros activos para la tabla.
* `editar`: usuario que se está editando actualmente.
* `nuevoRol`, `nuevoPerfilCompleto`: valores seleccionados en el modal de edición.
* `confirmEliminarId`: ID del usuario que se desea eliminar.
* `activarUsuario`: indica si se debe reactivar un usuario inactivo.

---

### 🔁 Efectos:

* `useEffect`: carga los miembros del equipo al montar el componente (`cargarMiembros`).

---

### 📤 Funciones principales:

* `cargarMiembros`: obtiene todos los miembros del equipo mediante API.
* `filtrar`: aplica filtros de búsqueda usando el endpoint de filtrado.
* `actualizarRol`: actualiza el rol y perfil del usuario (y puede reactivarlo si está inactivo).
* `eliminar`: realiza una eliminación lógica del usuario (`soft delete`).
* `esAutorizado`: verifica si el usuario autenticado tiene permisos (`ADMIN` o `DESARROLLADOR`).

---

## 🎨 Interfaz y diseño

* Título principal: `"👥 Auditoría del Equipo"` con estilo destacado (`text-wine-red`).
* Filtros (nombre, correo, rol, estado, perfil) dispuestos horizontalmente.
* Tabla con las siguientes columnas:

  * ID, Nombre, Correo, Rol, Estado, Empresa ID, Perfil Completo, Fechas de creación/actualización/eliminación.
  * Acciones (`Editar`, `Eliminar`) según el rol del usuario.
* Modal de edición con:

  * Select para rol y perfil completo.
  * Checkbox para reactivar usuarios inactivos.
* Modal de confirmación de eliminación con advertencia clara.

---

## 🔐 Reglas de acceso

* Solo usuarios con rol `"ADMIN"` o `"DESARROLLADOR"` pueden acceder a esta vista.
* Si no tienen permisos, se muestra el mensaje:
  `"⚠️ No tienes permisos para acceder a esta auditoría."` y se oculta el contenido.

---

## 💡 Consideraciones adicionales

* El valor `perfilCompleto` se interpreta de forma inversa en el UI:

  * `false` → `"Perfil completo"`
  * `true` → `"Perfil incompleto"`
* Se utiliza `localStorage` para recuperar el token de autenticación.
* El botón de eliminación solo está disponible para usuarios con rol `ADMIN`.

---

## 📝 Mejoras sugeridas

* Agregar indicadores de carga o spinners para mejorar la experiencia de usuario.
* Validaciones más detalladas en el modal de edición.
* Paginar la tabla si hay muchos registros.
* Confirmación adicional antes de aplicar reactivaciones masivas.

---

## 🧪 Ruta protegida

Este componente es parte de las rutas protegidas de equipo:

```
/equipo/auditoria
```

Está destinado principalmente para fines administrativos y de monitoreo de usuarios del sistema.