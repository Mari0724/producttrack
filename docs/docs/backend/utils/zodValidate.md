---
id: zodValidate
title: Validacion zod
sidebar_label: Zod Validate
---


### 📄 `zodValidate.ts`

Esta utilidad proporciona una función genérica para validar datos con [Zod](https://zod.dev/), simplificando el manejo de errores en controladores y servicios.

---

## 🔧 Función: `zodValidate`

```ts
export const zodValidate = <T>(
  schema: ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string }
```

### ✅ Propósito:

Valida cualquier objeto de entrada contra un esquema de Zod y devuelve un resultado estandarizado que indica si la validación fue exitosa o no.

---

### 📥 Parámetros:

| Nombre   | Tipo           | Descripción                                                |
| -------- | -------------- | ---------------------------------------------------------- |
| `schema` | `ZodSchema<T>` | Esquema de Zod que define la forma y reglas de validación. |
| `data`   | `unknown`      | Objeto de datos que se desea validar.                      |

---

### 📤 Retorno:

* Si la validación es **exitosa**:

```ts
{ success: true, data: T }
```

* Si la validación **falla**:

```ts
{ success: false, error: string } // mensaje con errores concatenados
```

El campo `error` contiene un resumen legible de todos los errores de validación en una sola cadena, útil para mostrar en respuestas HTTP.

---

### 🧠 Ejemplo de uso:

```ts
const result = zodValidate(userSchema, req.body);

if (!result.success) {
  res.status(400).json({ message: "Datos inválidos", detalles: result.error });
} else {
  const usuarioValido = result.data;
  // continuar con lógica de negocio
}
```

---

## 🧰 Utiliza:

* `Zod.safeParse`: método seguro que evita excepciones y devuelve un objeto de éxito o error.
* Mapeo de errores personalizados usando `result.error.errors`.
