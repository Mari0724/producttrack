---
id: topbar
title: Barra Superior de Navegación
sidebar_label: Topbar

---

El componente `Topbar` representa una barra superior de navegación que incluye funcionalidades de búsqueda, notificaciones, ayuda, gestión de equipo y menú de usuario. Se adapta dinámicamente según el tipo y rol del usuario, brindando accesos rápidos y contexto útil dentro de la aplicación.

---

## 🔍 Ubicación

`src/components/Topbar.tsx`

---

## 📦 Dependencias

* **React Hooks:** `useState`
* **React Router:** `useNavigate`
* **Contexto global:** `useUser()` del contexto `UserContext`
* **Íconos:**

  * `react-icons`: `MdHelp`, `MdAccountCircle`
  * `lucide-react`: `Users`, `ArrowRight`
* **Componentes internos:**

  * `NotificationBell` desde `components/producttrack/NotificationBell`

---

## ⚙️ Props

Este componente **no recibe props directamente**. Depende del contexto `UserContext` para obtener la información del usuario.

---

## 🧠 Lógica Interna

### Estado

```ts
menuActive: {
  help: boolean;
  profile: boolean;
}
```

* Controla la visibilidad de los menús desplegables de ayuda y perfil.

### Contexto

```ts
const { usuario, setUsuario } = useUser();
```

* `usuario`: contiene información como `tipoUsuario` y `rol`
* `setUsuario`: función para limpiar el estado al cerrar sesión

### Funciones

| Función              | Descripción                                                                |
| -------------------- | -------------------------------------------------------------------------- |
| `cerrarSesion()`     | Elimina el token del `localStorage`, limpia el usuario y redirige al login |
| `irAGestionEquipo()` | Navega a `/app/empresarial/equipo`                                         |

---

## 🧩 Estructura Visual

| Elemento                     | Descripción                                                                        |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| 🔍 Input de búsqueda         | Campo responsivo con `clamp(100px, 30vw, 300px)`                                   |
| 👥 Botón "Gestión de Equipo" | Solo visible para usuarios `EMPRESARIAL` que **no** sean del rol `EQUIPO`          |
| 🔔 Notificaciones            | Componente `NotificationBell`                                                      |
| ❓ Menú de Ayuda              | Muestra correo de contacto y tiempos de respuesta cuando se activa                 |
| 👤 Menú de Perfil            | Opción para ver el perfil o cerrar sesión (ambos con navegación o lógica asociada) |

---

## 🧭 Comportamiento Condicional

| Condición                                                     | Componente Visible                                          |
| ------------------------------------------------------------- | ----------------------------------------------------------- |
| `usuario?.tipoUsuario === "EMPRESARIAL"` y `rol !== "EQUIPO"` | Botón "Gestión de Equipo"                                   |
| `menuActive.help === true`                                    | Tarjeta emergente con información de contacto               |
| `menuActive.profile === true`                                 | Tarjeta emergente con botones "Mi perfil" y "Cerrar sesión" |

---

## 🎨 Estilos y Diseño

* **Contenedor:** `flex`, espaciado con `gap`, fondo blanco y `shadow`
* **Input de búsqueda:** diseño responsivo con `clamp`, `rounded`, y `focus:ring`
* **Botones:**

  * Gestión de equipo: fondo `#808000` con hover `#6b6b00`
  * Cerrar sesión: color rojo
* **Menús desplegables:** `absolute`, con sombra (`shadow-md`), `rounded`, y `z-10`

---

## 💡 Ejemplo de Uso

Este componente se utiliza dentro de un layout o página protegida:

```tsx
<Topbar />
```

> El componente debe estar envuelto dentro del `UserContextProvider` para que `useUser()` funcione correctamente.

---

## 📝 Notas Adicionales

* La ayuda incluye formato claro y tiempos máximos de respuesta para una comunicación efectiva.
* Las acciones están adaptadas a roles y tipos de usuario para una navegación personalizada.