---
id: uploadCloudinary
title: Middleware uploadCloudinary
sidebar_label: UploadCloudinary
---

# Middleware: uploadCloudinary.ts

Este middleware configura **la subida de archivos (imágenes)** al servicio en la nube **Cloudinary**, utilizando `multer` como gestor de archivos. Centraliza toda la lógica para almacenar imágenes de forma estructurada y optimizada en carpetas específicas de tu cuenta Cloudinary.

---

## 🔍 Ubicación

`src/middleware/uploadCloudinary.ts`

---

## 📌 Propósito

Permitir que los usuarios suban imágenes (por ejemplo, fotos de perfil) que se almacenarán directamente en Cloudinary. Este middleware puede integrarse fácilmente con rutas protegidas y garantiza un manejo seguro y organizado de archivos.

---

## 🛠️ Dependencias utilizadas

```ts
import dotenv from 'dotenv';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
````

| Paquete                     | Propósito                                                    |
| --------------------------- | ------------------------------------------------------------ |
| `dotenv`                    | Carga las variables de entorno desde un archivo `.env`.      |
| `path`                      | Facilita rutas absolutas para cargar archivos correctamente. |
| `cloudinary`                | Cliente oficial de la API de Cloudinary.                     |
| `multer-storage-cloudinary` | Adaptador de almacenamiento entre Multer y Cloudinary.       |
| `multer`                    | Middleware para manejar archivos tipo `multipart/form-data`. |

---

## 🔐 Carga de variables de entorno

```ts
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
```

Esto asegura que las variables del archivo `.env` sean cargadas correctamente incluso si se ejecuta desde otro directorio.

> ✅ Útil en producción o ambientes donde el punto de entrada puede variar.

---

## ☁️ Configuración de Cloudinary

```ts
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});
```

| Variable del entorno    | Descripción                       |
| ----------------------- | --------------------------------- |
| `CLOUDINARY_CLOUD_NAME` | Nombre del espacio en Cloudinary. |
| `CLOUDINARY_API_KEY`    | Clave pública de la API.          |
| `CLOUDINARY_API_SECRET` | Clave secreta para autenticación. |

> ⚠️ *Asegúrate de que estas variables estén correctamente configuradas en tu archivo `.env`.*

---

## 📦 Configuración del almacenamiento en Cloudinary

```ts
const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: 'producttrack/perfiles',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  }),
});
```

| Propiedad         | Descripción                                                             |
| ----------------- | ----------------------------------------------------------------------- |
| `folder`          | Carpeta destino en Cloudinary: `producttrack/perfiles`.                 |
| `allowed_formats` | Solo se permiten imágenes en `jpg`, `png`, `jpeg` y `webp`.             |
| `transformation`  | Redimensiona la imagen a un máximo de 500x500px sin recorte forzado.    |
| `params`          | Función asíncrona que retorna los parámetros dinámicamente por archivo. |

> 🎯 Usar `params` como función permite lógica condicional futura según el archivo o usuario.

---

## 🚀 Exportación del middleware

```ts
export const uploadCloudinary = multer({ storage });
```

Puedes usarlo directamente en rutas del backend como middleware para manejar la subida de archivos.

---

## ✅ Ejemplo de uso en rutas

```ts
import { uploadCloudinary } from "../middleware/uploadCloudinary";

router.post("/perfil/foto", uploadCloudinary.single("imagen"), controlador.subirFoto);
```

| Método                              | Explicación                                                      |
| ----------------------------------- | ---------------------------------------------------------------- |
| `uploadCloudinary.single("imagen")` | Procesa un solo archivo bajo el campo `"imagen"` del formulario. |
| `uploadCloudinary.array("fotos")`   | Para subir múltiples imágenes.                                   |
| `uploadCloudinary.fields([...])`    | Para manejar múltiples campos con archivos diferentes.           |

---

## 📝 Resumen

| Elemento               | Valor                                |
| ---------------------- | ------------------------------------ |
| Almacenamiento         | Cloudinary (`producttrack/perfiles`) |
| Middleware de subida   | `multer`                             |
| Archivos permitidos    | `.jpg`, `.png`, `.jpeg`, `.webp`     |
| Transformación         | Máximo 500x500 px (`crop: limit`)    |
| Nombre exportado       | `uploadCloudinary`                   |
| Flexibilidad de lógica | Alta (con `params` asíncrono)        |

---

## 🧠 Notas adicionales

* No es necesario crear manualmente la carpeta en Cloudinary.
* Las imágenes subidas devuelven una URL pública para ser usada directamente en el frontend.
* Puedes modificar el nombre de la carpeta, formatos permitidos o agregar marcas de agua desde `params`.

