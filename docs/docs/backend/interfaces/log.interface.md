---
id: log.interface
title: Interface del log
sidebar_label: Log Interface
---

# log.interface.ts

Este archivo define las interfaces utilizadas en el proceso de **autenticación y generación de tokens** para el login de usuarios.

## 🔍 Ubicación

`src/interfaces/log.interface.ts`

---

## 📥 LoginRequest

```ts
export interface LoginRequest {
  correo: string;
  password: string;
}
```
Descripción
Representa el cuerpo (body) esperado en una solicitud de inicio de sesión.

Campos
|   Campo   |	 Tipo   |	      Descripción           |
|-----------|---------|-----------------------------|
|   correo  | string	| Correo electrónico del usuario. |
| password  | string	| Contraseña del usuario. |

## 📤 LoginResponse
```ts
Copiar código
export interface LoginResponse {
  token: string;
  username: string;
  rol: string;
  tipoUsuario?: string | null;
  rolEquipo?: string;
  requiereCompletarPerfil: boolean;
}
```
Descripción
Representa la estructura de la respuesta enviada al cliente después de un inicio de sesión exitoso.

Campos
| Campo |	Tipo | Descripción |
|-------|------|-------------|
| token	| string | 	JWT generado para autenticar futuras solicitudes. | 
| username	| string	| Nombre de usuario o nombre completo. | 
| rol | 	string |	Rol principal del usuario (por ejemplo, ADMIN, EMPRESARIAL, EQUIPO, etc). | 
| tipoUsuario | string | null	Tipo de usuario (EMPRESARIAL, INDIVIDUAL, etc.), puede ser opcional. | 
| rolEquipo |	string |	Rol dentro del equipo (LECTOR, COMENTARISTA, EDITOR). | 
| requiereCompletarPerfil	| boolean	| Indica si el usuario debe completar su perfil después de iniciar sesión. |

## 📝 Uso común
Estas interfaces se utilizan principalmente en los controladores y servicios relacionados al login para garantizar el tipo de datos esperado.

```ts
Copiar código
async loginUsuario(data: LoginRequest): Promise<LoginResponse> {
  // lógica de autenticación...
}
```