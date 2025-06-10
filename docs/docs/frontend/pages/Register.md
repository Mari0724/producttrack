---
id: Register
title: Register
sidebar_label: Register
---

## 🔍 Ubicación

`src/pages/Register.tsx`

---

## 🧾 Descripción General

El componente `Register` es una página de registro de usuarios desarrollada en React. Permite registrar tanto usuarios individuales como empresariales, validando sus datos y enviándolos al backend a través de una petición HTTP `POST`.

Este formulario dinámico adapta sus campos según el tipo de usuario seleccionado y proporciona retroalimentación en tiempo real sobre los errores de validación.

---

## 🧩 Tecnologías Utilizadas

* **React** (con Hooks)
* **React Router** (`useNavigate`)
* **Axios** (para llamadas HTTP)
* **React Icons** (para íconos visuales)
* **TailwindCSS** (estilos)

---

## 🧠 Estados Principales

```tsx
const [userType, setUserType] = useState("");            // 'individual' o 'empresarial'
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [fullName, setFullName] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");
const [companyName, setCompanyName] = useState("");      // Solo empresarial
const [nit, setNit] = useState("");                      // Solo empresarial
const [errors, setErrors] = useState({});                // Errores de validación
const [loading, setLoading] = useState(false);           // Estado del botón
```

---

## 📋 Validación

La función `validate()` asegura que:

* Se seleccione un tipo de usuario.
* El correo sea válido.
* La contraseña tenga al menos 6 caracteres.
* El teléfono solo contenga entre 7 y 15 dígitos.
* Se completen los campos obligatorios según el tipo de usuario.

Los errores se almacenan en `errors` y se muestran bajo cada campo correspondiente.

---

## 📤 Envío del Formulario

`handleRegister` se encarga de:

1. Validar los campos.
2. Crear el objeto `datos` con la información del formulario.
3. Enviar los datos a la API (`http://localhost:3000/usuarios`) mediante `axios`.
4. Redireccionar al login si el registro fue exitoso.
5. Mostrar alertas y manejar errores de red.

---

## 🧑‍💼 Tipo de Usuarios

* **Individual**: completa nombre completo, teléfono, dirección.
* **Empresarial**: además de lo anterior, completa nombre de empresa y NIT.

---

## 🖼️ Interfaz de Usuario

Dividido en dos paneles:

* **Izquierdo**: mensaje de bienvenida y botón para iniciar sesión.
* **Derecho**: formulario dinámico con campos que varían según el tipo de usuario.

---

## 🔒 Seguridad y UX

* Validación en cliente antes de enviar al servidor.
* Campos obligatorios y retroalimentación visual de errores.
* Botón deshabilitado mientras `loading` está activo.
* Sección empresarial solo visible si el tipo seleccionado es "empresarial".

---

## 📍 Navegación

* Usa `useNavigate()` para redirigir al usuario al login (`/login`) después del registro exitoso o si ya tiene cuenta.

---

## 📦 Exportación

El componente es exportado por defecto:

```tsx
export default Register;
```


