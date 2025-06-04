---
id: Servidor
title: Servidor
sidebar_label: Servidor
---

# 📄  index.ts

Este archivo es el *punto de entrada principal* del backend. Se encarga de iniciar el servidor Express previamente configurado en app.ts y ponerlo a escuchar en un puerto determinado.


---

## 🔍 Ubicación

src/index.ts

---

## 📦 Importaciones

```ts
import app from './app';
```

* Se importa la aplicación Express configurada en app.ts, donde ya están definidos los middlewares, rutas y Swagger.

---

## 🚀 Inicialización del servidor

```ts
const PORT = 3000;
```

* Define el puerto en el cual el servidor va a escuchar.
* Puedes reemplazar 3000 por process.env.PORT || 3000 si deseas hacerlo dinámico con variables de entorno.

---

## ▶ Inicio del servidor

```ts
app.listen(PORT, () => {
    console.log(`El server corre bien en http://localhost:${PORT}`);
});
```

* Inicia el servidor Express en el puerto especificado.
* Muestra un mensaje en consola para confirmar que el servidor está activo.

---

## 🧪 Acceso

Una vez el servidor esté corriendo, puedes acceder a:

* Tu API en: http://localhost:3000
* Documentación Swagger en: http://localhost:3000/docs

---

## 📝 Recomendación

Para producción o configuraciones más robustas, es buena práctica:

```ts
const PORT = process.env.PORT || 3000;
```

Y tener configurado un archivo .env así:


PORT=3000
