---
id: allCloudinaryUploads
title: Middleware de Subida a Cloudinary
sidebar_label: Subidas a Cloudinary
---

Este middleware configura dos manejadores de subida de archivos a Cloudinary utilizando la librería multer-storage-cloudinary. Se definen dos destinos distintos: uno para imágenes de productos y otro para imágenes de perfil de usuario, cada uno con su configuración respectiva.

---

## 🔍 Ubicación

`src/middleware/allCloudinaryUploads.ts`

---

## 📦 Dependencias utilizadas

```ts
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
```

* dotenv: para cargar variables de entorno desde config/env.
* cloudinary: cliente oficial de Cloudinary.
* multer-storage-cloudinary: adaptador para usar Cloudinary como almacenamiento de multer.
* multer: middleware de manejo de archivos para Express.

---

## ⚙️ Configuración de Cloudinary

```ts
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
```

Carga las credenciales necesarias desde las variables de entorno (.env).

---

## 🗂️ Configuración de almacenamiento

Se definen dos instancias de CloudinaryStorage para organizar imágenes en carpetas separadas:

### 📁 Almacenamiento para productos

```ts
const storageProductos = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: 'producttrack/productos',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  }),
});
```

* Carpeta: producttrack/productos
* Formatos permitidos: jpg, png, jpeg, webp
* Transformación: redimensiona a máximo 500x500 sin recorte forzado

---

### 👤 Almacenamiento para perfiles

```ts
const storagePerfiles = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: 'producttrack/perfiles',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  }),
});
```

* Carpeta: producttrack/perfiles
* Formatos y transformación: igual que productos

---

## 🚀 Exportación de middlewares

```ts
export const uploadPerfiles = multer({ storage: storagePerfiles });
export const uploadProductos = multer({ storage: storageProductos });
```

Estos middlewares pueden ser usados directamente en rutas de Express para procesar subidas:

* uploadPerfiles: subir imágenes a la carpeta perfiles
* uploadProductos: subir imágenes a la carpeta productos

---

## ✅ Ejemplo de uso en rutas

```ts
import { uploadProductos, uploadPerfiles } from "../middleware/allCloudinaryUploads";

router.post("/subir/producto", uploadProductos.single("imagen"), controlador.guardarProducto);
router.post("/subir/perfil", uploadPerfiles.single("avatar"), controlador.guardarPerfil);
```

---

## 🔐 Recomendaciones

* Asegúrate de tener definidas las variables de entorno: CLOUDINARY\_CLOUD\_NAME, CLOUDINARY\_API\_KEY, CLOUDINARY\_API\_SECRET.
* Incluye validaciones de tipo MIME si deseas más seguridad.
