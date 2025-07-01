import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";

import { UserProvider, useUser } from "./context/UserContext";

// Páginas públicas
import Register from "./pages/Register";
import Login from "./pages/Login";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RecuperarClave from "./pages/RecuperarClave";
import VerificarCodigo from "./pages/VerificarCodigo";


// Páginas privadas
import Index from "./pages/Index";
import NutriScan from "./pages/NutriScan";
import TeamManagement from "./pages/TeamManagement";
import AuditoriaIndex from "./pages/AuditoriaIndex";
import NutriScanAuditoria from "./pages/NutriScanAuditoria";
import EquipoAuditoria from './pages/EquipoAuditoria';
import UsuarioAuditoria from "./pages/UsuarioAuditoria"; 
import CompleteProfile from "./pages/CompletaProfile";
import Profile from "./pages/Profile";

// Layout general
import Layout from "./layout/Layout";


// 🔐 Redirección inicial según login
function RutaRaiz() {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/home" replace /> : <Navigate to="/register" replace />;
}

// 🧱 Layout con props del usuario
function LayoutWrapper() {
  const { usuario } = useUser();

  if (!usuario) return null; // ⏳ O puedes retornar un spinner

  return (
    <Layout userType={usuario.tipoUsuario} companyName={usuario.nombreEmpresa}>
      <Outlet />
    </Layout>
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
          <Route path="/recuperar-clave" element={<RecuperarClave />} />
          <Route path="/verificar-codigo" element={<VerificarCodigo />} />

          {/* Redirección raíz */}
          <Route path="/" element={<RutaRaiz />} />

          {/* Rutas privadas dentro del Layout */}
          <Route element={<LayoutWrapper />}>
            <Route path="/home" element={<Index />} />
            <Route path="/nutriscan" element={<NutriScan />} />
            <Route path="/equipo" element={<TeamManagement />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/auditoria" element={<AuditoriaIndex />} />
            <Route path="/auditoria/nutriscan" element={<NutriScanAuditoria />} />
            <Route path="/auditoria/equipo" element={<EquipoAuditoria />} />
            <Route path="/auditoria/usuarios" element={<UsuarioAuditoria />} />
          </Route>

          {/* Ruta temporal para completar perfil */}
          <Route path="/completar-perfil" element={<CompleteProfile />} />

          {/* Fallback a raíz */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Toaster richColors position="top-right" />
      </Router>
    </UserProvider>
  );
}

export default App;
