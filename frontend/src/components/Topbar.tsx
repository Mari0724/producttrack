import { useState } from "react";
import { MdNotifications, MdHelp, MdAccountCircle } from "react-icons/md";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const { setUsuario } = useUser();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setUsuario(null);
    navigate("/login");
  };

  return (
    <header className="topbar flex items-center justify-between px-6 py-3 bg-white shadow">
      <input
        type="text"
        placeholder="Buscar"
        className="flex-1 max-w-md mx-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#81203D] text-base"
      />
      <div className="flex items-center gap-4 ml-4">
        <MdNotifications className="text-2xl" />
        <MdHelp className="text-2xl" />
        <div className="relative">
          <div
            className="cursor-pointer"
            onClick={() => setMenuActive(!menuActive)}
          >
            <MdAccountCircle className="text-3xl" />
          </div>
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
