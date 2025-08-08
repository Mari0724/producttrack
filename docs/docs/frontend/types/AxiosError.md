---
id: axios-error-type
title: Tipo AxiosErrorResponse
sidebar_label: Axios Error
---

Este archivo define la interfaz **`AxiosErrorResponse`**, utilizada para tipar las respuestas de error provenientes de solicitudes HTTP realizadas con Axios.

---
## 🔍 Ubicación
`src/types/AxiosError.ts`

---
## Descripción
La interfaz **`AxiosErrorResponse`** especifica la estructura esperada de un error retornado por Axios cuando el servidor responde con un mensaje de error.  
Permite acceder de forma tipada y segura a la propiedad `message` dentro del objeto de error.

## Definición
```ts
export interface AxiosErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}
````

## Campos

* **`response`** *(object)*
  Contiene la información completa de la respuesta del servidor.

  * **`data`** *(object)*
    Datos retornados por el servidor.

    * **`message`** *(string)*
      Mensaje de error enviado por el servidor. Usualmente describe la causa del fallo.

---
## Uso

Se emplea para tipar el error capturado en bloques `try...catch` cuando se realizan peticiones con Axios, facilitando el acceso al mensaje de error.

```ts
import { AxiosError } from 'axios';
import { AxiosErrorResponse } from '../types/AxiosError';

try {
  await axios.get('/ruta');
} catch (error) {
  const err = error as AxiosError<AxiosErrorResponse>;
  console.error(err.response?.data.message);
}
```
---