---
id: streamifierTypes
title: Tipado para Streamifier
sidebar_label: Streamifier 
---

Este archivo declara el módulo **`streamifier`** para proporcionar compatibilidad de tipos en TypeScript.  
En proyectos donde se utiliza esta librería pero no se cuenta con definiciones oficiales (`@types/streamifier`), este archivo actúa como tipado manual (*type declaration*).

---

## 🔍 Ubicación

`src/types/streamifer.d.ts`

---

## 📌 Descripción general

El módulo expone una única función:

| Función                | Parámetros            | Retorno    | Descripción |
|------------------------|-----------------------|------------|-------------|
| `createReadStream`     | `buffer: Buffer`      | `Readable` | Crea un flujo de lectura (`Readable Stream`) a partir de un **Buffer** en memoria. |

---

## 🔗 Uso

Este tipado permite a TypeScript reconocer y validar correctamente las llamadas a `createReadStream` cuando se importa desde `streamifier`.

**Ejemplo:**

```ts
import { createReadStream } from 'streamifier';

const buffer = Buffer.from('Hola mundo');
const stream = createReadStream(buffer);

// El stream ahora puede ser procesado como cualquier Readable Stream
stream.pipe(process.stdout);
````

---

## 🧩 Relación con otros módulos

* Se utiliza en funcionalidades donde es necesario convertir un **Buffer** (por ejemplo, un archivo en memoria) en un flujo de lectura compatible con APIs que esperan `Readable Streams`.
* Es común en integraciones con servicios de almacenamiento o procesamiento que aceptan streams en lugar de buffers.

---

## ⚠️ Consideraciones

* Este archivo **solo** declara el tipado; la lógica real de `streamifier` proviene de la librería instalada.
* Si en el futuro se instala un paquete oficial de tipados (`@types/streamifier`), este archivo podría ser eliminado para evitar conflictos.
* Al ser un tipado global, cualquier importación de `streamifier` en el proyecto usará estas definiciones.

---
