---
id: prismaClient
title: Prisma Client
sidebar_label: Prisma Cient
---

# Prisma Client

Este módulo encapsula la creación y exportación de una instancia de `PrismaClient`, permitiendo interactuar con la base de datos mediante Prisma ORM. Al centralizar su uso en la aplicación, se previene la creación de múltiples conexiones innecesarias y nos permite exportar el contenido para ser usada a lo largo de la aplicacion.

---

## 🔍 Ubicación

`src/utils/prismaClient.ts`

---

## 💻 Código fuente

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
````

## 🔗 Uso

Este módulo puede ser importado en cualquier archivo del backend que necesite acceder a la base de datos.

### Ejemplo de uso:

```ts
import prisma from '../utils/prismaClient';

const allUsers = await prisma.user.findMany();
```

## 🧩 Relación con otros archivos

* Se utiliza comúnmente en los servicios (`services/`) para consultar o modificar la base de datos.
* Es parte fundamental del acceso a datos de toda la aplicación.

## ⚠️ Consideraciones

* Prisma Client inicia una conexión con la base de datos al ser instanciado.
* En entornos de producción, es recomendable manejar adecuadamente el cierre de conexiones en procesos largos o al finalizar la app.
