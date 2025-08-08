---
id: usuario-auditoria
title: Auditoría de Usuarios
sidebar_label: UsuarioAuditoria
---

Este componente permite a un administrador visualizar, filtrar, inactivar y reactivar usuarios dentro del sistema. Proporciona una tabla detallada con información clave, junto con modales de confirmación para acciones sensibles como la eliminación lógica o la reactivación de cuentas.

---

## 🔍 Ubicación

`src/pages/equipo/UsuarioAuditoria.tsx`

---

## 📦 Dependencias

- **Hooks:**
  - `useEffect`, `useState` de React
  - `useUser` – para obtener al usuario autenticado
  - `useToast` – para mostrar notificaciones emergentes

- **Librerías:**
  - `axios` – para realizar peticiones HTTP
  - `lucide-react` – íconos (`Trash`, `Pencil`)

- **Constantes:**
  - `url` – base del endpoint de API

---

## 🧩 Props

Este componente **no recibe props**. Depende del contexto del usuario autenticado (`useUser`) para determinar permisos.

---

## 🧱 Estructuras de datos

```ts
interface Usuario {
  idUsuario: number;
  username: string;
  nombreCompleto: string;
  correo: string;
  rol: "USUARIO" | "EQUIPO" | "ADMIN" | "DESARROLLADOR";
  tipoUsuario?: "INDIVIDUAL" | "EMPRESARIAL";
  estado: "activo" | "inactivo";
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
````

---

## ⚙️ Lógica interna

### 📌 Estado local:

* `usuarios`: lista de todos los usuarios cargados.
* `confirmEliminarId`: ID del usuario seleccionado para inactivación.
* `confirmReactivarId`: ID del usuario seleccionado para reactivación.
* `filtroNombre`, `filtroCorreo`, `filtroTipo`, `filtroRol`, `filtroEstado`: inputs de filtrado.

---

### 🔁 Efectos:

* `useEffect`: al montar el componente, se carga la lista completa de usuarios desde el backend.

---

### 📤 Funciones principales:

* `filtrarUsuarios`: aplica filtros (nombre, correo, tipo, rol, estado) a la consulta de usuarios.
* `cargarUsuarios`: obtiene la lista completa de usuarios sin filtros.
* `eliminarUsuario`: inactiva un usuario, salvo que sea el mismo usuario autenticado.
* `reactivarUsuario`: revierte la inactivación de un usuario dado.

---

## 🔐 Reglas de acceso

* **Solo visible para usuarios con rol**: `ADMIN`.
* Si el usuario autenticado no cumple, se muestra:

```txt
Sin permisos para ver esta auditoría.
```

---

## 🖥️ Interfaz de usuario

### 🔎 Filtros

* Inputs para nombre, correo.
* Selects para tipo de usuario, rol, y estado.
* Botones para "Filtrar" y "Limpiar".

### 📋 Tabla

* Muestra:

  * ID, nombre de usuario, correo, rol, tipo, estado, fechas de creación/modificación/eliminación.
* Columnas ordenadas horizontalmente con scroll si es necesario.
* Íconos:

  * `Trash`: Inactivar
  * `Pencil`: Reactivar

### 💬 Modales de confirmación

* **Inactivación** (`confirmEliminarId`):

  * Previene auto-inactivación.
  * Confirmación clara con opciones Cancelar/Inactivar.

* **Reactivación** (`confirmReactivarId`):

  * Pregunta si se desea reactivar y ejecuta la acción al confirmar.

---

## 🧪 Ruta protegida

Este componente corresponde a la ruta:

```
/equipo/UsuarioAuditoria
```

Es utilizado por los administradores del sistema para **auditar usuarios activos e inactivos**, **modificar su estado**, y aplicar **filtros de búsqueda avanzada**.

---

## 💡 Consideraciones adicionales

* Los usuarios `ADMIN` y `DESARROLLADOR` no pueden ser inactivados desde la interfaz.
* Un usuario no puede eliminarse a sí mismo.
* El botón "Reactivar" está siempre visible como opción rápida para usuarios inactivos.