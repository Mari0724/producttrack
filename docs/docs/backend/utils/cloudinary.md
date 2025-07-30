---
id: utils-cloudinary
title: Utilidades Cloudinary
sidebar_label: cloudinary
---

# Cloudinary

Este archivo contiene funciones auxiliares para la carga de imágenes a **Cloudinary** desde un buffer en memoria, y para la generación de URLs públicas seguras. Se utiliza principalmente en el flujo OCR de NutriScan.

---

## 📌 Ubicación

`src/utils/cloudinary.ts`

---

## 📦 Dependencias

```ts
import cloudinary from '../config/cloudinary'; // Configuración de Cloudinary
import streamifier from 'streamifier';          // Convierte buffer en stream
````

---

## 🔧 Funciones Exportadas

### 📤 `cloudinaryUploadBuffer(buffer: Buffer, folder = 'nutriscan-ocr')`

Carga una imagen a Cloudinary directamente desde un `Buffer` (por ejemplo, proveniente de un archivo subido en memoria).

#### 🔐 Parámetros

| Parámetro | Tipo     | Descripción                                           |
| --------- | -------- | ----------------------------------------------------- |
| `buffer`  | `Buffer` | Contenido binario de la imagen.                       |
| `folder`  | `string` | Carpeta en Cloudinary (por defecto: `nutriscan-ocr`). |

#### 📥 Retorno

Una `Promise` que se resuelve con los datos del archivo subido (`result`) o se rechaza con un `error`.

#### ⚙️ Internamente

* Crea un `uploadStream` usando `cloudinary.uploader.upload_stream`.
* Usa `streamifier.createReadStream(buffer)` para convertir el buffer en un flujo legible y lo encadena con `.pipe()`.

#### 🧪 Ejemplo de uso

```ts
const resultado = await cloudinaryUploadBuffer(req.file.buffer);
console.log(resultado.secure_url);
```

---

### 🔗 `obtenerUrlPreprocesada(publicId: string)`

Genera una URL pública y segura para un recurso en Cloudinary.

#### 🧾 Parámetros

| Parámetro  | Tipo     | Descripción                           |
| ---------- | -------- | ------------------------------------- |
| `publicId` | `string` | ID público del archivo en Cloudinary. |

#### 📥 Retorno

Una cadena (`string`) con la URL generada de forma segura (`https`).

#### 🧪 Ejemplo

```ts
const url = obtenerUrlPreprocesada("nutriscan-ocr/imagen_123");
console.log(url); // https://res.cloudinary.com/...
```

---

## 🧾 Resumen

| Función                  | Descripción                                                |
| ------------------------ | ---------------------------------------------------------- |
| `cloudinaryUploadBuffer` | Sube una imagen en formato buffer a Cloudinary.            |
| `obtenerUrlPreprocesada` | Genera una URL segura (`https`) a partir de un `publicId`. |
| Carpeta por defecto      | `nutriscan-ocr`                                            |
| Uso principal            | OCR de imágenes para análisis nutricional (`NutriScan`).   |

---

## 🛠️ Nota

Estas utilidades requieren una configuración previa del cliente de Cloudinary en `../config/cloudinary.ts`, donde deben cargarse las credenciales (`cloud_name`, `api_key`, `api_secret`) desde variables de entorno.

