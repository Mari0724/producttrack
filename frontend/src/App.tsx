import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

import Register from "./pages/Register";
import Login from "./pages/Login";
import NutriScan from "./pages/NutriScan";
import Layout from "./layout/Layout";
import Index from "./pages/Index";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TeamManagement from "./pages/TeamManagement";
import { UserProvider } from "./context/UserContext";

// Componente que verifica si hay usuario para la ruta "/"
function RutaRaiz() {
  const token = localStorage.getItem("token");
  return token ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/register" replace />
  );
}


function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terminos-y-condiciones" element={<TermsOfService />} />
          <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />

          {/* Ruta raíz redirecciona según sesión */}
          <Route path="/" element={<RutaRaiz />} />

          {/* Rutas privadas con Layout */}
          <Route element={<Layout />}>
            <Route path="/home" element={<Index />} />
            <Route path="/nutriscan" element={<NutriScan />} />
            <Route path="/equipo" element={<TeamManagement />} />
          </Route>

          {/* Ruta fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Toaster richColors position="top-right" />
      </Router>
    </UserProvider>
  );
}

export default App;
