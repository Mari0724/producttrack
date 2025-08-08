---
id: nutriscan-auditoria
title: NutriScan Auditoría
sidebar_label: NutriScan Auditoría
---

La página `NutriScanAuditoria` ofrece una interfaz para que usuarios con roles administrativos (`ADMIN`, `DESARROLLADOR`) gestionen y auditen los registros de análisis nutricionales realizados en la aplicación.  
Permite listar, filtrar, buscar, editar y eliminar registros de análisis con detalles asociados.

---
## 🔍 Ubicación

`src/pages/nutriscan/NutriScanAuditoria.tsx`

---

## Importaciones principales
- `axios` para comunicación HTTP con backend.
- `useUser` para obtener información del usuario actual (contexto).
- `url` constante base para la API.
- React hooks `useState`, `useEffect`.

---

## Interfaces de datos

### `Respuesta`
- `mensaje: string` — texto con la respuesta del análisis.
- `generadoPor: string` — indica si la respuesta fue generada por GPT u otro mecanismo.

### `Registro`
- `id: number` — identificador único del registro.
- `consulta: string` — texto consultado para el análisis.
- `respuesta: Respuesta | null` — resultado del análisis.
- `fechaAnalisis: string` — fecha y hora del análisis.
- `esAlimento: boolean` — indica si el registro corresponde a un alimento.
- `tipoAnalisis: "ocr-gpt-only" | "ocr-openfoodfacts-gpt"` — tipo de análisis aplicado.
- `isTest?: boolean` — indica si es un registro de prueba.
- `usuario` — objeto con:
  - `nombreCompleto: string`
  - `tipoUsuario: "INDIVIDUAL"`

---

## Estado interno (React State)
- `registros`: lista de registros obtenidos.
- `registroEditando`: registro seleccionado para editar.
- `modalAbierto`: controla visibilidad del modal de edición.
- `confirmEliminarId`: id del registro pendiente de confirmación para eliminar.
- `usuarioId`: input para búsqueda por ID de usuario.
- `filtroNombre`: filtro de búsqueda por nombre.
- `filtroFecha`: filtro de búsqueda por fecha.
- `error`: mensajes de error en la interfaz.

---

## Funcionalidades principales

### `cargarTodos()`
- Obtiene todos los registros de análisis desde la API (`GET /nutriscan`).
- Actualiza el estado `registros`.

### `buscarPorUsuarioId()`
- Busca registros asociados a un ID de usuario (`GET /nutriscan/usuario/{usuarioId}`).
- Valida que el usuario sea tipo `"INDIVIDUAL"`.
- Actualiza el estado `registros` o muestra error si no tiene acceso.

### `limpiarFiltros()`
- Limpia todos los filtros y recarga todos los registros.

### `manejarEditar(registro: Registro)`
- Prepara el registro para edición.
- Abre el modal de edición con datos precargados.

### `guardarCambios()`
- Envía los cambios editados a la API (`PUT /nutriscan/{id}`).
- Cierra el modal y recarga la lista.

### `confirmarEliminar(id: number)`
- Abre diálogo para confirmar eliminación de un registro.

### `eliminarRegistro()`
- Elimina registro confirmado (`DELETE /nutriscan/{id}`).
- Recarga lista y cierra diálogo.

---

## Renderizado

- Muestra filtros y botones para buscar, limpiar y filtrar registros.
- Si el usuario no tiene rol adecuado, muestra mensaje de restricción.
- Tabla con columnas: ID, Consulta, Respuesta GPT, Usuario, Fecha y Acciones (Editar, Eliminar).
- Modal para edición con campos: consulta, respuesta, tipo análisis, es alimento, es test.
- Modal para confirmación de eliminación.

---

## Validaciones y permisos
- Solo usuarios con roles `ADMIN` o `DESARROLLADOR` pueden acceder.
- La búsqueda por ID valida que el usuario sea tipo `INDIVIDUAL`.
- Manejo de errores en búsqueda muestra mensajes claros.

---

## Ejemplo de uso en aplicación

```tsx
import NutriScanAuditoria from '../pages/nutriscan/NutriScanAuditoria';

function AdminPanel() {
  return (
    <NutriScanAuditoria />
  );
}
```
---