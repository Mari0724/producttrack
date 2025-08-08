---

id: layout
title: Componente de Layout Principal
sidebar_label: Layout

---

El componente `Layout` es el **contenedor estructural principal** de la aplicación. Define la disposición general de la interfaz, incluyendo la **barra lateral** (`Sidebar`), la **barra superior** (`Topbar`), y el **contenido central dinámico** que cambia según la ruta.

Adicionalmente, gestiona la lógica de presentación de **anuncios emergentes (ads)** con reglas específicas de frecuencia y límite por sesión/usuario.

---

## 🔍 Ubicación

`src/layout/Layout.tsx`

---

## 📦 Dependencias

* **Componentes personalizados:**

  * `Sidebar` (navegación lateral)
  * `Topbar` (barra superior con navegación contextual)
  * `AdModal` (modal emergente para mostrar imágenes promocionales)
* **Hooks de React:**

  * `useState`, `useEffect`
* **React Router:**

  * `useLocation` – para detectar la ruta actual
* **Utilidad interna:**

  * `adImages` – arreglo de URLs de imágenes de anuncios (`src/utils/adImages.ts`)

---

## ⚙️ Propiedades

| Propiedad      | Tipo                                        | Descripción                                                 |
| -------------- | ------------------------------------------- | ----------------------------------------------------------- |
| `children`     | `ReactNode`                                 | Contenido dinámico que será renderizado dentro del `Layout` |
| `userType?`    | `"INDIVIDUAL" \| "EMPRESARIAL" \| "EQUIPO"` | (Opcional) Tipo de usuario autenticado                      |
| `companyName?` | `string`                                    | (Opcional) Nombre de la empresa asociada al usuario         |

> ⚠️ Actualmente, `userType` y `companyName` **no son utilizados dentro del componente**, pero están definidas en la interfaz para posibles usos futuros.

---

## 🧠 Lógica Interna

### 🪧 Gestión de Anuncios (`AdModal`)

El componente muestra anuncios promocionales bajo las siguientes reglas:

#### 1️⃣ Al entrar a la aplicación:

* Si no ha pasado un día completo (24h) desde el último primer anuncio mostrado:

  * Solo se muestran anuncios **hasta un máximo de 4 veces**.
* Usa `localStorage` para persistencia entre sesiones (`adCount`, `adTimestamp`).
* Usa `sessionStorage` para evitar duplicar anuncios dentro de una misma sesión (`firstAdShown`).

#### 2️⃣ Durante la sesión:

* Se activa un `setInterval` que muestra un nuevo anuncio **cada 15 minutos**, hasta alcanzar el límite de 4.

#### 3️⃣ Datos almacenados:

| Clave de Almacenamiento | Tipo     | Uso                                                               |
| ----------------------- | -------- | ----------------------------------------------------------------- |
| `adCount`               | `string` | Número de veces que el anuncio fue mostrado en las últimas 24h    |
| `adTimestamp`           | `string` | Marca de tiempo del primer anuncio del ciclo actual (en `ms`)     |
| `firstAdShown`          | `string` | Bandera para evitar que el primer anuncio se repita en una sesión |

---

## 🔁 `useEffect`s

### ⏳ Primer `useEffect`

Evalúa si debe mostrarse el primer anuncio según la fecha y conteo almacenado.

### 🔁 Segundo `useEffect`

Configura un temporizador (`setInterval`) para mostrar anuncios cada 15 minutos, limitado a un máximo de 4.

---

## 🧱 Estructura del Componente

```tsx
<div className="flex h-screen">
  <Sidebar />
  <div className="flex-1 flex flex-col">
    <Topbar />
    <main>{children}</main>
  </div>
  {showAd && <AdModal />}
</div>
```

1. **Sidebar** – siempre visible a la izquierda.
2. **Topbar** – encabezado superior (menú, usuario, etc.).
3. **Main** – área de contenido dinámico que renderiza `children`.
4. **AdModal** – solo se renderiza si no estás en la ruta `/login` y las condiciones de anuncio lo permiten.

---

## 🎨 Estilos y Diseño

* Utiliza **Tailwind CSS** para:

  * Diseño `flex` vertical y horizontal.
  * `h-screen` para ocupar el alto completo del viewport.
  * Espaciado dinámico (`px-4`, `py-4`, etc.).
* Composición responsiva y adaptativa.
* Transiciones suaves para contenedores (`transition-all duration-300`).

---

## 💡 Ejemplo de Uso

```tsx
import Layout from "@/Layout/Layout";

const Dashboard = () => {
  return (
    <Layout>
      <div className="text-xl">Bienvenido a tu panel de control</div>
    </Layout>
  );
};
```

> ⚠️ Este componente debe envolver cualquier vista que requiera **barra lateral, topbar y lógica de anuncios**. No es necesario envolver rutas como `/login`.

---

## 📝 Notas Adicionales

* El componente está optimizado para rendimiento y experiencia de usuario:

  * **Evita mostrar ads en la página de login**.
  * **Controla la frecuencia de los anuncios para no abrumar**.
* Ideal para dashboards, vistas internas, secciones privadas de la app.
* Puede extenderse fácilmente para:

  * Diferenciar el `Sidebar` y `Topbar` según `userType`
  * Agregar notificaciones contextuales
  * Cambiar dinámicamente el diseño por ruta