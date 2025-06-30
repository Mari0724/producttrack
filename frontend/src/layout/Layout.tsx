import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import type { ReactNode, FC } from "react";
import { useEffect, useState } from "react";
import AdModal from "../components/AdModal"; // ajusta la ruta si no coincide
import { useLocation } from "react-router-dom";


interface LayoutProps {
  children: ReactNode;
  userType: 'INDIVIDUAL' | 'EMPRESARIAL' | 'EQUIPO';
  companyName?: string;
}

const Layout: FC<LayoutProps> = ({ children, userType, companyName }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login'; // o cambia según tu ruta real

  const adImages = ['/ads/anuncio1.jpg', '/ads/anuncio2.jpg'];
  const [showAd, setShowAd] = useState(false);
  const [currentAd, setCurrentAd] = useState(0);
  const [adCount, setAdCount] = useState(1); // Ya mostramos 1 al login

  useEffect(() => {
    setShowAd(true); // Mostrar el primero al iniciar

    const interval = setInterval(() => {
      if (adCount < 4) {
        setCurrentAd((prev) => (prev + 1) % adImages.length);
        setShowAd(true);
        setAdCount((prev) => prev + 1);
      }
    }, 900000); // cada 15 minutos (900000 ms)

    return () => clearInterval(interval);
  }, [adCount, adImages.length]);

  const closeAd = () => setShowAd(false);


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

      {!isLoginPage && adCount < 4 && (
        <AdModal
          imageUrl={adImages[currentAd]}
          delayToClose={5}
          open={showAd}
          onClose={closeAd}
        />
      )}

    </div>


  );
};

export default Layout;
