---
id: indexFront
title: 💻 Frontend - ProductTrack
sidebar_label: 💻 Frontend
---

# 💻 Frontend - ProductTrack

Bienvenido a la documentación oficial del **Frontend de ProductTrack**.  
Aquí encontrarás las tecnologías utilizadas, la estructura real del proyecto, y cómo instalar y ejecutar esta parte del sistema.

---

## 🧱 Arquitectura

El frontend de ProductTrack está construido con **React** y **TypeScript**, organizado en carpetas según su responsabilidad. La estructura es modular, permitiendo separar componentes reutilizables, páginas principales y servicios conectados al backend.

Es una aplicación SPA (Single Page Application) con enfoque **responsive** y diseñada para tres tipos de usuarios: persona individual, empresa y miembros de equipo.

---

## 🚀 Tecnologías utilizadas

- **React.js** – Biblioteca para construir la interfaz
- **TypeScript** – Tipado estático para mayor mantenibilidad
- **Tailwind CSS** – Sistema de estilos rápido y personalizable
- **React Router DOM** – Navegación entre vistas
- **Axios** – Comunicación con el backend
- **Vite** – Herramienta de desarrollo rápida
- **Lucide-react** – Íconos modernos y accesibles
- **localStorage** – Para guardar y recuperar el token JWT

---

## 📁 Estructura del proyecto

```bash
📦 frontend/
├── 📁 public/               # Archivos públicos (index.html, imágenes base)
├── 📁 src/                  # Código fuente principal
│   ├── 📁 assets/           # Imágenes del frontend (logo, ilustraciones)
│   ├── 📁 components/       # Componentes compartidos (botones, modales, layout, etc.)
│   ├── 📁 context/          # Contextos globales (usuario, notificaciones)
│   ├── 📁 hooks/            # Hooks personalizados (useUser, useToast, etc.)
│   ├── 📁 layout/           # Layout general (Topbar, Sidebar, Layout.tsx)
│   ├── 📁 pages/            # Vistas principales (Login, Registro, Home, NutriScan, Perfil)
│   ├── 📁 services/         # Conexión a endpoints del backend (authService, profileService, etc.)
│   ├── 📁 types/            # Interfaces y tipos de datos
│   ├── 📁 utils/            # Funciones auxiliares
│   ├── 📄 App.tsx          # Definición de rutas con React Router
│   └── 📄 main.tsx         # Punto de entrada de la app
├── 📄 tailwind.config.js   # Configuración de Tailwind CSS
├── 📄 vite.config.ts       # Configuración de Vite
├── 📄 tsconfig.json        # Configuración de TypeScript
├── 📄 package.json         # Scripts y dependencias
└── 📄 README.md            # Información inicial del proyecto
````

---

## 📁 ¿Qué contiene cada carpeta?

| Carpeta       | Funcionalidad                                                |
| ------------- | ------------------------------------------------------------ |
| `public/`     | HTML base (`index.html`) e íconos para favicon               |
| `components/` | Reutilizables (inputs, botones, menús, etc.)                 |
| `context/`    | Control de usuario, loading global, toasts                   |
| `layout/`     | Estructura visual: sidebar, topbar y layout base             |
| `pages/`      | Vistas como Login, Registro, Home, NutriScan, Perfil, etc.   |
| `services/`   | Axios para comunicarse con el backend                        |
| `hooks/`      | Hooks personalizados para lógica compartida                  |
| `types/`      | Interfaces (User, Producto, Perfil, etc.)                    |
| `utils/`      | Validadores, manejo de fechas, funciones pequeñas            |
| `App.tsx`     | Rutas principales con `<Routes>` y `<Route>` de React Router |
| `main.tsx`    | Renderizado general, router y contextos                      |

---

## ⚙️ Instalación y ejecución

```bash
# 1. Clona el repositorio
git clone https://github.com/tuusuario/producttrack.git
cd producttrack/frontend

# 2. Instala dependencias
npm install

# 3. Ejecuta la app
npm run dev
```

---

## 📌 Rutas de navegación

No usamos un archivo de rutas centralizado, sino que las rutas se configuran directamente en `App.tsx`.
Estas rutas dependen del tipo de usuario (individual, empresa, equipo) y pueden incluir:

* `/login` → Inicio de sesión
* `/register` → Registro de usuario
* `/home` → Página principal del inventario
* `/nutriscan` → Escaneo y análisis nutricional
* `/profile` → Perfil del usuario
* `/team` → Gestión de equipo empresarial
* `/admin` → Panel de administración (solo para administrador)

---

## 🛠️ Comandos útiles

```bash
npm run dev         # Modo desarrollo
npm run build       # Build para producción
npm run preview     # Previsualizar el build
```
