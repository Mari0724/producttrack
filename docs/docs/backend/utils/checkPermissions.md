---
id: checkPermissions
title: Check Permissions
sidebar_label: Check Permissions
---

Este archivo proporciona un sistema básico de control de acceso basado en roles, útil para validar si un usuario tiene permiso para realizar una acción específica en la aplicación.

---

## 🗂️ Objeto: `permisos`

```ts
const permisos = {
  ver:        ["ADMIN", "DESARROLLADOR", "USUARIO", "LECTOR", "COMENTARISTA", "EDITOR"],
  crear:      ["ADMIN", "DESARROLLADOR", "USUARIO", "EDITOR"],
  editar:     ["ADMIN", "DESARROLLADOR", "USUARIO", "EDITOR"],
  eliminar:   ["ADMIN", "DESARROLLADOR", "USUARIO", "EDITOR"],
  comentar:   ["ADMIN", "DESARROLLADOR", "USUARIO", "COMENTARISTA", "EDITOR"],
};
```

### 🎯 Descripción:

Define qué roles tienen permitido realizar cada acción clave del sistema.
Está diseñado para ser reutilizable y fácilmente extensible.

---

## 🔧 Función: `puede`

```ts
export function puede(accion: keyof typeof permisos, rol: string): boolean
```

### ✅ Propósito:

Determina si un rol específico (`rol`) tiene permiso para realizar una determinada acción (`accion`).

---

### 📥 Parámetros:

| Nombre   | Tipo                    | Descripción                              |
| -------- | ----------------------- | ---------------------------------------- |
| `accion` | `keyof typeof permisos` | Acción a validar (`ver`, `crear`, etc.). |
| `rol`    | `string`                | Rol del usuario a verificar.             |

---

### 📤 Retorno:

| Tipo      | Descripción                                                   |
| --------- | ------------------------------------------------------------- |
| `boolean` | `true` si el rol tiene permiso para la acción, `false` si no. |

>⚠️ Nota: Si la acción proporcionada no existe en el objeto permisos, la función retornará false automáticamente, ya que permisos[accion] será undefined y no contendrá el rol buscado.

---

### 🔍 Ejemplo de uso:

```ts
if (!puede("eliminar", usuario.rol)) {
  return res.status(403).json({ message: "No tienes permiso para eliminar." });
}
```

---

## 🧠 Ventajas:

* Centraliza la lógica de permisos.
* Facilita el mantenimiento y escalabilidad del control de acceso.
* Se puede usar tanto en middleware como directamente en controladores o servicios.

---