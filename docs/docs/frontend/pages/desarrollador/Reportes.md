---
id: reportes-desarrollador
title: Panel de Notificaciones para Desarrollador
sidebar_label: Reportes
---

El componente `ReportesDesarrollador` permite a los desarrolladores **enviar notificaciones globales** a todos los usuarios de la aplicación, principalmente para anunciar **actualizaciones, cambios importantes o eventos**. Proporciona una interfaz intuitiva con validaciones y retroalimentación visual clara mediante `toasts`.

---

## 🔍 Ubicación

`src/pages/desarrollador/Reportes.tsx`

---

## 📦 Dependencias

* **React Hooks:** `useState`
* **Lucide Icons:** `Send`, `Loader2`, `Bell`, `CheckCircle`, `AlertCircle`
* **Librerías de terceros:** `react-hot-toast`
* **Funciones utilitarias:**

  * `puedeNotificar` desde `utils/enviarNotificacion`
  * `enviarNotificacionActualizacion` desde `api/notificaciones`

---

## ⚙️ Propiedades

> Este componente **no recibe props externas**. Su funcionamiento es completamente interno y está diseñado para usuarios con permisos administrativos.

---

## 🧠 Lógica Interna

### 📥 Estado

| Estado     | Tipo                                    | Descripción                                              |
| ---------- | --------------------------------------- | -------------------------------------------------------- |
| `titulo`   | `string`                                | Título de la notificación.                               |
| `mensaje`  | `string`                                | Mensaje detallado de la notificación.                    |
| `enviando` | `boolean`                               | Indica si se está procesando el envío.                   |
| `errores`  | `{ titulo?: string, mensaje?: string }` | Contiene mensajes de error si hay validaciones fallidas. |

---

## ✅ Validaciones

* **Título**: requerido (no puede estar vacío).
* **Mensaje**:

  * Requerido
  * Mínimo 10 caracteres

Los errores se muestran visualmente bajo los campos con íconos e información clara.

---

## 🚀 Función Principal: `enviarNotificacion`

Esta función:

1. Valida que los campos sean correctos.
2. Verifica si las notificaciones están habilitadas (`puedeNotificar("actualizacion")`).
3. Llama a `enviarNotificacionActualizacion({ titulo, mensaje })`.
4. Muestra mensajes `toast` para éxito o error.
5. Limpia los campos después del envío exitoso.

---

## 🧱 Estructura del Componente

### 1. **Encabezado**

* Ícono `Bell` en círculo decorativo.
* Título destacado: "Enviar Actualización de la App".
* Subtítulo con instrucciones breves para el usuario.

### 2. **Formulario**

* Tarjeta visual con fondo degradado.
* **Campo Título**:

  * Input con estilos dinámicos según validación.
* **Campo Mensaje**:

  * Textarea con contador de caracteres y validaciones.
* **Botón de Envío**:

  * Muestra loader (`Loader2`) mientras se envía.
  * Usa colores en gradiente y animaciones al hacer hover.

### 3. **Sugerencias**

* Tarjeta con ícono `CheckCircle` que guía sobre buenas prácticas antes de enviar.

### 4. **Pie de Página**

* Nota que aclara que es solo para usuarios con permisos especiales.

---

## 🎨 Estilos y Diseño

* Diseño moderno y responsivo con **Tailwind CSS**.
* Colores personalizados: `rose`, `amber`, `slate`.
* Bordes redondeados, sombras suaves y gradientes.
* Transiciones y efectos de hover para mejor experiencia.

---

## 💬 Experiencia del Usuario

* Feedback inmediato mediante `toast.success` o `toast.error`.
* Validación clara antes de permitir el envío.
* Evita errores comunes como mensajes incompletos o vacíos.
* Información útil sobre cómo redactar una notificación efectiva.

---

## 📌 Consideraciones

* Solo debe estar accesible para usuarios con permisos administrativos.
* Se recomienda usarlo con prudencia para no saturar a los usuarios con notificaciones innecesarias.
* Asegura que el backend esté correctamente configurado para recibir y distribuir la notificación enviada.