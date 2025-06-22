import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NutriScan from "./pages/NutriScan";
//import Equipo from "./pages/Equipo";
import Layout from "./layout/Layout";
import Index from "./pages/Index";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

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
          {/* Esta es la nueva página de inicio luego del login */}
          <Route index element={<Index />} />
          <Route path="home" element={<Navigate to="/" />} /> {/* redirección de /home a raíz */}
          <Route path="nutriscan" element={<NutriScan />} />
          {/* <Route path="equipo" element={<Equipo />} />*/}
        </Route>

        {/* Cualquier otra ruta no encontrada */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
