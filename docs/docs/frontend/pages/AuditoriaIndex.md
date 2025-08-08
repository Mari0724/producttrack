---
id: auditoria-index
title: AuditoriaIndex
sidebar_label: AuditoriaIndex
---

Este archivo define la página principal del **Panel de Auditoría**.  
Proporciona accesos rápidos a diferentes auditorías del sistema, tales como usuarios, equipo y análisis NutriScan.

---
## 🔍 Ubicación

`src/pages/AuditoriaIndex.tsx`

---

## Componentes y Librerías Usadas

- **`useNavigate`** *(react-router-dom)* → Para la navegación programática entre rutas.  
- **`SearchCheck`** *(lucide-react)* → Ícono decorativo en el encabezado del panel.  

---

## Datos Locales

### `auditorias`
Arreglo de objetos que define las secciones disponibles en el panel de auditoría.

| Campo        | Tipo     | Descripción |
|--------------|----------|-------------|
| `titulo`     | string   | Nombre de la auditoría. |
| `descripcion`| string   | Breve explicación de lo que cubre la auditoría. |
| `ruta`       | string   | Ruta a la que navega el usuario al hacer clic. |

---

## Renderizado

El componente presenta:
1. **Encabezado** con ícono y título.  
2. **Grid de tarjetas** (1, 2 o 3 columnas según el tamaño de pantalla).  
3. Cada tarjeta es **clickeable** y redirige a la auditoría correspondiente.  

---

## Ejemplo visual (estructura de datos)

```ts
const auditorias = [
  {
    titulo: "Usuarios",
    descripcion: "Auditoría de todos los usuarios registrados en el sistema",
    ruta: "/auditoria/usuarios",
  },
  {
    titulo: "Equipo",
    descripcion: "Auditoría sobre la gestión de miembros del equipo",
    ruta: "/auditoria/equipo",
  },
  {
    titulo: "NutriScan",
    descripcion: "Análisis nutricionales generados por los usuarios",
    ruta: "/auditoria/nutriscan",
  },
];
```
---

### Notas

* Las tarjetas cuentan con efecto hover y sombra para mejorar la experiencia visual.

* El layout es responsive gracias a las clases utilitarias de Tailwind CSS.

* Las rutas definidas deben existir en la configuración de react-router-dom.
