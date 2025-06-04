ResponseMessage.md
---
id: ResponseMessage
title: Interface de respuestas
sidebar_label: ResponseMessage
---

# ResponseMessage.ts

Este archivo contiene interfaces reutilizables que definen el formato estándar de las respuestas enviadas desde el servidor, con o sin token.

## 🔍 Ubicación

src/interfaces/ResponseMessage.ts

---

## 📦 ResponseMessage

```ts
export interface ResponseMessage {
  message: string;
  detalles?: any;
}
```

Descripción
Representa una respuesta general enviada al cliente, que incluye un mensaje principal y opcionalmente más detalles.

Campos
| Campo |	Tipo	| Descripción |
|-------|-------|-------------|
| message	| string	| Mensaje principal que describe el resultado de la acción. | 
| detalles	| any	| Información adicional o detalles técnicos (opcional). | 

## 🔐 ResponseMessageWithToken
```ts
Copiar código
export interface ResponseMessageWithToken extends ResponseMessage {
  token?: string;
}
```


Descripción
Extiende ResponseMessage para incluir un token JWT opcional. Se utiliza comúnmente después de autenticaciones o renovaciones de sesión.

Campos adicionales
| Campo	| Tipo	| Descripción | 
| token	| string	| Token JWT generado (usualmente tras login). | 

## 📝 Uso común
Estas interfaces son útiles para mantener consistencia en las respuestas de tus controladores y servicios.

```ts
const response: ResponseMessageWithToken = {
  message: "Inicio de sesión exitoso",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
};
```