import { useState } from "react";
import { MdNotifications, MdHelp, MdAccountCircle } from "react-icons/md";
import { ArrowRight, Users } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const { usuario, setUsuario } = useUser();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setUsuario(null);
    navigate("/login");
  };

  const irAGestionEquipo = () => {
    navigate("/equipo");
  };

  return (
    <header className="topbar flex items-center justify-between px-4 py-3 bg-white shadow gap-3">

      {/* Input responsivo */}
      <input
        type="text"
        placeholder="Buscar"
        className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#81203D] text-sm"
        style={{
          width: 'clamp(100px, 30vw, 300px)',
        }}
      />

      {/* Botón y acciones agrupadas */}
      <div className="flex items-center gap-3">

        {/* Botón para EMPRESARIAL */}
        {usuario?.tipoUsuario === "EMPRESARIAL" && (
          <button
            onClick={irAGestionEquipo}
            className="flex items-center bg-[#808000] text-white px-2 md:px-4 py-1.5 rounded-lg hover:bg-[#6b6b00] transition-colors text-sm"
          >
            <Users className="w-4 h-4" />
            {/* Texto visible solo en pantallas medianas en adelante */}
            <span className="hidden md:inline ml-2">Gestión de Equipo</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        )}

        {/* Íconos de acciones */}
        <MdNotifications className="text-xl md:text-2xl" />
        <MdHelp className="text-xl md:text-2xl" />
        <div className="relative">
          <div
            className="cursor-pointer"
            onClick={() => setMenuActive(!menuActive)}
          >
            <MdAccountCircle className="text-2xl md:text-3xl" />
          </div>

          {/* Menú desplegable */}
          {menuActive && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-md rounded-lg p-2 z-10">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Mi perfil</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Empresa</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Configuración</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Seguridad</a>
              <button
                onClick={cerrarSesion}
                className="w-full text-left block px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
