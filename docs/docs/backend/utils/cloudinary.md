---
id: utils-cloudinary
title: Utilidades Cloudinary
sidebar_label: Cloudinary
---

Este archivo contiene funciones auxiliares para **subir imágenes a Cloudinary desde un buffer en memoria** y para **generar URLs públicas seguras**.  
Se usa principalmente en el flujo OCR de NutriScan.

---

## 🔍 Ubicación

`src/utils/cloudinary.ts`

---

## 📦 Dependencias

```ts
import { cloudinary } from '../config/cloudinary'; // Cliente Cloudinary configurado
import streamifier from 'streamifier';              // Convierte buffer en stream legible
````

---

## 🔧 Funciones Exportadas

### 📤 `cloudinaryUploadBuffer(buffer: Buffer, folder = 'nutriscan-ocr')`

Sube una imagen a Cloudinary directamente desde un `Buffer` (por ejemplo, un archivo recibido en memoria con Multer).

#### 🔐 Parámetros

| Parámetro | Tipo     | Obligatorio | Descripción                                                                                  |
| --------- | -------- | ----------- | -------------------------------------------------------------------------------------------- |
| `buffer`  | `Buffer` | ✅           | Contenido binario de la imagen.                                                              |
| `folder`  | `string` | ❌           | Carpeta de destino en Cloudinary (por defecto: `"nutriscan-ocr"`). Permite agrupar imágenes. |

#### 📥 Retorno

`Promise<any>` — Se resuelve con el objeto de respuesta de Cloudinary (`UploadApiResponse`) o se rechaza con un error.

#### ⚙️ Internamente

1. Crea un flujo de subida con `cloudinary.uploader.upload_stream`, indicando la carpeta de destino.
2. Convierte el `Buffer` en un stream con `streamifier.createReadStream(buffer)`.
3. Encadena el stream para subirlo directamente a Cloudinary.

#### 🧪 Ejemplo de uso

```ts
const resultado = await cloudinaryUploadBuffer(req.file.buffer);
console.log(resultado.secure_url);
```

---

### 🔗 `obtenerUrlPreprocesada(publicId: string)`

Genera una URL pública y segura (`https`) para acceder a un recurso en Cloudinary.
**No aplica transformaciones** a la imagen; devuelve el recurso tal como está almacenado.

#### 🧾 Parámetros

| Parámetro  | Tipo     | Obligatorio | Descripción                           |
| ---------- | -------- | ----------- | ------------------------------------- |
| `publicId` | `string` | ✅           | ID público del archivo en Cloudinary. |

#### 📥 Retorno

`string` — URL segura generada por Cloudinary.

#### 🧪 Ejemplo

```ts
const url = obtenerUrlPreprocesada("nutriscan-ocr/imagen_123");
console.log(url); // https://res.cloudinary.com/...
```

---

## 🧾 Resumen

| Función                  | Descripción                                                    |
| ------------------------ | -------------------------------------------------------------- |
| `cloudinaryUploadBuffer` | Sube una imagen desde un buffer a Cloudinary.                  |
| `obtenerUrlPreprocesada` | Genera una URL segura (`https`) para un recurso en Cloudinary. |
| Carpeta por defecto      | `nutriscan-ocr`                                                |
| Uso principal            | OCR de imágenes para análisis nutricional (`NutriScan`).       |

---

## 🛠️ Nota

Estas utilidades requieren una configuración previa del cliente en [`../config/cloudinary.ts`](../config/cloudinary.md), donde deben cargarse las credenciales (`cloud_name`, `api_key`, `api_secret`) desde variables de entorno.

---