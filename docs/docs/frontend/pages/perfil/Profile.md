---
id: Profile
title: Profile
sidebar_label: Profile
---

El componente **`Profile`** es la vista principal para la gestión del perfil de usuario.
Permite visualizar y editar información personal, cambiar la foto de perfil y actualizar la contraseña.
También adapta su interfaz dependiendo del tipo de usuario (`INDIVIDUAL`, `EMPRESARIAL`, `EQUIPO`) y su rol (`ADMIN`, `DESARROLLADOR`, etc.).

---
## 🔍 Ubicación

`src/pages/perfil/CompletaProfile.tsx`

---

## 🛠️ Dependencias

* **React Hooks**

  * `useState` y `useEffect` para el manejo del estado y ciclo de vida.
* **Custom Hooks**

  * `useToast` para mostrar notificaciones de éxito o error.
* **Iconos**

  * `Edit`, `Save`, `User`, `Building2` desde `lucide-react`.
* **Componentes**

  * `PersonalInfo` → Muestra y edita la información personal.
  * `SecuritySettings` → Configuración de seguridad y cambio de contraseña.
* **Servicios**

  * `getUserProfile`, `updateUserProfile`, `uploadUserProfilePhoto`, `getEmpresaInfo` → Gestión de datos de usuario y empresa.
  * `changeUserPassword` → Cambio de contraseña.
* **Tipos**

  * `AxiosErrorResponse` y `UserDTO` para tipado TypeScript.

---

## 📂 Interfaces

### `UserProfile`

```ts
interface UserProfile {
  type: 'INDIVIDUAL' | 'EMPRESARIAL' | 'EQUIPO';
  username: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  companyName?: string;
  nit?: string;
  role?: string;
  fotoPerfil?: string;
  empresaId?: number;
}
```

* Define la estructura de los datos que se manejan en el perfil.
* Permite identificar el tipo de usuario y su información asociada.

---

## 🔄 Ciclo de Vida

### **useEffect** → Cargar perfil del usuario

1. Obtiene el `idUsuario` desde `localStorage`.
2. Llama a **`getUserProfile`** para traer la información.
3. Si el usuario es de tipo `EQUIPO` y tiene `empresaId`, llama a **`getEmpresaInfo`**.
4. Guarda la información en el estado `userProfile`.

---

## 📌 Funciones Principales

### **handleSaveProfile**

* Guarda cambios en el perfil.
* Si hay una nueva foto, llama a `uploadUserProfilePhoto`.
* Actualiza la información en el backend con `updateUserProfile`.
* Refresca los datos llamando a `getUserProfile`.
* Muestra notificación de éxito o error.

---

### **handlePasswordSubmit**

* Valida que las contraseñas coincidan.
* Envía la solicitud de cambio a `changeUserPassword`.
* Resetea los campos y cierra el modal si es exitoso.
* Muestra mensajes de error detallados si ocurre un fallo.

---

## 📊 Variables Derivadas

* `isAdmin` → Usuario con rol `ADMIN`.
* `isDev` → Usuario con rol `DESARROLLADOR`.
* `isIndividual` → Usuarios individuales, admin o dev.
* `isEmpresa` → Usuarios empresariales.
* `isEquipo` → Usuarios de equipo.

---

## 🖼️ Renderizado Condicional

* **Cabecera**:

  * Muestra icono de usuario o empresa según tipo.
  * Botón para **Editar Perfil** o **Guardar Cambios**.
* **Tabs**:

  * `Información Personal` → Muestra componente `PersonalInfo`.
  * `Seguridad` → Muestra componente `SecuritySettings`.

---

## 📌 Flujo General

1. **Carga inicial** → Trae datos desde API.
2. **Edición** → Cambia a modo edición y permite modificar datos.
3. **Guardado** → Llama servicios y refresca datos.
4. **Seguridad** → Permite cambiar contraseña de forma segura.

---

## 🚀 Buenas Prácticas en el Código

* ✅ Validaciones antes de llamadas a API.
* ✅ Uso de `toast` para feedback rápido.
* ✅ Separación clara entre datos personales y seguridad.
* ✅ Tipado estricto con TypeScript.

---