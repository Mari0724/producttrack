import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    rol: string;
    // puedes agregar más campos si los necesitas
  };
}
