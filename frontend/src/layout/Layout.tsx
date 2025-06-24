import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar fijo con hover animado */}
      <div className="transition-all duration-300">
        <Sidebar />
      </div>

      {/* Contenido principal con margen izquierdo mínimo */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto px-4 py-4 md:px-8 md:py-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
