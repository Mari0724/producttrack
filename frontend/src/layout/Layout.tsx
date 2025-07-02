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

const Layout: FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const [showAd, setShowAd] = useState(false);
  const [currentAd, setCurrentAd] = useState(0);
  const [adCount, setAdCount] = useState(0);

  // Inicializa adCount correctamente
  useEffect(() => {
    const savedCount = parseInt(localStorage.getItem("adCount") || "0");
    const savedTimestamp = localStorage.getItem("adTimestamp");
    const now = Date.now();
    const hours24 = 24 * 60 * 60 * 1000;

    if (!savedTimestamp || now - parseInt(savedTimestamp) > hours24) {
      // Reiniciar conteo diario
      localStorage.setItem("adCount", "1");
      localStorage.setItem("adTimestamp", now.toString());
      sessionStorage.setItem("firstAdShown", "true");
      setAdCount(1);
      const randomIndex = Math.floor(Math.random() * adImages.length);
      setCurrentAd(randomIndex);
      setShowAd(true);
    } else {
      setAdCount(savedCount);
      const hasShown = sessionStorage.getItem("firstAdShown") === "true";
      if (!hasShown && savedCount < 4) {
        sessionStorage.setItem("firstAdShown", "true");
        localStorage.setItem("adCount", (savedCount + 1).toString());
        setAdCount(savedCount + 1);
        const randomIndex = Math.floor(Math.random() * adImages.length);
        setCurrentAd(randomIndex);
        setShowAd(true);
      }
    }
  }, []);

  // Mostrar anuncios futuros cada 15 minutos si no han sido 4
  useEffect(() => {
    const interval = setInterval(() => {
      const currentCount = parseInt(localStorage.getItem("adCount") || "0");
      if (currentCount < 4) {
        const nextIndex = Math.floor(Math.random() * adImages.length);
        setCurrentAd(nextIndex);
        setShowAd(true);
        const newCount = currentCount + 1;
        setAdCount(newCount);
        localStorage.setItem("adCount", newCount.toString());
      }
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const closeAd = () => setShowAd(false);

  return (
    <div className="flex h-screen">
      <div className="transition-all duration-300">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto px-4 py-4 md:px-8 md:py-6 bg-background">
          {children}
        </main>
      </div>

      {!isLoginPage && adCount <= 4 && showAd && (
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
