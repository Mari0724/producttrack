---
id: Register
title: Register
sidebar_label: Register
---

## 🔍 Ubicación

`src/pages/Register.tsx`

---
## 🧩 Descripción General

El componente `Register` proporciona una interfaz de registro para nuevos usuarios del sistema. Permite registrar tanto usuarios **individuales** como **empresariales**, adaptando dinámicamente el formulario según el tipo seleccionado. También se comunica con el backend para almacenar los datos de registro mediante una solicitud `POST`.

---

## ⚙️ Tecnologías Usadas

* React (`useState`, `useNavigate`)
* Axios para peticiones HTTP
* React Icons para mejorar la UI
* Tailwind CSS para el estilo
* React Router DOM para navegación

---

### 🧠 Lógica Principal

#### 1. **Estados Locales (`useState`)**

Se manejan múltiples estados para capturar la información ingresada en el formulario:

* `userType`: tipo de usuario ("individual" o "empresarial")
* `username`, `email`, `password`: credenciales básicas
* `fullName`, `phone`, `address`: campos comunes
* `companyName`, `nit`: solo visibles si `userType === "empresarial"`

#### 2. **Redirección**

* `useNavigate()` permite redirigir al usuario a la vista de inicio de sesión desde el panel izquierdo.

#### 3. **Función de envío (`handleRegister`)**

* Prepara un objeto `datos` con los valores del formulario.
* Realiza una solicitud `POST` a `http://localhost:3000/usuarios`.
* Muestra un mensaje de éxito o error según la respuesta.

---

### 🧾 Estructura del Componente

```tsx
<div className="min-h-screen ...">
  <div className="flex flex-col md:flex-row ...">
    
    {/* Panel Izquierdo: Bienvenida */}
    <div className="md:w-2/5 bg-[#35492c] ...">
      <h2>Bienvenidos</h2>
      <p>Para unirte...</p>
      <button onClick={() => navigate("/login")}>Iniciar Sesión</button>
    </div>

    {/* Panel Derecho: Formulario de Registro */}
    <div className="md:w-3/5 p-6 ...">
      <h2>Crear una cuenta</h2>
      <form onSubmit={handleRegister}>
        
        {/* Tipo de Usuario */}
        <select value={userType}>...</select>

        {/* Campos Comunes */}
        <input type="text" value={username} />
        <input type="email" value={email} />
        <input type="password" value={password} />

        {/* Campos Condicionales */}
        {userType && (
          <>
            <input type="text" value={fullName} />
            <input type="text" value={phone} />
            <input type="text" value={address} />
          </>
        )}

        {/* Campos Exclusivos para empresas */}
        {userType === "empresarial" && (
          <>
            <input type="text" value={companyName} />
            <input type="text" value={nit} />
          </>
        )}

        {/* Botón de Envío */}
        <button type="submit">Registrarme</button>
      </form>
    </div>
  </div>
</div>
```

---

### 🛠️ Validaciones y Reglas

* No hay validaciones explícitas en el formulario (solo alerta si el `POST` falla).
* El campo `tipoUsuario` se usa para determinar los campos adicionales a mostrar.
* Se utiliza `.toUpperCase()` para asegurar que `tipoUsuario` se envíe en mayúsculas.

---

### 🔐 Seguridad

Actualmente, el formulario:

* **No incluye** validaciones de formato en el frontend.
* **No encripta** la contraseña antes de enviarla.
* **Debe mejorar** para prevenir datos maliciosos o incompletos.

---

### ✅ Pendientes Recomendados

* ✅ Agregar validaciones de campos (`required`, patrones).
* ✅ Agregar mensajes de error debajo de cada campo.
* ✅ Validar que los campos como `email`, `nit`, y `phone` tengan formatos correctos.
* ✅ Integrar un spinner o indicador de carga al enviar el formulario.
