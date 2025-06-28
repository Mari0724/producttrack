import { Request, Response, NextFunction } from "express";
import { verificarToken } from "../services/token.service";

export interface AuthenticatedRequest extends Request {
  user?: {
    idUsuario: number; // ✅
    username?: string;
    rol: string;
    tipoUsuario?: string;
    rolEquipo?: string;
  };
}

export function autenticarToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // Formato: Bearer <token>

  if (!token) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  try {
    const payload: any = verificarToken(token); // 👈 asegúrate que esto tenga idUsuario y rol
    console.log("🔍 Payload JWT:", payload);

    req.user = {
      idUsuario: payload.idUsuario,
      rol: payload.rolEquipo || payload.rol, // 👈 aquí está la clave
      tipoUsuario: payload.tipoUsuario,
    };

    next();
  } catch (error) {
    return res.status(403).json({ mensaje: "Token inválido o expirado" });
  }
}