---
id: team-management
title: Gestión de Equipo
sidebar_label: TeamManagement
---

Este componente permite a las empresas **gestionar a los miembros de su equipo** dentro de la plataforma. Facilita operaciones como **agregar, editar, eliminar** miembros y visualizar su información detallada, todo dentro de una interfaz intuitiva y responsiva.

---

## 🔍 Ubicación

`src/pages/equipo/TeamManagement.tsx`

---

## 📦 Dependencias

- **Contextos y hooks personalizados:**
  - `useUser` – Proporciona información del usuario autenticado.
  - `useToast` – Muestra notificaciones emergentes.

- **Servicios:**
  - `getAllTeamMembers`, `createTeamMember`, `updateTeamMember`, `deleteTeamMember` del `teamService`.

- **Componentes internos:**
  - `AddMemberModal`
  - `EditMemberModal`
  - `DeleteConfirmModal`

- **Íconos de Lucide React:**
  - `Plus`, `Edit`, `Trash2`, `Mail`, `Phone`, `User`, `Search`

---

## 🧩 Props

Este componente **no recibe props** directamente. Opera según el contexto de sesión del usuario empresarial autenticado (`useUser`).

---

## 🧱 Estructuras de datos

```ts
interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "LECTOR" | "COMENTARISTA" | "EDITOR";
  estado?: string;
  phone?: string;
}
````

```ts
interface CreateTeamMemberDTO {
  username: string;
  correo: string;
  password: string;
  nombreCompleto: string;
  rolEquipo: "LECTOR" | "COMENTARISTA" | "EDITOR";
  telefono: string;
  direccion: string;
  empresaId: number;
  perfilCompleto: boolean;
}
```

---

## ⚙️ Lógica interna

### 📌 Estado local:

* `searchTerm`: término de búsqueda para filtrar por nombre/correo.
* `teamMembers`: lista de miembros del equipo.
* `isAddModalOpen`, `isEditModalOpen`, `isDeleteModalOpen`: control de visibilidad de los modales.
* `selectedMember`: miembro actualmente seleccionado para editar o eliminar.

---

### 🔁 Efectos:

* `useEffect`: carga los miembros al detectar que el usuario ya está autenticado y cargado (`fetchMembers`).

---

### 📤 Funciones principales:

* `fetchMembers`: carga los miembros activos del equipo, filtrados por empresa y rol.
* `handleAddMember`: crea un nuevo miembro en el backend y actualiza el estado.
* `handleEditMember`: actualiza nombre, correo y rol del miembro seleccionado.
* `handleDeleteMember`: elimina lógicamente un miembro (soft delete).
* `filteredMembers`: filtro local de búsqueda por nombre o correo.

---

## 🎨 Interfaz y diseño

* **Vista inicial sin miembros:**

  * Muestra un mensaje de bienvenida con ícono y botón “Crear Primer Miembro”.
  * Permite abrir el modal de `AddMemberModal`.

* **Vista principal:**

  * Encabezado con título y botón “Nuevo Miembro”.
  * Campo de búsqueda con ícono (`Search`).
  * Lista de tarjetas por miembro:

    * Nombre, correo, rol, teléfono.
    * Botones de editar (`Edit`) y eliminar (`Trash2`).

* **Modales:**

  * `AddMemberModal`: formulario para agregar.
  * `EditMemberModal`: permite editar datos básicos.
  * `DeleteConfirmModal`: confirmación antes de eliminar.

---

## 🔐 Reglas de acceso

* Solo disponible para usuarios con:

  * `tipoUsuario === "EMPRESARIAL"` y
  * `rol === "USUARIO"`

* Si el usuario no cumple estas condiciones, se muestra:

```txt
Acceso no autorizado
Esta sección está disponible solo para empresas con rol de usuario.
```

---

## 💡 Consideraciones adicionales

* La creación de usuarios usa `correo.split("@")[0]` para generar el `username`.
* Datos como `telefono` y `direccion` son placeholder (`"0000000000"` y `"pendiente"`).
* Se actualiza el estado del usuario (`refreshUsuario()`) tras agregar o editar.
* El campo `perfilCompleto` se incluye pero es opcional.

---

## 🧪 Ruta protegida

Este componente corresponde a la ruta:

```
/equipo/TeamManagement
```

Es utilizado para que una empresa gestione los miembros de su equipo y colabore en tareas dentro del sistema.