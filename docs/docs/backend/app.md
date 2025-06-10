---
id: app
title: app
sidebar_label: app
---

# `app.ts`

Este archivo inicializa y configura la aplicación Express. Carga variables de entorno, define middlewares como CORS y `bodyParser`, registra rutas manuales y generadas con TSOA, y configura Swagger para documentación interactiva.

---

## 🔍 Ubicación

`src/app.ts`

---

## 📦 Dependencias

* **dotenv**: Carga variables de entorno desde un archivo `.env`.
* **reflect-metadata**: Necesario para que TypeScript pueda usar decoradores (utilizado por TSOA).
* **express**: Framework principal para construir la API.
* **cors**: Habilita CORS para permitir peticiones desde el frontend.
* **body-parser**: Middleware para parsear JSON del cuerpo de las peticiones.
* **swagger-ui-express**: Permite visualizar y probar la documentación generada por Swagger.
* **swagger.json**: Archivo generado automáticamente por TSOA para la documentación de la API.
* **ocr.routes.ts**: Ruta personalizada para la funcionalidad NutriScan OCR.

---

## 🚀 Inicialización

```ts
import dotenv from "dotenv";
dotenv.config();
````

Se cargan las variables de entorno desde un archivo `.env`, como el `JWT_SECRET`, credenciales de la base de datos, el puerto del servidor, etc.

---

## 🌐 CORS

```ts
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
```

Este middleware permite que el frontend (por ejemplo, una aplicación Vite en `localhost:5173`) pueda comunicarse con esta API respetando las políticas de seguridad del navegador (CORS).

---

## 🧩 Middleware

```ts
app.use(bodyParser.json());
```

Permite que Express entienda el cuerpo de las peticiones con formato JSON.

---

## 🛣️ Rutas Manuales

```ts
import nutriscanOCRRoutes from './routes/ocr.routes';
app.use('/', nutriscanOCRRoutes);
```

Las rutas personalizadas, como las de NutriScan OCR, se deben registrar **antes** de `RegisterRoutes(app)` para evitar conflictos o sobrescritura.

---

## 🔌 Rutas TSOA

```ts
RegisterRoutes(app);
```

Registra automáticamente todas las rutas generadas por el decorador TSOA (`@Route`, `@Get`, `@Post`, etc.). Estas rutas se definen en los controladores dentro del proyecto y se agrupan en `routes.ts`.

---

## 📚 Swagger UI

```ts
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
```

Este middleware genera una interfaz web interactiva para visualizar y probar tu API con Swagger en la ruta: `http://localhost:<puerto>/docs`.

---

## ✅ Exportación

```ts
export default app;
```

Exporta la aplicación configurada para que pueda ser utilizada en `server.ts`, encargándose allí de ponerla en marcha y escuchar el puerto.

---

## 📌 Notas

* Las rutas personalizadas deben ir **antes** de `RegisterRoutes`.
* Este archivo solo configura la aplicación; el archivo `server.ts` es el que inicia el servidor.
* Puedes agregar middlewares de autenticación, manejo de errores globales o loggers según sea necesario.

---

## 🧪 Ejemplo de uso en `server.ts`

```ts
import app from './src/app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```