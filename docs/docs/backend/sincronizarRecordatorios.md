---
id: sincronizarRecordatorios
title: Sincronización de recordatorios de stock
sidebar_label: Sincronizar Recordatorios
---

Este script actualiza la **cantidad mínima deseada** en los recordatorios de stock (`recorStock`) para todos los productos activos, basándose en el tipo de usuario al que pertenecen.

---

## 🔍 Ubicación

`src/sincronizarRecordatorios.ts`

---

## 📌 Descripción general

1. **Constantes de umbrales**  
   - `UMBRAL_INDIVIDUAL` → 2 unidades (usuarios individuales).  
   - `UMBRAL_EMPRESARIAL` → 30 unidades (usuarios empresariales).  

2. **Consulta inicial**  
   Se obtienen todos los productos **no eliminados** (`eliminadoEn: null`) junto con el tipo de usuario propietario.

3. **Cálculo del umbral deseado**  
   - Si el usuario es de tipo `"individual"`, se asigna el umbral de 2 unidades.  
   - En cualquier otro caso, se asigna el umbral empresarial (30 unidades).

4. **Verificación y actualización**  
   - Se busca un registro existente en `recorStock` para el producto.
   - Si existe y su cantidad mínima es distinta del umbral calculado, se actualiza usando el `idRecordatorio` como clave única.

5. **Cierre de conexión**  
   Al finalizar (con éxito o con error), se desconecta Prisma de la base de datos.

---

## 🔗 Uso

Este archivo se ejecuta como **script independiente**.  
Se puede correr con:

```bash
ts-node src/sincronizarRecordatorios.ts
````

Su propósito principal es **alinear los valores de recordatorios de stock** con las políticas definidas para cada tipo de usuario.

---

## 🧩 Relación con otros módulos

* **Base de datos:**

  * Tabla `productos` (relación con usuario).
  * Tabla `recorStock` (recordatorios de stock).

* **Cliente Prisma:** `utils/prismaClient.ts`.

---

## ⚠️ Consideraciones

* El script **modifica datos directamente en la base de datos**; debe ejecutarse con precaución.
* El cálculo de umbral está **fijado en constantes**; si las políticas cambian, se debe actualizar el archivo.
* Asume que `idRecordatorio` es la clave única correcta para actualizar en `recorStock`.
* No crea recordatorios si no existen, solo actualiza los existentes.
* Debe ejecutarse en un entorno donde `prisma` esté correctamente configurado y con acceso a la base de datos.

---