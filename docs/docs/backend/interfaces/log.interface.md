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
export interface LoginResponse {
  token: string;
  requiereCompletarPerfil: boolean;
  user: {
    idUsuario: number;
    username: string;
    correo: string;
    rol: string;
    tipoUsuario: string | null;
    rolEquipo: string;
    perfilCompleto: boolean;
    empresaId: number | null;
  };
}
```
Descripción
Representa la estructura de la respuesta enviada al cliente después de un inicio de sesión exitoso.

| Campo                   | Tipo           | Descripción                                                      |
| ----------------------- | -------------- | ---------------------------------------------------------------- |
| token                   | string         | JWT generado para autenticar futuras solicitudes.                |
| requiereCompletarPerfil | boolean        | Indica si el usuario debe completar su perfil.                   |
| user                    | object         | Información del usuario autenticado.                             |
| ├─ idUsuario            | number         | ID del usuario.                                                  |
| ├─ username             | string         | Nombre de usuario o nombre completo.                             |
| ├─ correo               | string         | Correo electrónico del usuario.                                  |
| ├─ rol                  | string         | Rol principal del usuario (ADMIN, EMPRESARIAL, EQUIPO, etc).     |
| ├─ tipoUsuario          | string \| null | Tipo de usuario (EMPRESARIAL, INDIVIDUAL, etc.), puede ser nulo. |
| ├─ rolEquipo            | string         | Rol dentro del equipo (LECTOR, COMENTARISTA, EDITOR).            |
| ├─ perfilCompleto       | boolean        | Indica si el usuario ya completó su perfil.                      |
| └─ empresaId            | number \| null | ID de la empresa a la que pertenece, si aplica.                  |


## 📝 Uso común
Estas interfaces se utilizan principalmente en los controladores y servicios relacionados al login para garantizar el tipo de datos esperado.

```ts
Copiar código
async loginUsuario(data: LoginRequest): Promise<LoginResponse> {
  // lógica de autenticación...
}
```