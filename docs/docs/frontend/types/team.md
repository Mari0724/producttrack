---
id: team-types
title: Definiciones de tipos - Equipo
sidebar_label: Equipo
---

Este archivo define los tipos y estructuras utilizados para representar miembros de un equipo y estadísticas relacionadas.

---

## **UserRole**

Tipo que representa los roles posibles que puede tener un miembro del equipo.

```ts
export type UserRole = 'LECTOR' | 'COMENTARISTA' | 'EDITOR';
````

* **`LECTOR`** → Usuario con permisos de solo lectura.
* **`COMENTARISTA`** → Usuario con permisos para comentar.
* **`EDITOR`** → Usuario con permisos para editar.

---

## **TeamMember**

Interfaz que define la estructura de un miembro del equipo.

```ts
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  perfilCompleto?: boolean;
  estado: "activo" | "inactivo";
}
```

**Propiedades:**

* **`id`** *(string)* → Identificador único del miembro.
* **`name`** *(string)* → Nombre completo del miembro.
* **`email`** *(string)* → Correo electrónico del miembro.
* **`role`** *(UserRole)* → Rol asignado al miembro.
* **`avatar?`** *(string, opcional)* → URL del avatar del miembro.
* **`perfilCompleto?`** *(boolean, opcional)* → Indica si el perfil está completo (`false`) o incompleto (`true`).
* **`estado`** *("activo" | "inactivo")* → Estado actual del miembro en el sistema.

---

## **TeamStats**

Interfaz que define las estadísticas generales de los miembros del equipo.

```ts
export interface TeamStats {
  total: number;
  byRole: {
    lector: number;
    comentarista: number;
    editor: number;
  };
}
```

**Propiedades:**

* **`total`** *(number)* → Cantidad total de miembros en el equipo.
* **`byRole`** *(objeto)* → Cantidad de miembros clasificados por rol:

  * **`lector`** *(number)* → Número de miembros con rol *LECTOR*.
  * **`comentarista`** *(number)* → Número de miembros con rol *COMENTARISTA*.
  * **`editor`** *(number)* → Número de miembros con rol *EDITOR*.

---