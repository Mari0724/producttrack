---
id: complete-profile
title: Complete Profile
sidebar_label: Complete Profile
---

`CompleteProfile` es una página que permite a los usuarios completar su perfil personal para poder usar todas las funcionalidades de ProductTrack.  
El usuario puede actualizar su foto de perfil, nombre de usuario, teléfono, dirección y establecer una nueva contraseña.

---
## 🔍 Ubicación

`src/pages/perfil/CompletaProfile.tsx`

---

## Importaciones Principales
- React hooks (`useState`, `useEffect`)
- Navegación con `useNavigate` de React Router
- Iconos de `lucide-react` para UI
- Servicios para obtener y actualizar datos (`getUserById`, `getEmpresaById`, `updateUsuario`, `subirFotoPerfil`)
- Contexto de usuario (`useUser`)
- Hook para mostrar notificaciones (`useToast`)
- Tipos TypeScript (`UserDTO`, `AxiosError`)

---

## Estado Interno (`useState`)
- `isSubmitting`: controla el estado de envío del formulario.
- `showNewPassword` y `showConfirmPassword`: toggles para mostrar/ocultar contraseñas.
- `usernameError`: mensaje de error específico para el nombre de usuario.
- `formData`: objeto con los campos del formulario (teléfono, dirección, nueva contraseña, confirmación, username y foto).
- `empresaNombre`: nombre de la empresa asociada al usuario (por defecto "Sin empresa").
- `correoUsuario`: correo electrónico del usuario.

---

## Ciclo de Vida (`useEffect`)
- Al montar, carga los datos del usuario actual y, si existe empresaId, carga también el nombre de la empresa.
- Maneja errores mostrando en consola.

---

## Funciones Principales

### `handleInputChange(field, value)`
- Actualiza el estado `formData` con el campo modificado.
- Limpia error de usuario si se está modificando el campo `username`.

### `handleSubmit(e)`
- Valida que la nueva contraseña esté presente y coincida con la confirmación.
- Construye objeto `dataToSend` con los campos modificados.
- Si se agregó foto, la sube antes y asigna la URL resultante.
- Llama a `updateUsuario` para actualizar datos en backend.
- Muestra mensajes de éxito o error, incluyendo manejo específico para errores de usuario duplicado.
- Navega a la página principal luego de actualizar.

---

## Renderizado
- **Cabecera** con ícono, título y texto motivacional para completar perfil.
- Sección con información ya registrada: correo, empresa y rol en equipo.
- Formulario para editar:
  - Foto de perfil (input file)
  - Nombre de usuario (input texto)
  - Teléfono (input tel)
  - Dirección (input texto)
  - Nueva contraseña y confirmación (input password con toggle de visibilidad)
- Botón para enviar el formulario (deshabilitado mientras se envía).
- Nota informativa sobre obligatoriedad de campos y beneficios de completar perfil.

---

## Notas de Usabilidad
- Campos obligatorios marcados con asterisco.
- El botón cambia su texto a "Guardando..." durante el proceso.
- Errores específicos para nombre de usuario ayudan a mejorar UX.
- La foto de perfil se sube antes de actualizar el resto de datos.

---

## Consideraciones Técnicas
- El componente depende del contexto `useUser` para obtener el usuario autenticado.
- La navegación es controlada con `useNavigate` para redireccionar tras completar el perfil.
- Utiliza manejo de errores Axios para mostrar mensajes precisos.
- Controla la visibilidad de las contraseñas para mejorar la experiencia.

---

## Código de ejemplo de uso

```tsx
import CompleteProfile from '../pages/profile/CompleteProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/completar-perfil" element={<CompleteProfile />} />
        {/* otras rutas */}
      </Routes>
    </BrowserRouter>
  );
}
````
---