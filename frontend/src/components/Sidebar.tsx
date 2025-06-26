import { useEffect, useState } from "react";
import {
  FaHome,
  FaUser,
  FaChartBar,
  FaBox,
  FaHistory,
  FaQrcode,
  FaCog,
  FaClipboardList,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

interface SidebarProps {
  userType: 'INDIVIDUAL' | 'EMPRESARIAL' | 'EQUIPO';
  companyName?: string;
}

const Sidebar = ({ userType, companyName }: SidebarProps) => {
  const location = useLocation();
  const [tipoUsuario, setTipoUsuario] = useState<string | null>(null);
  const [rol, setRol] = useState<string | null>(null);

  useEffect(() => {
    const tipo = localStorage.getItem("tipoUsuario");
    const storedRol = localStorage.getItem("rol");
    setTipoUsuario(tipo);
    setRol(storedRol);
  }, []);

  return (
    <div
      className={clsx(
        "group hover:w-60 w-20 bg-[#404D2C] text-white h-screen p-4 transition-all duration-300 ease-in-out relative"
      )}
    >

      {/* Mostrar props que vienen del Layout */}
      <div className="text-sm mb-2 hidden group-hover:block">
        <strong>{companyName || userType}</strong>
      </div>

      <div className="flex flex-col gap-6 w-full mt-4"></div>
      <div className="flex flex-col gap-6 w-full mt-12">
        <div className="overflow-hidden transition-all duration-300">
          <h2 className="text-2xl font-bold mb-6 whitespace-nowrap hidden group-hover:block">
            Mi Inventario
          </h2>
        </div>

        <ul className="flex flex-col gap-6">
          <li>
            <Link
              to="/"
              className={clsx(
                "flex items-center gap-2 hover:text-[#FCDDEC] transition w-full",
                "justify-center group-hover:justify-start pl-0 group-hover:pl-2",
                location.pathname === "/" && "font-semibold"
              )}
            >
              <FaHome className="text-2xl" />
              <span className="hidden group-hover:inline transition-all duration-300">
                Home
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/contactos"
              className={clsx(
                "flex items-center gap-2 hover:text-[#FCDDEC] transition w-full",
                "justify-center group-hover:justify-start pl-0 group-hover:pl-2",
                location.pathname === "/contactos" && "font-semibold"
              )}
            >
              <FaUser className="text-2xl" />
              <span className="hidden group-hover:inline transition-all duration-300">
                Contactos
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/reportes"
              className={clsx(
                "flex items-center gap-2 hover:text-[#FCDDEC] transition w-full",
                "justify-center group-hover:justify-start pl-0 group-hover:pl-2",
                location.pathname === "/reportes" && "font-semibold"
              )}
            >
              <FaChartBar className="text-2xl" />
              <span className="hidden group-hover:inline transition-all duration-300">
                Reportes
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/inventario"
              className={clsx(
                "flex items-center gap-2 hover:text-[#FCDDEC] transition w-full",
                "justify-center group-hover:justify-start pl-0 group-hover:pl-2",
                location.pathname === "/inventario" && "font-semibold"
              )}
            >
              <FaBox className="text-2xl" />
              <span className="hidden group-hover:inline transition-all duration-300">
                Inventario
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/historial"
              className={clsx(
                "flex items-center gap-2 hover:text-[#FCDDEC] transition w-full",
                "justify-center group-hover:justify-start pl-0 group-hover:pl-2",
                location.pathname === "/historial" && "font-semibold"
              )}
            >
              <FaHistory className="text-2xl" />
              <span className="hidden group-hover:inline transition-all duration-300">
                Historial
              </span>
            </Link>
          </li>

          {tipoUsuario === "INDIVIDUAL" && (
            <li>
              <Link
                to="/nutriscan"
                className={clsx(
                  "flex items-center gap-2 hover:text-[#FCDDEC] transition w-full",
                  "justify-center group-hover:justify-start pl-0 group-hover:pl-2",
                  location.pathname === "/nutriscan" && "font-semibold"
                )}
              >
                <FaQrcode className="text-2xl" />
                <span className="hidden group-hover:inline transition-all duration-300">
                  NutriScan
                </span>
              </Link>
            </li>
          )}

          {(rol === "ADMIN" || rol === "DESARROLLADOR") && (
            <li>
              <Link
                to="/auditoria"
                className={clsx(
                  "flex items-center gap-2 hover:text-[#FCDDEC] transition w-full",
                  "justify-center group-hover:justify-start pl-0 group-hover:pl-2",
                  location.pathname === "/auditoria" && "font-semibold"
                )}
              >
                <FaClipboardList className="text-2xl" />
                <span className="hidden group-hover:inline transition-all duration-300">
                  Auditoría
                </span>
              </Link>
            </li>
          )}

          <li>
            <Link
              to="/configuracion"
              className={clsx(
                "flex items-center gap-2 hover:text-[#FCDDEC] transition w-full",
                "justify-center group-hover:justify-start pl-0 group-hover:pl-2",
                location.pathname === "/configuracion" && "font-semibold"
              )}
            >
              <FaCog className="text-2xl" />
              <span className="hidden group-hover:inline transition-all duration-300">
                Configuración
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
