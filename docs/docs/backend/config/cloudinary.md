---
id: cloudinary
title: Configuración Cloudinary
sidebar_label: cloudinary
---


Este módulo configura e integra el servicio de almacenamiento de imágenes Cloudinary con el backend. Incluye una función personalizada para subir imágenes directamente y un almacenamiento compatible con multer para facilitar la carga desde formularios.

---

## 🔍 Ubicación

src/config/cloudinary.ts

---

## 📦 Dependencias utilizadas

```ts
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
```

* cloudinary: SDK oficial para interactuar con el servicio Cloudinary.
* multer-storage-cloudinary: Adaptador para usar Cloudinary como almacenamiento con multer.

---

## 🔧 Configuración de Cloudinary

```ts
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});
```

| Variable de entorno     | Descripción                               |
| ----------------------- | ----------------------------------------- |
| CLOUDINARY\_CLOUD\_NAME | Nombre del Cloud en tu cuenta Cloudinary. |
| CLOUDINARY\_API\_KEY    | Clave pública de la API de Cloudinary.    |
| CLOUDINARY\_API\_SECRET | Clave privada de la API de Cloudinary.    |

> El operador ! en TypeScript indica que se espera que la variable esté definida.

---

## 📤 Función: subirImagenCloudinary

Sube una imagen a Cloudinary manualmente desde una ruta de archivo local.

```ts
export const subirImagenCloudinary = async (filePath: string) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'productos',
  });
  return result.secure_url;
};
```

| Parámetro | Tipo   | Descripción                     |
| --------- | ------ | ------------------------------- |
| filePath  | string | Ruta local del archivo a subir. |

🔁 Retorna: una `Promise<string>` con la URL segura (https) de la imagen subida.

⚠️ Si ocurre un error, se lanza una excepción y se imprime en consola.

---

## 🗂️ Almacenamiento Cloudinary para multer

Este storage se usa para manejar cargas directas desde formularios usando multer.

```ts
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'productos',
      format: 'jpg',
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});
```

| Campo      | Descripción                                                             |
| ---------- | ----------------------------------------------------------------------- |
| folder     | Carpeta de destino en Cloudinary.                                       |
| format     | Formato forzado de la imagen (`jpg`).                                   |
| public\_id | Nombre público generado automáticamente basado en timestamp y filename. |

Este storage se puede usar en el middleware multer como:

```ts
import multer from 'multer';
import { storage } from './config/cloudinary';

const upload = multer({ storage });
```

---

## 🚀 Exportaciones

```ts
export { cloudinary, storage };
```

Exporta:

* cloudinary: la instancia configurada de Cloudinary.
* storage: el almacenamiento personalizado para multer.

---

## ✅ Ejemplo de uso

Subida manual:

```ts
const url = await subirImagenCloudinary("uploads/tmp/imagen.jpg");
```

Multer middleware:

```ts
router.post("/cargar", upload.single("imagen"), (req, res) => {
  res.json({ url: req.file.path });
});
```

---

