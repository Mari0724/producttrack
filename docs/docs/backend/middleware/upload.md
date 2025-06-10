---
id: upload
title: Middleware upload
sidebar_label: Upload
---

# Middleware: `upload.ts`

Este middleware configura **la subida de archivos (imágenes)** al servicio en la nube **Cloudinary**, utilizando `multer` como gestor de archivos. Centraliza toda la lógica para almacenar imágenes en carpetas específicas de tu cuenta Cloudinary.

---

## 🔍 Ubicación

`src/middleware/upload.ts`

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

## ✅ Validación de variables de entorno

```ts
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error("❌ Faltan variables de entorno de Cloudinary. Verifica tu archivo .env");
}
```

Antes de configurar Cloudinary, se valida que las variables necesarias estén definidas. Esto evita errores silenciosos en producción.

---

## ☁️ Configuración de Cloudinary

```ts
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
```

| Variable del entorno    | Descripción                       |
| ----------------------- | --------------------------------- |
| `CLOUDINARY_CLOUD_NAME` | Nombre del espacio en Cloudinary. |
| `CLOUDINARY_API_KEY`    | Clave pública de la API.          |
| `CLOUDINARY_API_SECRET` | Clave secreta para autenticación. |

---

## 📦 Configuración del almacenamiento en Cloudinary

```ts
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'producttrack/perfiles',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
      transformation: [{ width: 500, height: 500, crop: 'limit' }],
    };
  },
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
export const upload = multer({ storage });
```

Puedes usarlo directamente en rutas del backend como middleware para manejar la subida de archivos.

---

## ✅ Ejemplo de uso en rutas

```ts
import { upload } from "../middleware/upload";

router.post("/perfil/foto", upload.single("imagen"), controlador.subirFoto);
```

| Método                    | Explicación                                                      |
| ------------------------- | ---------------------------------------------------------------- |
| `upload.single("imagen")` | Procesa un solo archivo bajo el campo `"imagen"` del formulario. |
| `upload.array("fotos")`   | Para subir múltiples imágenes.                                   |
| `upload.fields([...])`    | Para manejar múltiples campos con archivos diferentes.           |

---

## 📝 Resumen

| Elemento             | Valor                                |
| -------------------- | ------------------------------------ |
| Almacenamiento       | Cloudinary (`producttrack/perfiles`) |
| Middleware de subida | `multer`                             |
| Archivos permitidos  | `.jpg`, `.png`, `.jpeg`, `.webp`     |
| Transformación       | Máximo 500x500 px (`crop: limit`)    |
| Validación `.env`    | Sí, con `throw` si faltan variables  |
| Flexibilidad         | Alta (con `params` asíncrono)        |

---

## 🧠 Notas adicionales

* No es necesario crear manualmente la carpeta en Cloudinary.
* Las imágenes subidas devuelven una URL pública para ser usadas directamente en frontend.
* Puedes modificar el nombre de la carpeta o agregar marcas de agua desde `params`.

