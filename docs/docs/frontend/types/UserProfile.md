---
id: user-profile
title: UserProfile
sidebar_label: UserProfile
---

Esta interfaz define la estructura de la información de perfil de un usuario en el sistema, contemplando los diferentes tipos de usuario que existen en la plataforma.

---

## Propiedades

### `type`
- **Tipo:** `'INDIVIDUAL' | 'EMPRESARIAL' | 'EQUIPO'`
- **Descripción:** Indica el tipo de cuenta del usuario.

---

### `username`
- **Tipo:** `string`
- **Descripción:** Nombre de usuario único para el inicio de sesión.

---

### `name`
- **Tipo:** `string`
- **Descripción:** Nombre completo del usuario.

---

### `email`
- **Tipo:** `string`
- **Descripción:** Dirección de correo electrónico del usuario.

---

### `phone`
- **Tipo:** `string`
- **Descripción:** Número de teléfono de contacto.

---

### `address`
- **Tipo:** `string`
- **Descripción:** Dirección física del usuario.

---

### `companyName` *(opcional)*
- **Tipo:** `string`
- **Descripción:** Nombre de la empresa, aplicable a usuarios de tipo **EMPRESARIAL**.

---

### `nit` *(opcional)*
- **Tipo:** `string`
- **Descripción:** Número de Identificación Tributaria, aplicable a empresas.

---

### `role` *(opcional)*
- **Tipo:** `string`
- **Descripción:** Rol asignado al usuario dentro del sistema.

---

### `fotoPerfil` *(opcional)*
- **Tipo:** `string`
- **Descripción:** URL o ruta de la imagen de perfil del usuario.

---
