export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  rol: string;
  tipoUsuario?: string;
  rolEquipo?: string;
}
