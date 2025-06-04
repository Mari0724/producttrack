---
id: cloudinary
title: Cloudinary
sidebar_label: Cloudinary
---

# 📦 Configuración de Cloudinary 

Este archivo configura y exporta la instancia de Cloudinary para su uso en otros módulos del proyecto. Cloudinary es un servicio en la nube para almacenar, transformar y entregar imágenes y videos de forma eficiente.

---

## 🔍 Ubicación

src/config/cloudinary.ts

---

## 🚀 Objetivo

Inicializar Cloudinary con las credenciales del entorno (.env) y exportar la instancia configurada para poder realizar operaciones como carga, eliminación y transformación de archivos multimedia.

---

## 🧩 Dependencias

* [cloudinary](https://www.npmjs.com/package/cloudinary): SDK oficial para interactuar con la API de Cloudinary.
* [dotenv](https://www.npmjs.com/package/dotenv) (opcional): si se quiere cargar variables de entorno desde un archivo .env.

---

## 🔐 Variables de entorno requeridas

Estas variables estan definidas dentro del archivo .env:

```env
CLOUDINARY_CLOUD_NAME=tu_nombre_de_cloud
CLOUDINARY_API_KEY=tu_clave_api
CLOUDINARY_API_SECRET=tu_secreto_api


---

## ⚙ Código explicado

ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };


### 📌 Explicación:

* import { v2 as cloudinary }: Importa la versión 2 del SDK de Cloudinary con un alias.
* cloudinary.config({...}): Configura las credenciales de la cuenta a partir de las variables de entorno.
* export { cloudinary }: Exporta la instancia configurada para usarla en servicios que requieran subir, eliminar o transformar imágenes.

---

## ✅ Buenas prácticas

* Nunca subas tus credenciales directamente al código.
* Utiliza .env y asegúrate de que esté en el .gitignore.
* Puedes probar la configuración usando cloudinary.uploader.upload() en un servicio.

---

## 🛠 Ejemplo de uso

ts
import { cloudinary } from "../config/cloudinary";

const resultado = await cloudinary.uploader.upload("ruta/archivo.png", {
  folder: "productos",
});
console.log(resultado.secure_url);
