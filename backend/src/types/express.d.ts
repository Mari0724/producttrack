import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: {
    idUsuario: number;
    rol: string;
    [key: string]: any; // 👈 esto permite propiedades adicionales si las necesitas
  };
}
