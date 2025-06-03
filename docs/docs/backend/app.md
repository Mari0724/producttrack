---
id: app
title: app
sidebar_label: app
---

#  `app.ts`

Este archivo inicializa y configura la aplicación Express. Carga variables de entorno, define middlewares, registra rutas con TSOA y configura Swagger para documentación interactiva.

---

## 🔍 Ubicación

`src/app.ts`

---

## 📦 Dependencias

* **dotenv**: Carga variables de entorno desde un archivo `.env`.
* **reflect-metadata**: Necesario para que TypeScript pueda usar decoradores (usado por TSOA).
* **express**: Framework para construir la API.
* **body-parser**: Middleware para parsear JSON del cuerpo de las peticiones.
* **swagger-ui-express**: Interfaz gráfica para visualizar la documentación generada con Swagger.
* **swagger.json**: Archivo generado automáticamente por TSOA para la documentación de la API.

---

## 🚀 Inicialización

```ts
import dotenv from "dotenv";
dotenv.config();
```

* Se cargan las variables de entorno desde un archivo `.env`, como el `JWT_SECRET`, configuración de la base de datos, puertos, etc.

---

## 🧩 Middleware y Configuración

```ts
app.use(bodyParser.json());
```

* Permite que Express entienda el cuerpo de las peticiones en formato JSON.

---

## 🔌 Registro de Rutas

```ts
RegisterRoutes(app);
```

* Registra automáticamente todas las rutas definidas con TSOA (`@Route`, `@Get`, `@Post`, etc.).
* Este archivo (`routes.ts`) es generado por el compilador TSOA.

---

## 📚 Swagger UI

```ts
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
```

* La documentación de la API estará disponible en: `http://localhost:<puerto>/docs`
* Permite probar las rutas desde una interfaz gráfica (Swagger).

---

## ✅ Exportación

```ts
export default app;
```

* Exporta la aplicación configurada para que pueda ser utilizada en `server.ts` o en archivos de pruebas.

---

## 📌 Notas

* Puedes agregar middlewares personalizados, control de errores o rutas adicionales **después** de `RegisterRoutes(app)`.
* Este archivo actúa como punto de entrada para configurar la instancia de Express, mientras que el archivo `server.ts` es quien la pone en marcha (escucha el puerto).

---

## 🧪 Ejemplo de uso en `server.ts`

```ts
import app from './src/app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```