---
id: app
title: Configuración principal de Express
sidebar_label: app
---

Este archivo inicializa y configura la aplicación backend utilizando **Express**.  
Incluye configuración de CORS, middlewares, rutas, documentación Swagger y tareas programadas, además de definir el punto de entrada para iniciar el servidor.

---

## 🔍 Ubicación

`src/app.ts`

---

## 📌 Descripción general

1. **Importación de módulos clave**  
   - `express`, `cors`, `body-parser` para el servidor y middlewares.
   - `swagger-ui-express` para exponer la documentación de API.
   - `dotenv` para cargar variables de entorno.
   - `cronJobs` para iniciar tareas programadas.
   - Rutas manuales (`ocr.routes`, `user.routes`) y rutas generadas automáticamente por **tsoa**.

2. **Carga de variables de entorno**  
   Se utiliza `dotenv.config()` para leer el archivo `.env`.

3. **Configuración de CORS**  
   Restringe el acceso a orígenes específicos (`localhost:5173` y `localhost:5174`) y define los métodos y credenciales permitidas.

4. **Middlewares de parsing**  
   - `bodyParser.json` y `bodyParser.urlencoded` con límite de 3 MB para manejar datos entrantes en JSON o formularios.

5. **Registro de rutas**  
   - `/api/ocr` → Rutas de OCR.
   - `/api` → Rutas de usuario.
   - `RegisterRoutes(app)` → Registra las rutas generadas automáticamente con tsoa.
   
6. **Documentación Swagger**  
   - Solo se carga en entornos que **no** sean producción.
   - Usa el archivo generado `docs/swagger.json`.

7. **Subida de imágenes**  
   Ruta `POST /upload` que usa el middleware `uploadProductos` para subir imágenes a **Cloudinary**.  
   Devuelve la URL y el `public_id` del archivo subido.

8. **Ruta raíz (`/`)**  
   Devuelve un mensaje de bienvenida e indica cómo probar las rutas en Swagger o Postman según el entorno.

9. **Inicio del servidor**  
   Escucha en el puerto definido en `process.env.PORT` o en `3000` por defecto.

---

## 🔗 Uso

Este archivo se ejecuta automáticamente cuando se levanta el servidor.  
En un proyecto TypeScript, normalmente es invocado desde `src/index.ts` o directamente con el comando de inicio (`npm run dev` / `npm start`).

---

## 🧩 Relación con otros módulos

* **Rutas manuales:** `ocr.routes.ts`, `user.routes.ts`.
* **Middleware de subida de archivos:** `allCloudinaryUploads`.
* **Rutas generadas:** `routes/routes.ts` (producidas por tsoa).
* **Tareas programadas:** `utils/cronJobs.ts`.
* **Documentación:** archivo `docs/swagger.json`.

---

## ⚠️ Consideraciones

* En producción, el endpoint `/docs` (Swagger UI) está deshabilitado por seguridad.
* El límite de 3 MB en `bodyParser` puede ajustarse según la necesidad de subida de datos.
* El CORS está limitado a entornos de desarrollo por dominio; si se despliega en otro dominio, debe actualizarse la configuración.
* La subida de imágenes requiere que las credenciales de Cloudinary estén correctamente configuradas en el `.env`.
* El módulo `cronJobs` comienza a ejecutar tareas tan pronto como se importa.

---