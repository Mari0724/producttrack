---
id: notificar-producto-vencido
title: Notificar Producto Vencido
sidebar_label: Notificación de productos vencidos
---

# Notificación de Productos Vencidos

Esta función busca productos cuya fecha de vencimiento ya ha pasado y genera notificaciones para todos los miembros de la empresa asociada al usuario que creó el producto. Solo aplica a usuarios empresariales.

---

## 🔍 Ubicación

`src/services/notificaciones/notificar.ProductoVencido.ts`

---

## 🔔 Función: notificarProductoVencido

```ts
export async function notificarProductoVencido(): Promise<void>
```

#### ✅ Propósito:
Generar notificaciones para todos los miembros de una empresa cuando alguno de sus productos ha vencido.

---

## 🔍 Comportamiento:

1. Obtiene la fecha actual.

2. Consulta todos los productos vencidos cuyo usuario sea de tipo EMPRESARIAL.

3. Busca a los miembros de la empresa del usuario dueño del producto.

4. Crea una notificación para cada miembro con un mensaje personalizado.

---

## 📤 Notificación generada:

- Tipo: `PRODUCTO_VENCIDO`

- Título: `Producto vencido: <nombre del producto>`

- Mensaje: `"El producto <nombre> ha vencido el <fecha de vencimiento>"`

---

## ⚙️ Requisitos:
- El producto debe tener una `fechaVencimiento` menor a la fecha actual.

- El usuario asociado debe ser `EMPRESARIAL`.

- El usuario debe tener un `empresaId`.

- La notificación se guarda en la tabla `notificaciones`.

---

## 🧠 Ejemplo de notificación:
```json
{
  "idUsuario": 123,
  "tipo": "PRODUCTO_VENCIDO",
  "titulo": "Producto vencido: Leche deslactosada",
  "mensaje": "El producto \"Leche deslactosada\" ha vencido el 08/06/2025."
}
```

---

## 📦 Dependencias:
- `prisma`: para las consultas a la base de datos.

- Tipos del modelo `TipoNotificacion` desde Prisma.

---