---
id: cloudinary
title: Configuración Cloudinary
sidebar_label: cloudinary
---

# Cloudinary.ts

Este archivo configura y exporta la instancia de **Cloudinary** para su uso en el proyecto. Cloudinary es un servicio que permite la gestión de imágenes y videos en la nube, y este archivo establece la configuración necesaria para conectarse con su API.

---

## 🔍 Ubicación

`src/config/cloudinary.ts`

---

## 📦 Dependencias utilizadas

```ts
import dotenv from "dotenv";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
````

* **dotenv**: Para cargar las variables de entorno definidas en el archivo `.env`.
* **path**: Para resolver rutas absolutas.
* **cloudinary**: SDK oficial para interactuar con el servicio Cloudinary.

---

## ⚙️ Carga de Variables de Entorno

```ts
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
```

* Carga el archivo `.env` ubicado dos niveles arriba del archivo actual, asegurando que las variables estén disponibles incluso si se ejecuta desde diferentes ubicaciones.

> ✅ Es útil cuando el archivo se ejecuta desde entornos distintos como producción, pruebas o desarrollo.

---

## 🔧 Configuración de Cloudinary

```ts
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});
```

| Variable de entorno     | Descripción                            |
| ----------------------- | -------------------------------------- |
| `CLOUDINARY_CLOUD_NAME` | Nombre del Cloud asociado a tu cuenta. |
| `CLOUDINARY_API_KEY`    | Clave pública de la API.               |
| `CLOUDINARY_API_SECRET` | Clave secreta de la API.               |

> ⚠️ El operador `!` en TypeScript asegura que las variables no son `undefined`. Es tu responsabilidad asegurarte de que estén correctamente definidas en el archivo `.env`.

---

## 🔍 Debug opcional

```ts
console.log("🔍 CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
```

Este `console.log` es útil para verificar que la variable `CLOUDINARY_CLOUD_NAME` se haya cargado correctamente.

> 🛠️ Puedes eliminarlo en producción si ya verificaste que todo funciona correctamente.

---

## 🚀 Exportación

```ts
export default cloudinary;
```

Se exporta la instancia de Cloudinary ya configurada para que se pueda usar en otros módulos del proyecto (por ejemplo, en servicios de subida de imágenes).

---

## 🧪 Ejemplo de uso

```ts
import cloudinary from "../config/cloudinary";

const resultado = await cloudinary.uploader.upload("ruta/archivo.png", {
  folder: "mi-carpeta",
});
```

Este ejemplo sube una imagen local a Cloudinary y la almacena dentro de la carpeta `mi-carpeta`.

---

## 📝 Notas adicionales

* Este archivo **centraliza la configuración** de Cloudinary.
* Nunca subas tus credenciales al repositorio. Asegúrate de tener `.env` en tu `.gitignore`.
