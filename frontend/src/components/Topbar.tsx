import { useState } from "react";
import { MdHelp, MdAccountCircle } from "react-icons/md";
import NotificationBell from "./NotificationBell"; // 👈 Importa la campanita de Lovable

const Topbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <header className="topbar flex items-center justify-between px-6 py-3 bg-white shadow">
      <div className="flex items-center gap-4 ml-4">
        {/* Aquí usamos la campanita nueva */}
        <NotificationBell />

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
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Cerrar sesión</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
