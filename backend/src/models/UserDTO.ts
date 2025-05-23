export interface UserDTO {
    username: string;
    correo: string;
    password: string;
    nombreCompleto: string;
    telefono: string;
    direccion: string;
    fotoPerfil: string;
    tipoUsuario: "INDIVIDUAL" | "EMPRESARIAL";
    nombreEmpresa?: string; // opcional según tipoUsuario
    nit?: string;           // opcional según tipoUsuario
    rol: "USUARIO" | "EQUIPO" | "ADMIN" | "DESARROLLADOR";
    rolEquipo?: "LECTOR" | "COMENTARISTA" | "EDITOR"; // se elimino admin
    estado?: "activo" | "inactivo";
    empresaId?: number; // NUEVO
}

