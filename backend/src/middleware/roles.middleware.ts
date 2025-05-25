import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./token.middleware";

export function permitirRolesYRolEquipo(rolesPermitidos: string[], rolesEquipoPermitidos?: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return res.status(403).json({ mensaje: "Acceso no autorizado" });
    }

    if (!rolesPermitidos.includes(user.rol)) {
      return res.status(403).json({ mensaje: "Rol no permitido" });
    }

    if (user.rol === "EQUIPO" && rolesEquipoPermitidos) {
      if (!rolesEquipoPermitidos.includes(user.rolEquipo)) {
        return res.status(403).json({ mensaje: "Rol de equipo no permitido" });
      }
    }

    next();
  };
}
