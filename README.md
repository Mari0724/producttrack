
## 🧱 Arquitectura

La arquitectura se conoce comúnmente como "Arquitectura en capas" (o Layered Architecture), y también se puede describir como una arquitectura modular basada en responsabilidad separada. 

---

# 📦 CRM Backend - API RESTful

Este proyecto es una API construida con **Node.js**, **Express** y **TypeScript**, usando herramientas modernas como **TSOA**, **Prisma**, **Zod** y **PostgreSQL**. El backend está estructurado con una arquitectura modular clara y escalable.

---

## 🚀 Tecnologías utilizadas

- **Node.js** – Motor de ejecución JavaScript
- **Express** – Framework para manejar rutas y middlewares
- **TypeScript** – Tipado estático para mayor mantenibilidad
- **TSOA** – Decoradores para generar rutas y documentación Swagger
- **Zod** – Validación de datos segura
- **Prisma** – ORM para PostgreSQL
- **Swagger UI** – Documentación automática de la API
- **Multer y Cloudinary** – Para gestión de imágenes (próximamente)

---

## 🧱 Estructura del proyecto

```
📦 raíz/
├── 📁 docs/                 # Documentación Swagger generada por TSOA
│   └── 📄 swagger.json      # Especificación OpenAPI generada
│
├── 📁 prisma/               # Esquema de base de datos Prisma y migraciones
│   ├── 📁 migrations/       # Historial de migraciones Prisma
│   └── 📄 schema.prisma     # Modelo de datos de Prisma
│
├── 📁 src/                  # Código fuente principal
│   ├── 📄 app.ts            # Configuración de Express y middlewares
│   ├── 📄 index.ts          # Punto de entrada del servidor (listener)
│
│   ├── 📁 prisma/           
│   │   └── 📄 prismaClient.ts   # Instancia global de Prisma Client
│
│   ├── 📁 controllers/      # Controladores de TSOA (lógica de endpoints)
│   │   └── 📄 UserController.ts
│
│   ├── 📁 models/           # Validaciones y tipos
│   │   ├── 📁 dto/          # Esquemas de entrada (Data Transfer Objects)
│   │   │   └── 📄 UserDTO.ts
│   │   └── 📁 schemas/      # Validaciones con Zod
│   │       └── 📄 UserModel.ts
│
│   ├── 📁 middleware/       # Middlewares personalizados (auth, errores)
│
│   ├── 📁 services/         # Lógica de negocio compleja separada de controllers
│
│   ├── 📁 uploads/          # Carpeta temporal para archivos subidos (ej. fotos)
│
│   └── 📁 routes/           # Rutas registradas manualmente (no usado con TSOA)
│
├── 📄 .env                  # Variables de entorno (ocultas al subir)
├── 📄 .gitignore            # Ignora carpetas y archivos innecesarios (como node_modules)
├── 📄 package.json          # Scripts y dependencias del proyecto
├── 📄 package-lock.json     # Versión exacta de dependencias
├── 📄 tsconfig.json         # Configuración de TypeScript
├── 📄 tsoa.json             # Configuración del generador de TSOA
└── 📄 README.md             # Documentación principal del proyecto
```

---

## 📁 ¿Qué va en cada carpeta?

| Carpeta        | ¿Qué contiene? |
|----------------|----------------|
| `controllers/` | Clases decoradas con `@Route`, `@Get`, `@Post`, etc. usando TSOA |
| `models/`      | `dto/` para estructuras de datos (entrada/salida) y `schemas/` para validaciones con Zod |
| `middleware/`  | Middlewares para validaciones, autenticación y control de acceso |
| `services/`    | Lógica de negocio reutilizable, separada del controlador |
| `utils/`       | Funciones auxiliares como `zodValidate`, `prismaClient`, etc. |
| `uploads/`     | Carpeta temporal para imágenes o archivos subidos (ej. por Multer) |
| `prisma/`      | Archivo `schema.prisma` y migraciones generadas por Prisma |
| `docs/`        | Archivo Swagger JSON generado por TSOA |

---
## ✨ Estado del proyecto
 - Crear y buscar usuarios
 - Validaciones estrictas con Zod
 - Actualizar y eliminar usuarios
 - Carga de imagen a Cloudinary
 - Autenticación y roles

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
```

---

## 🛠️ Comandos útiles

```bash
npm run dev                 # Ejecuta el servidor en modo desarrollo
npm run build               # Compila el código TypeScript a JavaScript
npx prisma migrate dev      # Aplica migraciones de base de datos
npx prisma studio           # Interfaz web para gestionar tu base de datos
npx tsoa routes && spec     # Genera rutas y Swagger a partir de decoradores
```

---

## 📘 Documentación

Una vez que el servidor esté corriendo, accede a la documentación en:

```
http://localhost:3000/docs
```

---

## 🧑‍💻 Autora

**Ximena**  
Estudiante de Análisis y Desarrollo de Software y Contaduría Pública  
💡 Apasionada por el frontend, backend y crear soluciones útiles

---

## 🛡️ Licencia

Este proyecto está bajo la licencia MIT.