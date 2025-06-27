export interface UserDTO {
    username: string;
    correo: string;
    password: string;
    nombreCompleto: string;
    telefono: string;
    direccion: string;
    fotoPerfil?: string;
    tipoUsuario?: "INDIVIDUAL" | "EMPRESARIAL";
    nombreEmpresa?: string;
    nit?: string;
    rol: "USUARIO" | "EQUIPO" | "ADMIN" | "DESARROLLADOR";
    rolEquipo?: "LECTOR" | "COMENTARISTA" | "EDITOR";
    estado?: "activo" | "inactivo";
    empresaId?: number;
    perfilCompleto?: boolean; // 👈 nuevo campo agregado como opcional
}

// nueva interfaz para cambiar contraseña
export interface ChangePasswordDTO {
  id: number;
  currentPassword: string;
  newPassword: string;
}