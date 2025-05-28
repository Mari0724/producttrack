export interface EquipoDTO {
    username: string;
    correo: string;
    password: string;
    nombreCompleto: string;
    telefono: string;
    direccion: string;
    fotoPerfil?: string; // Opcional: la empresa puede no subirla de una vez
    rolEquipo: "LECTOR" | "COMENTARISTA" | "EDITOR";
    estado?: "activo" | "inactivo"; 
}
