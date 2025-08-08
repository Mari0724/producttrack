---
id: register
title: Página de Registro de Usuario
sidebar_label: Register
---

El componente `Register` gestiona el formulario de **registro de usuarios** (individuales o empresariales) en la plataforma. Contiene la lógica de validación, manejo de errores, envío de datos al backend, y navegación posterior al éxito.

Incluye múltiples subcomponentes reutilizables que estructuran la interfaz: `LeftPanel`, `RegisterForm`, `LandingInfo`, y `Footer`.

---

## 🔍 Ubicación

`src/pages/auth/Register.tsx`

---

## 🧩 Componentes Importados

| Componente     | Descripción                                                  |
| -------------- | ------------------------------------------------------------ |
| `LeftPanel`    | Panel izquierdo con mensaje de bienvenida e inicio de sesión |
| `RegisterForm` | Formulario completo para el registro                         |
| `LandingInfo`  | Información adicional de la plataforma                       |
| `Footer`       | Pie de página para consistencia visual                       |

---

## 📦 Dependencias

* **Routing**:

  * `useNavigate` de `react-router-dom`
* **HTTP Requests**:

  * `axios` → para enviar datos de registro al backend
* **Custom Hooks**:

  * `useToast` → para mostrar mensajes emergentes
* **Constantes**:

  * `url` → baseURL del backend (`/usuarios` endpoint)

---

## 🧠 Estados del Componente

```ts
const [userType, setUserType] = useState("");
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [fullName, setFullName] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");
const [companyName, setCompanyName] = useState("");
const [nit, setNit] = useState("");
const [errors, setErrors] = useState<{ [key: string]: string }>({});
const [loading, setLoading] = useState(false);
const [acceptPolicies, setAcceptPolicies] = useState(false);
```

> Manejan los valores del formulario, errores, estado de carga y aceptación de políticas.

---

## ✅ Validación del Formulario

Función `validate()`: revisa que todos los campos requeridos estén completos y con formato correcto.
También valida campos específicos si el tipo de usuario es **empresarial**.

### 🔎 Errores Comunes

| Campo         | Validación                                |
| ------------- | ----------------------------------------- |
| `email`       | Debe contener `@`                         |
| `password`    | Mínimo 6 caracteres                       |
| `phone`       | Debe tener entre 7 y 15 dígitos numéricos |
| `companyName` | Obligatorio si es usuario empresarial     |
| `nit`         | Obligatorio si es usuario empresarial     |

---

## 🧾 Estructura del Objeto a Enviar

Tipo `RegistroUsuario`:

```ts
{
  username: string;
  correo: string;
  password: string;
  nombreCompleto: string;
  telefono: string;
  direccion: string;
  rol: "USUARIO";
  tipoUsuario: "INDIVIDUAL" | "EMPRESARIAL";
  nombreEmpresa?: string;
  nit?: string;
}
```

Se adapta dinámicamente si el usuario es empresarial.

---

## 🚀 Registro (`handleRegister`)

1. Previene comportamiento por defecto del formulario
2. Valida los campos
3. Verifica que las políticas estén aceptadas
4. Envía los datos al backend (`POST /usuarios`)
5. Si todo sale bien:

   * Muestra un `toast.success`
   * Redirige a `/login`
6. Si hay error:

   * Muestra mensaje de error extraído del backend (o genérico)
7. Siempre termina desactivando el estado de carga

---

## 🖼️ Interfaz Visual

* Usa una estructura de 2 columnas en pantallas grandes:

  * Izquierda: `LeftPanel` (bienvenida)
  * Derecha: `RegisterForm` (formulario funcional)
* En móviles, los componentes se apilan verticalmente
* El diseño general es limpio, moderno y responsivo

---

## 🌐 Navegación y UX

| Acción                       | Resultado                       |
| ---------------------------- | ------------------------------- |
| Registro exitoso             | Redirige a `/login`             |
| Clic en “¿Ya tienes cuenta?” | También redirige a `/login`     |
| No aceptar políticas         | Bloquea el envío del formulario |

---

## ⚙️ Funcionalidad Extendida

* **`window.scrollTo(0, 0)`** en `useEffect` asegura que el usuario siempre comience desde arriba al ingresar a esta vista.
* Campos y errores están gestionados de forma centralizada con `useState` y `setErrors`.
* El formulario se envía desde el subcomponente `RegisterForm`, pero la lógica principal vive en `Register.tsx`.

---

## 💡 Ejemplo de Uso

Este componente está registrado en el enrutador principal de esta forma:

```tsx
<Route path="/register" element={<Register />} />
```

---

## 📌 Notas Finales

* Este componente está **modularizado** para facilitar mantenimiento.
* Usa diseño móvil-first.
* Permite registrar **dos tipos** de usuario (individual y empresarial), lo cual lo hace adaptable para distintos contextos de negocio.