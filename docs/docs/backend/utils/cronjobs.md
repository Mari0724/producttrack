---
id: cronjobs
title: Cron Jobs
sidebar_label: Notificación diaria de stock bajo
---

# Notificación diaria de stock bajo

Este módulo configura una tarea programada (cron job) que se ejecuta automáticamente todos los días a las 8:00 AM para enviar notificaciones sobre productos con stock bajo. Utiliza la biblioteca `node-cron` y una función del servicio de notificaciones.

---

## 🔍 Ubicación

`src/utils/cronjobs.ts`

---

## ⏰ Cron Job programado

```ts
cron.schedule('0 8 * * *', async () => {
  console.log('Ejecutando notificación de stock bajo...');
  await notificarStockBajo();
});
```

---

## ✅ Propósito

Ejecutar automáticamente la función `notificarStockBajo` cada mañana a las **8:00 AM**, con el fin de alertar sobre productos que necesitan reposición.

---

## 📆 Frecuencia

| Expresión cron | Significado                 |
|----------------|-----------------------------|
| `0 8 * * *`    | Todos los días a las 08:00 AM |

---

## 🔄 Comportamiento

- A las **8:00 AM**, el cron job se activa.
- Se imprime un mensaje en la consola: `"Ejecutando notificación de stock bajo..."`.
- Se ejecuta la función `notificarStockBajo`, que consulta el inventario y envía alertas si es necesario.

---

## 📦 Dependencias

- `node-cron`: biblioteca para programar tareas cron en Node.js.
- `notificarStockBajo`: función ubicada en `src/services/notificaciones/notificar.StockBajo.ts`.

---

## 🧠 Ejemplo de modificación

Si deseas cambiar la hora de ejecución a las **9:30 PM**:

```ts
cron.schedule('30 21 * * *', async () => {
  await notificarStockBajo();
});
```