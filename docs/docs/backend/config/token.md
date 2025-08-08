---
id: token
title: Contiguracion token
sidebar_label: Token
---

Este archivo define y exporta las constantes necesarias para la generación y validación de **JSON Web Tokens (JWT)** en el proyecto.

## 🔍 Ubicación

`src/config/token.ts`

---

## 🔐 Constantes exportadas

```ts
export const JWT_SECRET = process.env.JWT_SECRET as string;
```
- `JWT_SECRET`: clave secreta utilizada para firmar y verificar los tokens JWT.
- Se obtiene desde el archivo de entorno .env, y es obligatoria para el correcto funcionamiento del sistema de autenticación.

```ts
export const TOKEN_EXPIRES_IN = "1d"; 
```
- `TOKEN_EXPIRES_IN`: define el tiempo de expiración del token JWT.
- Valor por defecto: "1d" (1 día).
- Se puede personalizar por intervalos como "1h" (1 hora), "7d" (7 días), etc.

🧪 Validación de configuración
```ts
if (!process.env.JWT_SECRET) {
  console.warn("Advertencia: JWT_SECRET no está definida");
}
```
* Si la variable de entorno JWT_SECRET no está definida, se imprime una advertencia en consola.
* Esto permite seguir en desarrollo sin detener la ejecución

🚀 Uso en autenticación
Las constantes de este archivo se usan normalmente en los servicios que generan y validan tokens:

```ts
Copiar código
import jwt from "jsonwebtoken";
import { JWT_SECRET, TOKEN_EXPIRES_IN } from "../config/token";

const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
```