---
id: upload
title: Middleware upload
sidebar_label: Upload
---

#  Middleware: `upload.ts`

Este middleware configura **la subida de archivos (imágenes)** al servicio en la nube **Cloudinary**, utilizando `multer` como middleware para gestionar los archivos desde el cliente.

---

## 🔍 Ubicación

`src/middleware/upload.ts`

## 📌 Propósito

Permitir que los usuarios suban imágenes (por ejemplo, fotos de perfil) que se almacenarán en Cloudinary. Esto se integra fácilmente con rutas protegidas en el backend y garantiza un manejo eficiente de archivos.

---

## 🛠️ Dependencias utilizadas

```ts
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
````

* **cloudinary**: Cliente de la API de Cloudinary.
* **CloudinaryStorage**: Adaptador de almacenamiento para `multer` que conecta con Cloudinary.
* **multer**: Middleware para manejar `multipart/form-data`, utilizado para la subida de archivos.
* **dotenv**: Para cargar variables de entorno desde `.env`.

---

## 🔐 Variables de entorno requeridas

Este middleware requiere que existan las siguientes variables definidas en el archivo `.env`:

```env
CLOUDINARY_NAME=<tu_nombre_en_cloudinary>
CLOUDINARY_API_KEY=<tu_api_key>
CLOUDINARY_API_SECRET=<tu_api_secret>
```

Estas credenciales son necesarias para autenticar el uso de Cloudinary.

---

## ☁️ Configuración de Cloudinary

```ts
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
```

---

## 📦 Configuración de almacenamiento

```ts
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'producttrack/perfiles',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }],
    } as any,
});
```

* **folder**: Las imágenes se guardan en la carpeta `producttrack/perfiles` en Cloudinary.
* **allowed\_formats**: Solo se permiten imágenes en formatos `jpg`, `png`, `jpeg` y `webp`.
* **transformation**: Las imágenes se ajustan a un máximo de 500x500 píxeles, manteniendo su proporción (`crop: 'limit'`).

---

## 🧩 Exportación del middleware

```ts
export const upload = multer({ storage });
```

Esto permite utilizar `upload` como middleware en rutas para manejar archivos subidos.

---

## ✅ Ejemplo de uso en rutas

```ts
import { upload } from "../middleware/upload";

router.post("/perfil/foto", upload.single("imagen"), controlador.subirFoto);
```

* El campo `"imagen"` debe coincidir con el nombre del campo en el formulario HTML o frontend.
* Se puede utilizar `.single()`, `.array()`, o `.fields()` según el tipo de carga.

---

## 📤 Resumen

| Elemento             | Valor                                  |
| -------------------- | -------------------------------------- |
| Almacenamiento       | Cloudinary (`producttrack/perfiles`)   |
| Middleware de subida | `multer`                               |
| Archivos permitidos  | `.jpg`, `.png`, `.jpeg`, `.webp`       |
| Transformación       | Máximo 500x500 px, sin recorte forzado |

---

## 🔍 Notas adicionales

* No es necesario crear manualmente la carpeta en Cloudinary.
* Las imágenes pueden ser accedidas luego con las URLs públicas generadas por Cloudinary.
* Este middleware es ideal para manejar fotos de perfil, logos de empresa u otros recursos visuales.

---
