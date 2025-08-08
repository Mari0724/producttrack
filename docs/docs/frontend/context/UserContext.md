---
id: user-context
title: Contexto Global de Usuario
sidebar_label: UserContext
---

El archivo `UserContext.tsx` define un **contexto global de React** que gestiona la información del usuario autenticado a lo largo de toda la aplicación. Esto incluye su token, rol, tipo de cuenta y estado de carga. También proporciona funciones para establecer o refrescar el estado del usuario desde el token JWT almacenado.

---

## 🔍 Ubicación

`src/context/UserContext.tsx`

---

## 📦 Dependencias

* `React`: `createContext`, `useContext`, `useEffect`, `useState`
* `jwt-decode`: para decodificar el token JWT del `localStorage`

---

## 🧩 Estructuras de Datos

### 🔐 `Usuario` (adaptado desde el token)

```ts
interface Usuario {
  idUsuario: number;
  username: string;
  correo: string;
  tipoUsuario: "INDIVIDUAL" | "EMPRESARIAL";
  rol: "ADMIN" | "DESARROLLADOR" | "LECTOR" | "EDITOR" | string;
  rolEquipo?: string;
  empresaId?: number;
  perfilCompleto: boolean;
  nombreEmpresa?: string;
}
```

### 🧾 `RawToken` (estructura cruda decodificada)

Contiene campos opcionales que son normalizados por el adaptador antes de usarlos.

---

## ⚙️ ¿Qué exporta este módulo?

### 1. `UserProvider` (componente de contexto)

```tsx
<UserProvider>
  {/* children de la app */}
</UserProvider>
```

* Proveedor que encapsula la lógica de lectura y adaptación del token del `localStorage`.
* Establece el estado global `usuario`.
* Gestiona el estado `cargando` para indicar si la verificación inicial ha terminado.

### 2. `useUser()` (hook personalizado)

```tsx
const { usuario, setUsuario, cargando, refreshUsuario } = useUser();
```

* Permite acceder al contexto del usuario desde cualquier componente hijo del `UserProvider`.

---

## 🧠 Lógica Interna

### Estado local

```ts
usuario: Usuario | null;
cargando: boolean;
```

### Efecto inicial

* Se ejecuta en `useEffect` al montar el componente.
* Si hay token en `localStorage`, se decodifica y se adapta al tipo `Usuario`.
* Se setea el estado `usuario` con la información extraída del token.
* Finaliza estableciendo `cargando: false`.

### `refreshUsuario()`

* Método expuesto por el contexto para volver a leer el token JWT manualmente (sin recargar la página).
* Útil después de un login, edición de perfil, etc.

---

## 🧭 Comportamiento Condicional

| Condición                      | Resultado                                                        |
| ------------------------------ | ---------------------------------------------------------------- |
| Token válido en `localStorage` | Se decodifica y adapta al formato interno `Usuario`              |
| Token inválido o ausente       | `usuario` permanece como `null`, y se marca como no cargando     |
| Error de decodificación        | Se registra en consola con prefijo ❌ y no se actualiza el estado |

---

## 🎨 Estilos y Diseño

* Este archivo no incluye estilos, ya que es puramente **lógica y estado compartido**.

---

## 💡 Ejemplo de Uso

### Proveedor global

```tsx
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <YourRoutesOrLayout />
    </UserProvider>
  );
}
```

### Consumo con `useUser()`

```tsx
import { useUser } from "../context/UserContext";

const Perfil = () => {
  const { usuario, cargando } = useUser();

  if (cargando) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Hola, {usuario?.username}</h1>
    </div>
  );
};
```

---

## 📌 Notas Adicionales

* ⚠️ El hook `useUser()` **lanza un error** si se usa fuera de un `UserProvider`.
* Las claves `rolEquipo`, `nombreEmpresa`, etc. son opcionales para soportar diferentes tipos de usuarios (individuales o empresariales).
* Está preparado para escalar a futuros roles o campos nuevos sin romper la estructura.