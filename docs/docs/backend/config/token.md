---
id: token
title: Contiguracion token
sidebar_label: Token
---

# token.ts

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
Copiar código
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en el archivo .env");
}
```
Este bloque asegura que la variable JWT_SECRET esté definida, y lanza un error claro si no se encuentra, evitando errores silenciosos en producción.

📝 Notas adicionales
La variable `JWT_SECRET` esta definida en el archivo archivo .env:

```ini
Copiar código
JWT_SECRET=clave_secreta_segura
```
Esta configuración es esencial para los endpoints protegidos por autenticación basada en JWT.

🚀 Uso en autenticación
Las constantes de este archivo se usan normalmente en los servicios que generan y validan tokens:

```ts
Copiar código
import jwt from "jsonwebtoken";
import { JWT_SECRET, TOKEN_EXPIRES_IN } from "../config/token";

const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
```