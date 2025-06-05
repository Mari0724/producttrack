import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./token.middleware";

export function permitirRolesYRolEquipo(
  rolesPermitidos: string[],
  rolesEquipoPermitidos?: string[],
  requiereTipoEmpresarial = false // nuevo parámetro
) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return res.status(403).json({ mensaje: "Acceso no autorizado" });
    }

    if (!rolesPermitidos.includes(user.rol)) {
      return res.status(403).json({ mensaje: "Rol no permitido" });
    }

    if (requiereTipoEmpresarial && user.tipoUsuario !== "EMPRESARIAL") {
      return res.status(403).json({ mensaje: "Acceso denegado. Solo las empresas pueden crear usuarios de equipo." });
    }

    if (user.rol === "EQUIPO" && rolesEquipoPermitidos) {
      if (!rolesEquipoPermitidos.includes(user.rolEquipo)) {
        return res.status(403).json({ mensaje: "Rol de equipo no permitido" });
      }
    }

    next();
  };
}
