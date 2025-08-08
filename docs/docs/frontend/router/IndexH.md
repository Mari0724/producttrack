---
id: IndexHome
title: Index o Home del sistema
sidebar_label: Index o Home
---

El componente **`Index`** es la página principal de bienvenida de ProductTrack.
Muestra información relevante del usuario y la empresa, junto con resúmenes del equipo e inventario.
Se adapta dinámicamente al **tipo de usuario** y su **rol** para mostrar únicamente la información y funcionalidades correspondientes.

---

## 🔍 Ubicación
`src/routes/Index.tsx`

---

## 📂 Importaciones

* **React Hooks**:

  * `useEffect`, `useState` → Manejo de estado y efectos.
* **Íconos** (Lucide React):

  * `ArrowRight`, `Users`, `User`, `Building2`
* **React Router**:

  * `Link` → Navegación interna.
* **Contexto**:

  * `useUser` → Acceso a la información del usuario logueado.
* **Axios**:

  * `axiosInstance` → Instancia configurada para llamadas API.
* **Tipos**:

  * `TeamMember` → Tipado de miembros de equipo.

---

## 🏗 Interfaces

```ts
interface EmpresaInfo {
    nombreEmpresa: string;
    nit: string;
    telefono: string;
}
```

* Define la estructura de la información de una empresa.

---

## 🔄 Lógica Principal

### 1️⃣ Estado Local (`useState`)

* **empresaData** → Información de la empresa.
* **totalEquipo, totalEditores, totalComentaristas, totalLectores** → Cantidades filtradas por rol.
* **totalProductos, productosStockBajo, totalCategorias** → Resumen de inventario.

---

### 2️⃣ Obtención de Información de Empresa

**Hook:** `useEffect` (dependencia: `usuario`)
**Funcionalidad:**

* Obtiene datos de empresa dependiendo de si el usuario es:

  * **Miembro de equipo (rol EQUIPO)**
  * **Administrador empresarial (tipoUsuario EMPRESARIAL)**
* Guarda la información en `empresaData`.

---

### 3️⃣ Resumen de Equipo

**Hook:** `useEffect` (dependencia: `usuario`)
**Funcionalidad:**

* Llama a `/equipo/filtrar` con diferentes filtros de rol (`EDITOR`, `COMENTARISTA`, `LECTOR`).
* Filtra por estado `"activo"`.
* Actualiza contadores de miembros según rol.

---

### 4️⃣ Resumen de Inventario

**Hook:** `useEffect` (dependencia: `usuario`)
**Funcionalidad:**

* Llama a `/productos` para obtener lista de productos.
* Filtra según:

  * Usuario individual.
  * Usuario empresarial.
  * Miembro de equipo.
* Calcula:

  * Total de productos.
  * Productos con stock ≤ 5.
  * Categorías únicas.

---

## 🎨 Renderizado

### 📍 Secciones Principales

1. **Hero (Bienvenida)**

   * Título y descripción de la plataforma.

2. **Tarjetas de Funciones**

   * **Gestión de Equipo** → Solo visible para EMPRESARIAL sin rol de equipo.
   * **Mi Perfil** → Visible para todos.
   * **Información de Empresa** → Visible para EMPRESARIAL o EQUIPO.

3. **Resumen del Sistema**

   * Solo para EMPRESARIAL sin rol de equipo.
   * Muestra contadores de miembros según rol.

4. **Resumen de Inventario**

   * Visible para todos los usuarios.
   * Muestra:

     * Productos registrados.
     * Productos con stock bajo.
     * Total de categorías.

---

## ⚠️ Manejo de Errores

* Uso de `console.error` para registrar errores de:

  * Obtención de datos de empresa.
  * Resumen de equipo.
  * Resumen de inventario.
* Validaciones de datos devueltos por la API antes de procesarlos.

---

## 📎 Dependencias del Componente

* **React** (Hooks)
* **Lucide React** (Íconos)
* **React Router DOM**
* **Axios** (Instancia personalizada)
* **Contexto de usuario**
* **Tailwind CSS** para estilos

---