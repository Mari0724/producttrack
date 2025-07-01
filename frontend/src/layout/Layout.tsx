import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import type { ReactNode, FC } from "react";
import { useEffect, useState } from "react";
import AdModal from "../components/AdModal";
import { useLocation } from "react-router-dom";
import { adImages } from "../utils/adImages";


interface LayoutProps {
  children: ReactNode;
  userType: 'INDIVIDUAL' | 'EMPRESARIAL' | 'EQUIPO';
  companyName?: string;
}

const Layout: FC<LayoutProps> = ({ children, userType, companyName }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const [showAd, setShowAd] = useState(false);
  const [currentAd, setCurrentAd] = useState(0);
  const [adCount, setAdCount] = useState<number>(() => {
    const saved = localStorage.getItem("adCount");
    const timestamp = localStorage.getItem("adTimestamp");

    // Si no hay timestamp, guardar uno nuevo
    if (!timestamp) {
      localStorage.setItem("adTimestamp", Date.now().toString());
      return 1;
    }

    // Validar si pasaron más de 24 horas
    const now = Date.now();
    const elapsed = now - parseInt(timestamp);
    const hours24 = 24 * 60 * 60 * 1000;

    if (elapsed > hours24) {
      // Reiniciar contador
      localStorage.setItem("adCount", "1");
      localStorage.setItem("adTimestamp", now.toString());
      return 1;
    }

    return saved ? parseInt(saved) : 1;
  });

  useEffect(() => {
    setShowAd(true); // Mostrar primer anuncio

    const interval = setInterval(() => {
      const count = parseInt(localStorage.getItem("adCount") || "0");
      if (count < 4) {
        setCurrentAd((prev) => (prev + 1) % adImages.length);
        setShowAd(true);
        const newCount = count + 1;
        setAdCount(newCount);
        localStorage.setItem("adCount", newCount.toString());
      }
    }, 900000); // cada 15 minutos

    return () => clearInterval(interval);
  }, []);

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
