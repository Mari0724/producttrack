import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NutriScan from "./pages/NutriScan";
import Layout from "./layout/Layout";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const Home = () => (
  <div className="flex">
    <Layout />
    <div className="p-4">Bienvenido, esta es tu página de inicio temporal.</div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas legales */}
        <Route path="/terminos-y-condiciones" element={<TermsOfService />} />
        <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />

        {/* Rutas privadas con layout */}
        <Route path="/" element={<Layout />}>
          <Route path="nutriscan" element={<NutriScan />} />
        </Route>

        {/* Página temporal de prueba */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
