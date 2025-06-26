import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import type { ReactNode, FC } from "react";

interface LayoutProps {
  children: ReactNode;
  userType: 'INDIVIDUAL' | 'EMPRESARIAL' | 'EQUIPO';
  companyName?: string;
}

// 👇 Aquí definimos el componente como FC con props tipadas
const Layout: FC<LayoutProps> = ({ children, userType, companyName }) => {
  return (
    <div className="flex h-screen">
      <div className="transition-all duration-300">
        <Sidebar userType={userType} companyName={companyName} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto px-4 py-4 md:px-8 md:py-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
