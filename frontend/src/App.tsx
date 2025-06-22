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

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas legales */}
        <Route path="/terminos-y-condiciones" element={<TermsOfService />} />
        <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />

        {/* Rutas privadas con Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="home" element={<Navigate to="/" />} />
          <Route path="nutriscan" element={<NutriScan />} />
          <Route path="equipo" element={<TeamManagement />} />
        </Route>

        {/* Cualquier otra ruta no encontrada */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Sonner toaster */}
      <Toaster richColors position="top-right" />
    </Router>
  );
}

export default App;
