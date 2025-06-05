import { Request, Response, NextFunction } from "express";
import { verificarToken } from "../services/token.service";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export function autenticarToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  console.log("👉 Headers recibidos:", req.headers); // ← agrega esto
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // Formato: Bearer <token>

  if (!token) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  try {
    const usuario = verificarToken(token);
    // 👉 Aquí pones el log
    console.log("✅ Usuario autenticado:", usuario);
    req.user = usuario;
    next();
  } catch (error) {
    return res.status(403).json({ mensaje: "Token inválido o expirado" });
  }
}
