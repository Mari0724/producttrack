---
id: cloudinary
title: Contiguracion cloudinary
sidebar_label: cloudinary
---

# cloudinary.ts

Este archivo configura y exporta la instancia de **Cloudinary** para su uso en el proyecto. Cloudinary es un servicio que permite la gestión de imágenes y videos en la nube, y este archivo establece la configuración necesaria para conectarse con su API.

## 🔍 Ubicación

`src/config/cloudinary.ts`

## 📦 Dependencia utilizada

```ts
import { v2 as cloudinary } from 'cloudinary';
```

Se importa la versión 2 del SDK oficial de Cloudinary.

⚙️ Configuración
```ts
Copiar código
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});
```
Cloudinary se configura usando variables de entorno:

| Variable de entorno	| Descripción |
|---------------------|-------------|
| CLOUDINARY_CLOUD_NAME	| Nombre del cloud asociado a tu cuenta. |
| CLOUDINARY_API_KEY	| Clave pública de la API. |
| CLOUDINARY_API_SECRET	| Clave secreta de la API. |

⚠️ El símbolo ! en TypeScript asegura que las variables no son undefined (non-null assertion operator). Asegúrate de que estén correctamente definidas en tu archivo .env.

🚀 Exportación
```ts
export default cloudinary;
```

Se exporta la instancia configurada de cloudinary para ser utilizada en otras partes del proyecto, como servicios que suben imágenes.

🧪 Ejemplo de uso
```ts

import cloudinary from "../config/cloudinary";

const resultado = await cloudinary.uploader.upload("ruta/archivo.png", {
  folder: "mi-carpeta",
});
```
Este ejemplo sube una imagen a Cloudinary y la guarda en la carpeta "mi-carpeta".

📝 Notas adicionales
- Este archivo centraliza la configuración de Cloudinary.
- Se recomienda no subir este archivo al repositorio sin ignorar las claves en .env.
