import {
  FaHome,
  FaUser,
  FaChartBar,
  FaBox,
  FaHistory,
  FaCog,
} from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import clsx from "clsx"

const Sidebar = () => {
  const location = useLocation()

  return (
    <div
      className={clsx(
        "group hover:w-60 w-20 bg-[#404D2C] text-white h-screen p-4 transition-all duration-300 ease-in-out relative"
      )}
    >
      {/* Contenedor del contenido del sidebar */}
      <div className="flex flex-col gap-6 w-full mt-12">
        {/* Título que aparece solo en hover */}
        <div className="overflow-hidden transition-all duration-300">
          <h2 className="text-2xl font-bold mb-6 whitespace-nowrap hidden group-hover:block">
            Mi Inventario
          </h2>
        </div>

        {/* Lista de navegación */}
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
              to="/app/inventario"
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
  )
}

export default Sidebar
