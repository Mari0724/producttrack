---
id: index
title: 📦 Backend
sidebar_label: 📦 Backend
---

# 📦 Backend - ProductTrack

Bienvenido a la documentación oficial del Backend de **ProductTrack**.  
Aquí encontrarás la arquitectura, tecnologías utilizadas, estructura de carpetas y guías para instalar, ejecutar y mantener este servicio.

---

## 🧱 Arquitectura

La arquitectura se conoce comúnmente como "Arquitectura en capas" (o Layered Architecture), y también se puede describir como una arquitectura modular basada en responsabilidad separada. 

---

## 🚀 Tecnologías utilizadas

- **Node.js** – Motor de ejecución JavaScript
- **Express** – Framework para manejar rutas y middlewares
- **TypeScript** – Tipado estático para mayor mantenibilidad
- **TSOA** – Decoradores para generar rutas y documentación Swagger
- **Zod** – Validación de datos segura
- **Prisma** – ORM para PostgreSQL
- **Swagger UI** – Documentación automática de la API
- **Multer y Cloudinary** – Para gestión de imágenes 
- **JWT (jsonwebtoken)** – Autenticación basada en tokens
- **Bcrypt** – Encriptación de contraseñas

---

## 🧱 Estructura del proyecto

```

📦 backend/
├── 📁 docs/                 # Documentación Swagger generada por TSOA
├── 📁 generated/            # Archivos generados automáticamente por TSOA
├── 📁 node\_modules/         # Dependencias instaladas
├── 📁 prisma/               # Esquema de base de datos Prisma y migraciones
│   ├── 📁 migrations/
│   └── 📄 schema.prisma
├── 📁 src/                  # Código fuente principal
│   ├── 📄 app.ts            # Configuración de Express y middlewares
│   ├── 📄 index.ts          # Punto de entrada del servidor (listener)
│   ├── 📁 config/           # Configuraciones como Cloudinary, JWT, etc.
│   ├── 📁 controllers/      # Controladores de TSOA (lógica de endpoints)
│   ├── 📁 interfaces/       # Tipos e interfaces de dominio
│   ├── 📁 middleware/       # Middlewares personalizados (auth, errores, etc.)
│   ├── 📁 models/           # DTOs y esquemas Zod para validación
│   ├── 📁 routes/           # Enrutamiento manual si aplica
│   ├── 📁 services/         # Lógica de negocio y conexión con repositorios
│   └── 📁 utils/            # Funciones auxiliares reutilizables
├── 📄 .env                  # Variables de entorno (ocultas al subir)
├── 📄 package.json          # Scripts y dependencias del proyecto
├── 📄 package-lock.json     # Lockfile de versiones exactas
├── 📄 tsconfig.json         # Configuración del compilador TypeScript
├── 📄 tsoa.json             # Configuración del generador de TSOA
└── 📄 README.md             # Documentación principal del proyecto

````

---

## 📁 ¿Qué va en cada carpeta?

| Carpeta        | ¿Qué contiene? |
|----------------|----------------|
| `config/`      | Archivos de configuración externa (ej. Cloudinary, JWT, etc.) |
| `controllers/` | Clases decoradas con `@Route`, `@Get`, `@Post`, etc. usando TSOA |
| `interfaces/`  | Interfaces para tipado fuerte de entidades y respuestas |
| `middleware/`  | Middlewares para validaciones, autenticación y manejo de errores |
| `models/`      | `dto/` para estructuras de datos (entrada/salida) y `schemas/` para validaciones con Zod |
| `routes/`      | Rutas personalizadas (si se manejan fuera de TSOA) |
| `services/`    | Lógica de negocio reutilizable y conexión con Prisma u otras APIs |
| `utils/`       | Funciones utilitarias como validadores, clientes reutilizables, helpers, etc. |
| `prisma/`      | Archivo `schema.prisma` y migraciones generadas por Prisma |
| `docs/`        | Documentación Swagger JSON generada por TSOA |
| `generated/`   | Código generado por TSOA automáticamente (no editar manualmente) |

---

## ⚙️ Instalación y ejecución

```bash
# Clona el repositorio
git clone https://github.com/tuusuario/tu-repo.git
cd tu-repo

# Instala dependencias
npm install

# Genera las rutas y Swagger con TSOA
npx tsoa routes && npx tsoa spec

# Ejecuta en modo desarrollo
npm run dev
````

---

## 🛠️ Comandos útiles

```bash
npm run dev                 # Ejecuta el servidor en modo desarrollo
npm run build               # Compila el código TypeScript a JavaScript
npx prisma migrate dev      # Aplica migraciones de base de datos
npx prisma studio           # Interfaz visual para manejar datos en la base
npx tsoa routes && spec     # Genera rutas y Swagger a partir de decoradores
```

---

## 📘 Documentación desplegada

El backend de ProductTrack está desplegado en:

👉 [`https://producttrack-production.up.railway.app/`](https://producttrack-production.up.railway.app/)

Para acceder a la documentación Swagger generada por TSOA, puedes agregar `/docs` al final de la URL:

```
https://producttrack-production.up.railway.app/docs
```

> ⚠️ **Nota:** Por motivos de seguridad, la documentación Swagger está deshabilitada en el entorno de producción.
> Si deseas acceder a Swagger, debes correr el backend **en local** y entrar a:

```
http://localhost:3000/docs
```