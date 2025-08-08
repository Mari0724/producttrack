---
id: preferenciasdto
title: Preferencias del Usuario DTO
sidebar_label: Preferencias DTO
---

## 🎯 Descripción

El archivo `PreferenciasDTO.ts` define la estructura del objeto que representa las preferencias de notificación configuradas por el usuario. Estas preferencias permiten al sistema saber qué tipo de alertas o notificaciones desea recibir el usuario en relación con su inventario.

---

## 🔍 Ubicación

`src/model/PreferenciasDTO.ts`

---

## 📦 Estructura del DTO

```ts
export interface PreferenciasDTO {
  stockBajo: boolean;
  productoVencido: boolean;
  comentarios: boolean;
  reposicion: boolean;
  actualizacion: boolean;
}
````

---

## 🧩 Campos

| Campo             | Tipo    | Descripción                                                                                    |
| ----------------- | ------- | ---------------------------------------------------------------------------------------------- |
| `stockBajo`       | boolean | Indica si el usuario desea recibir notificaciones cuando el stock es bajo.                     |
| `productoVencido` | boolean | Define si el usuario quiere alertas sobre productos vencidos.                                  |
| `comentarios`     | boolean | Determina si se notificarán nuevos comentarios sobre productos.                                |
| `reposicion`      | boolean | Informa si el usuario desea alertas de reposición recomendada.                                 |
| `actualizacion`   | boolean | Muestra si el usuario desea ser notificado sobre actualizaciones del sistema o del inventario. |

---

## 🧠 Uso

Este DTO puede ser utilizado para guardar y recuperar las preferencias individuales del usuario en relación con los eventos importantes del sistema, permitiendo una experiencia personalizada y centrada en sus necesidades.

---
