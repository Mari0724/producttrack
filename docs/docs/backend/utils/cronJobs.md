---
id: cronJobs
title: Cron Jobs
sidebar_label: Cron Jobs
---

Este módulo define y gestiona tareas programadas mediante la librería **node-cron**.  
En este caso, se configura una tarea que ejecuta la función `notificarStockBajo` todos los días a las 8:00 AM, permitiendo automatizar el envío de notificaciones cuando el inventario de un producto es bajo.

---

## 🔍 Ubicación

`src/utils/cronJobs.ts`

---

## 💻 Código fuente

```ts
import cron from 'node-cron';
import { notificarStockBajo } from '../services/notificaciones/stockBajo.service';

// Ejecuta todos los días a las 8:00 AM
cron.schedule('0 8 * * *', async () => {
  await notificarStockBajo();
});
````

---

## 🔗 Uso

Este módulo se importa normalmente en el punto de entrada del backend (`src/index.ts` o `src/server.ts`) para que las tareas programadas se inicien junto con la aplicación.

### Ejemplo de uso:

```ts
import './utils/cronJobs';
```

Con solo importar el módulo, las tareas configuradas comenzarán a ejecutarse automáticamente según la programación definida.

---

## 🧩 Relación con otros archivos

* Utiliza el servicio `stockBajo.service.ts` ubicado en `src/services/notificaciones/` para enviar las notificaciones.
* Puede coexistir con otros cron jobs si se agregan en el mismo archivo o en módulos separados.

---

## ⚠️ Consideraciones

* El formato de programación (`'0 8 * * *'`) sigue la sintaxis estándar de **cron**:

  * `0` → minuto (0)
  * `8` → hora (8 AM)
  * `* * *` → todos los días, todos los meses, todos los días de la semana
* Si la aplicación se detiene o reinicia, las tareas programadas dejarán de ejecutarse hasta que se inicie nuevamente el backend.
* En entornos con **Hot Reload** o múltiples instancias (por ejemplo, en servidores distribuidos), la tarea podría ejecutarse más de una vez si no se controla la concurrencia.

---
