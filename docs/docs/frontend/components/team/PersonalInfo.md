---
id: personal-info
title: Información Personal del Usuario
sidebar_label: PersonalInfo

---

El componente `PersonalInfo` representa una sección de formulario dentro del perfil del usuario donde se puede visualizar y editar información personal básica. Este formulario se adapta a diferentes tipos de usuarios: individuales, empresas y miembros de equipos, mostrando campos relevantes según el contexto.

---

## 🔍 Ubicación

`src/components/team/PersonalInfo.tsx`

---

## 📦 Dependencias

* **Lucide React:** Íconos como `User`, `Mail`, `Phone`, `MapPin`, y `FileText`.
* **React:** Para la estructura funcional del componente y hooks (`useState`, `Dispatch`).
* **UserProfile Type:** Interfaz importada desde `src/types/UserProfile`.

---

## 🧱 Estructura del Componente

1. **Foto de Perfil**

   * Muestra una imagen de perfil cargada o la URL almacenada en el perfil del usuario.
   * Si no hay ninguna, se muestra un ícono de usuario por defecto.
   * Si `isEditing` es `true`, permite subir una nueva foto (`<input type="file" />`).

2. **Campos Básicos del Usuario**
   Campos editables de información personal, renderizados dinámicamente:

   * `username` (nombre de usuario)
   * `name` (nombre completo)
   * `email` (correo electrónico)
   * `phone` (número de teléfono)
   * `address` (dirección)

   Todos estos inputs incluyen íconos representativos con diseño consistente.

3. **Información Empresarial u Organizacional**
   Si el usuario **no** es individual y **sí** pertenece a una empresa o equipo (`isEmpresa` o `isEquipo`):

   * `companyName` (nombre de la empresa)
   * `nit` (número de identificación tributaria)
   * `role` (rol dentro del equipo, solo visible si es `isEquipo`)

   Algunos campos son deshabilitados y no modificables para usuarios de tipo equipo.

---

## 🧠 Comportamiento

* **Edición Condicional:** Todos los campos se pueden editar solo si `isEditing` es `true`.
* **Lógica de Foto:** Se prioriza la vista previa del archivo subido sobre la foto guardada.
* **Renderizado por Rol:**

  * Usuarios individuales ven solo su información básica.
  * Empresas pueden editar su información organizacional.
  * Equipos pueden ver la información organizacional, pero no editarla.

---

## 🎨 Estilos y Diseño

* Utiliza **Tailwind CSS**:

  * Paleta de colores: `#667233` (verde oliva), `gray`, `white`.
  * Sombra (`shadow`), bordes (`rounded`, `border`), y espaciado (`mb-6`, `py-2`).
* Íconos dentro de inputs posicionados con `absolute`.
* Diseño **responsive** con `grid-cols-1` en móviles y `grid-cols-2` en pantallas medianas o mayores.

---

## 💡 Ejemplo de Uso

```tsx
import PersonalInfo from "@/components/team/PersonalInfo";
import { useState } from "react";
import type { UserProfile } from "@/types/UserProfile";

function PerfilUsuario() {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    fotoPerfil: "",
    companyName: "",
    nit: "",
    role: "",
  });

  const [photo, setPhoto] = useState<File | null>(null);

  return (
    <PersonalInfo
      userProfile={userProfile}
      setUserProfile={setUserProfile}
      isEditing={true}
      isIndividual={true}
      isEmpresa={false}
      isEquipo={false}
      photo={photo}
      setPhoto={setPhoto}
    />
  );
}
```

---

## 📌 Notas Adicionales

* El componente es **modular** y adaptativo a distintos tipos de usuario.
* El campo de `fotoPerfil` y la subida de imágenes son gestionados localmente, pero puedes adaptar su envío a una API.
* Aporta un diseño limpio y accesible para interfaces administrativas o formularios de perfil.