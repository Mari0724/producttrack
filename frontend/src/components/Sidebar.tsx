import {
  FaHome,
  FaChartBar,
  FaBox,
  FaHistory,
  FaCog,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const Sidebar = () => {
  const location = useLocation();
  const tipoUsuario = localStorage.getItem("tipoUsuario")?.toLowerCase(); // 'individual' o 'empresarial'

  // Base para las rutas dinámicas
  const basePath = tipoUsuario === "empresarial" ? "/app/empresarial" : "/app/individual";

  return (
    <div
      className={clsx(
        "group hover:w-60 w-20 bg-[#404D2C] text-white h-screen p-4 transition-all duration-300 ease-in-out relative"
      )}
    >
      <div className="flex flex-col gap-6 w-full mt-12">
        <div className="overflow-hidden transition-all duration-300">
          <h2 className="text-2xl font-bold mb-6 whitespace-nowrap hidden group-hover:block">
            Mi Inventario
          </h2>
        </div>

        <ul className="flex flex-col gap-6">
          <li>
            <Link
              to={`${basePath}/home`}
              className={clsx(
                "flex items-center gap-2 hover:text-[#FCDDEC] transition w-full",
                "justify-center group-hover:justify-start pl-0 group-hover:pl-2",
                location.pathname.includes("/home") && "font-semibold"
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
              to={`${basePath}/inventario`}
              className={clsx(
                "flex items-center gap-2 hover:text-[#FCDDEC] transition w-full",
                "justify-center group-hover:justify-start pl-0 group-hover:pl-2",
                location.pathname.includes("/inventario") && "font-semibold"
              )}
            >
              <FaBox className="text-2xl" />
              <span className="hidden group-hover:inline transition-all duration-300">
                Inventario
              </span>
            </Link>
          </li>

          {/* Solo para empresarial podrías mostrar esto */}
          {tipoUsuario === "empresarial" && (
            <li>
              <Link
                to={`${basePath}/reportes`}
                className={clsx(
                  "flex items-center gap-2 hover:text-[#FCDDEC] transition w-full",
                  "justify-center group-hover:justify-start pl-0 group-hover:pl-2",
                  location.pathname.includes("/reportes") && "font-semibold"
                )}
              >
                <FaChartBar className="text-2xl" />
                <span className="hidden group-hover:inline transition-all duration-300">
                  Reportes
                </span>
              </Link>
            </li>
          )}

          <li>
            <Link
              to={`${basePath}/historial`}
              className={clsx(
                "flex items-center gap-2 hover:text-[#FCDDEC] transition w-full",
                "justify-center group-hover:justify-start pl-0 group-hover:pl-2",
                location.pathname.includes("/historial") && "font-semibold"
              )}
            >
              <FaHistory className="text-2xl" />
              <span className="hidden group-hover:inline transition-all duration-300">
                Historial
              </span>
            </Link>
          </li>

          <li>
            <Link
              to={`${basePath}/configuracion`}
              className={clsx(
                "flex items-center gap-2 hover:text-[#FCDDEC] transition w-full",
                "justify-center group-hover:justify-start pl-0 group-hover:pl-2",
                location.pathname.includes("/configuracion") && "font-semibold"
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
