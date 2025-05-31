export interface LoginRequest {
  correo: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  rol: string;
  tipoUsuario?: string | null;
  rolEquipo?: string;
  requiereCompletarPerfil: boolean;
}
