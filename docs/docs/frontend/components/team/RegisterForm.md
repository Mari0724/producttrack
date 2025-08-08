---
id: register-form
title: Formulario de Registro
sidebar_label: RegisterForm

---

El componente `RegisterForm` permite a nuevos usuarios registrarse en la plataforma, capturando datos personales o empresariales según el tipo de cuenta seleccionada. Soporta validación de campos, visualización de errores, aceptación de políticas, y muestra un botón de envío con estado de carga.

---

## 🔍 Ubicación

`src/components/team/RegisterForm.tsx`

---

## 📦 Dependencias

* **React Hooks:** `useState`
* **React Icons:**

  * `FaUser`, `FaEnvelope`, `FaPhone`, `FaHome`, `FaBuilding`, `FaIdCard`, `FaLock` – íconos de campos
* **Lucide React:** `Eye`, `EyeOff` – alternar visibilidad de contraseña

---

## ⚙️ Propiedades

| Propiedad           | Tipo                                | Descripción                                       |
| ------------------- | ----------------------------------- | ------------------------------------------------- |
| `userType`          | `string`                            | Tipo de usuario: `"individual"` o `"empresarial"` |
| `username`          | `string`                            | Nombre de usuario                                 |
| `email`             | `string`                            | Correo electrónico del usuario                    |
| `password`          | `string`                            | Contraseña                                        |
| `fullName`          | `string`                            | Nombre completo del usuario                       |
| `phone`             | `string`                            | Número de teléfono                                |
| `address`           | `string`                            | Dirección de residencia                           |
| `companyName`       | `string`                            | Nombre de la empresa (solo para `empresarial`)    |
| `nit`               | `string`                            | Número de NIT (solo para `empresarial`)           |
| `errors`            | `{ [key: string]: string }`         | Mapeo de errores por campo                        |
| `loading`           | `boolean`                           | Si el botón de envío debe mostrar estado de carga |
| `onSubmit`          | `(e: React.FormEvent) => void`      | Manejador de envío del formulario                 |
| `setUserType`       | `Dispatch<SetStateAction<string>>`  | Setter para el tipo de usuario                    |
| `setUsername`       | `Dispatch<SetStateAction<string>>`  | Setter para nombre de usuario                     |
| `setEmail`          | `Dispatch<SetStateAction<string>>`  | Setter para email                                 |
| `setPassword`       | `Dispatch<SetStateAction<string>>`  | Setter para contraseña                            |
| `setFullName`       | `Dispatch<SetStateAction<string>>`  | Setter para nombre completo                       |
| `setPhone`          | `Dispatch<SetStateAction<string>>`  | Setter para teléfono                              |
| `setAddress`        | `Dispatch<SetStateAction<string>>`  | Setter para dirección                             |
| `setCompanyName`    | `Dispatch<SetStateAction<string>>`  | Setter para nombre de empresa                     |
| `setNit`            | `Dispatch<SetStateAction<string>>`  | Setter para NIT                                   |
| `acceptPolicies`    | `boolean`                           | Estado de aceptación de términos y políticas      |
| `setAcceptPolicies` | `Dispatch<SetStateAction<boolean>>` | Setter para aceptar términos y políticas          |

---

## 🧠 Lógica Interna

### 📥 Estado Local

| Estado         | Tipo      | Descripción                                 |
| -------------- | --------- | ------------------------------------------- |
| `showPassword` | `boolean` | Alterna visibilidad del campo de contraseña |

---

## 📤 Funciones Auxiliares

### `renderError(field: string)`

* Muestra el mensaje de error para un campo específico si existe en `errors`.

---

## 🧱 Estructura del Componente

1. **Encabezado**

   * Título “Crear una cuenta”

2. **Formulario**

   * Campo `select` para elegir tipo de usuario

   * Inputs para:

     * Nombre de usuario
     * Correo electrónico
     * Contraseña (con botón para mostrar/ocultar)
     * Nombre completo
     * Teléfono
     * Dirección

   * Si es **empresarial**, también incluye:

     * Nombre de la empresa
     * NIT

3. **Checkbox de Políticas**

   * Aceptación de Términos y Política de Privacidad con links

4. **Botón de Envío**

   * Deshabilitado si `loading` es `true`

---

## 🎨 Estilos y Diseño

* Utiliza **Tailwind CSS** para diseño responsive y atractivo:

  * Inputs redondeados: `rounded-full`
  * Colores de enfoque: `focus:ring-green-700`
  * Botones con hover: `hover:bg-yellow-600`
* Íconos dentro de inputs con posicionamiento absoluto
* Errores mostrados en rojo (`text-red-600`)
* Botón de contraseña con íconos `Eye` y `EyeOff`

---

## 💡 Ejemplo de Uso

```tsx
import RegisterForm from './RegisterForm';

<RegisterForm
  userType={userType}
  username={username}
  email={email}
  password={password}
  fullName={fullName}
  phone={phone}
  address={address}
  companyName={companyName}
  nit={nit}
  errors={formErrors}
  loading={isSubmitting}
  onSubmit={handleRegister}
  setUserType={setUserType}
  setUsername={setUsername}
  setEmail={setEmail}
  setPassword={setPassword}
  setFullName={setFullName}
  setPhone={setPhone}
  setAddress={setAddress}
  setCompanyName={setCompanyName}
  setNit={setNit}
  acceptPolicies={acceptPolicies}
  setAcceptPolicies={setAcceptPolicies}
/>
```

---

## 📝 Notas Adicionales

* Este componente no maneja validación por sí mismo, sino que muestra los errores recibidos desde un nivel superior (`errors`).
* Alterna visibilidad de campos dependiendo del tipo de usuario.
* Apto para integrarse con formularios de autenticación o onboarding.
* El botón de envío refleja el estado `loading` para feedback del usuario.