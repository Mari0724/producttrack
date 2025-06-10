---
id: Productos.controller
title: Crontrolador de Productos
sidebar_label: Productos
---

# Productos.controller.ts

Controlador encargado de manejar las operaciones relacionadas con los productos. Aquí se implementan rutas RESTful para crear, consultar, actualizar y eliminar productos, así como estadísticas y filtros personalizados.

---

## 🔍 Ubicación

`src/controllers/Productos.controller.ts`

---

## ✅ Funcionalidades principales
### ✅ Funcionalidades principales

| Método   | Ruta                                      | Descripción                                                                 |
|----------|-------------------------------------------|-----------------------------------------------------------------------------|
| `GET`    | `/Productos`                              | Obtener todos los productos con filtros opcionales                          |
| `GET`    | `/Productos/categorias`                   | Obtener todas las categorías únicas de productos                            |
| `GET`    | `/Productos/por-categoria`                | Obtener productos por categoría específica                                  |
| `GET`    | `/Productos/cantidad-por-categoria`       | Obtener cantidad de productos por categoría                                 |
| `GET`    | `/Productos/cantidad-por-rango-precio`    | Obtener cantidad de productos por rangos de precio                          |
| `GET`    | `/Productos/{id}`                         | Obtener producto por ID                                                     |
| `POST`   | `/Productos`                              | Crear un nuevo producto (requiere autenticación y permisos)                 |
| `PUT`    | `/Productos/{id}`                         | Actualizar un producto existente (requiere autenticación y permisos)        |
| `DELETE` | `/Productos/{id}`                         | Eliminar un producto existente (requiere autenticación y permisos)          |

---

## 🧩 Permisos
Las acciones de crear, editar y eliminar productos están protegidas mediante middleware JWT y validación de roles usando la función puede().

---

## 🧪 Validaciones
Se utiliza zodValidate con el esquema productoSchema para validar los datos enviados en las operaciones de creación y actualización de productos.

---

## 🔎 Filtros disponibles en `GET /Productos`

Puedes aplicar los siguientes filtros como parámetros de consulta (`query`):

- `nombre` (`string`): Filtra productos por nombre.
- `categoria` (`string`): Filtra productos por categoría.
- `estado` (`string`): Filtra productos por su estado.
- `usuarioId` (`number`): Filtra productos asociados a un usuario específico.
- `fechaAdquisicionDesde` (`ISO string`): Fecha de adquisición **desde** la cual buscar.
- `fechaAdquisicionHasta` (`ISO string`): Fecha de adquisición **hasta** la cual buscar.
- `fechaVencimientoDesde` (`ISO string`): Fecha de vencimiento **desde** la cual buscar.
- `fechaVencimientoHasta` (`ISO string`): Fecha de vencimiento **hasta** la cual buscar.

---

## 🧮 Estadísticas disponibles

| Método | Ruta                                          | Descripción                                                         |
|--------|-----------------------------------------------|---------------------------------------------------------------------|
| `GET`  | `/Productos/categorias`                      | Lista de categorías únicas.                                        |
| `GET`  | `/Productos/por-categoria?categoria=X`       | Productos filtrados por una categoría específica.                  |
| `GET`  | `/Productos/cantidad-por-categoria`          | Conteo de productos agrupado por categoría.                         |
| `GET`  | `/Productos/cantidad-por-rango-precio`       | Conteo de productos agrupado por rangos de precios.                 |

---

## 🛠️ Módulos utilizados

- `ProductosDTO`, `productoSchema`: Modelos de datos y validaciones con Zod.
- `Productos.service`: Contiene la lógica de negocio para las operaciones CRUD y los filtros de productos.
- `ResponseMessage`, `ResponseMessageWithData`: Interfaces que definen la estructura de las respuestas del controlador.
- `checkPermissions.ts`: Función para validar permisos de acciones según el rol del usuario.
- `token.middleware.ts`: Middleware para autenticación de usuarios mediante JWT.

---

### 📘 Ejemplos de uso de la API de Productos

#### 🔹 GET `/Productos`
**🧪 Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Laptop Dell",
    "categoria": "Tecnología",
    "estado": "Nuevo",
    "fechaAdquisicion": "2024-01-20T00:00:00.000Z",
    "fechaVencimiento": null,
    "usuarioId": 3
  },
  {
    "id": 2,
    "nombre": "Camisa Polo",
    "categoria": "Ropa",
    "estado": "Usado",
    "fechaAdquisicion": "2023-11-10T00:00:00.000Z",
    "fechaVencimiento": null,
    "usuarioId": 4
  }
]
```

---

#### 🔹 GET `/Productos/categorias`
**🧪 Ejemplo de respuesta:**

```json
[
  "Tecnología",
  "Ropa",
  "Hogar",
  "Sin categoría"
]
```

---

#### 🔹 GET `/Productos/por-categoria?categoria=Tecnología`
**🧪 Ejemplo de respuesta:**

```json
[
  {
    "id": 1,
    "nombre": "Laptop Dell",
    "categoria": "Tecnología",
    "estado": "Nuevo",
    "fechaAdquisicion": "2024-01-20T00:00:00.000Z"
  }
]
```

---

#### 🔹 GET `/Productos/cantidad-por-categoria`
**🧪 Ejemplo de respuesta:**

```json
[
  { "categoria": "Tecnología", "cantidad": 12 },
  { "categoria": "Ropa", "cantidad": 7 },
  { "categoria": "Sin categoría", "cantidad": 3 }
]
```

---

#### 🔹 GET `/Productos/cantidad-por-rango-precio`
**🧪 Ejemplo de respuesta:**

```json
[
  { "rango": "$0 - $100", "cantidad": 5 },
  { "rango": "$100 - $500", "cantidad": 9 },
  { "rango": "$500+", "cantidad": 4 }
]
```

---

#### 🔹 POST `/Productos`
**🧪 Ejemplo de request:**

```json
{
  "nombre": "Monitor Samsung",
  "categoria": "Tecnología",
  "estado": "Nuevo",
  "fechaAdquisicion": "2025-03-15",
  "fechaVencimiento": null,
  "usuarioId": 3
}
```

---

**🧪 Ejemplo de respuesta:**

```json
{
  "message": "Producto creado correctamente",
  "data": {
    "id": 5,
    "nombre": "Monitor Samsung",
    "categoria": "Tecnología",
    "estado": "Nuevo",
    "fechaAdquisicion": "2025-03-15T00:00:00.000Z",
    "fechaVencimiento": null,
    "usuarioId": 3
}
```