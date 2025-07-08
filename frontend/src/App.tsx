import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { UserProvider, useUser } from "./context/UserContext";

// Layout
import Layout from "./layout/Layout";

// Páginas públicas
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import TermsOfService from "./pages/legal/TermsOfService";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import RecuperarClave from "./pages/auth/RecuperarClave";
import VerificarCodigo from "./pages/auth/VerificarCodigo";

// Páginas privadas
import Index from "./router/Index";
import NotificacionesConfig from "./pages/NotificacionesConfig";

// INDIVIDUAL
import InventarioIndividual from "./pages/individual/Inventario";
import HistorialIndividual from "./pages/individual/Historial";

// EMPRESARIAL
import InventarioEmpresarial from "./pages/empresarial/Inventario";
import HistorialEmpresarial from "./pages/empresarial/Historial";
import TeamManagement from "./pages/equipo/TeamManagement";

// DESARROLLADOR
import ReportesDesarrollador from "./pages/desarrollador/Reportes";

// Auditoría
import AuditoriaIndex from "./pages/AuditoriaIndex";
import NutriScanAuditoria from "./pages/nutriscan/NutriScanAuditoria";
import EquipoAuditoria from "./pages/equipo/EquipoAuditoria";
import UsuarioAuditoria from "./pages/equipo/UsuarioAuditoria";

// Otros
import NutriScan from "./pages/nutriscan/NutriScan";
import Profile from "./pages/perfil/Profile";
import CompleteProfile from "./pages/perfil/CompletaProfile";

// 🔐 Redirección raíz
function RutaRaiz() {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/home" replace /> : <Navigate to="/register" replace />;
}

// 🧱 Wrapper para pasar props al layout
function LayoutWrapper() {
  const { usuario } = useUser();
  if (!usuario) return null;

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
          <Route path="/" element={<RutaRaiz />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terminos-y-condiciones" element={<TermsOfService />} />
          <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
          <Route path="/recuperar-clave" element={<RecuperarClave />} />
          <Route path="/verificar-codigo" element={<VerificarCodigo />} />
          <Route path="/completar-perfil" element={<CompleteProfile />} />

          {/* Rutas privadas */}
          <Route element={<LayoutWrapper />}>
            <Route path="/home" element={<Index />} />

            {/* INDIVIDUAL */}
            <Route path="/app/individual">
              <Route index element={<Navigate to="home" />} />
              <Route path="home" element={<Index />} />
              <Route path="inventario" element={<InventarioIndividual />} />
              <Route path="historial" element={<HistorialIndividual />} />
              <Route path="configuracion" element={<NotificacionesConfig />} />
            </Route>

            {/* EMPRESARIAL */}
            <Route path="/app/empresarial">
              <Route index element={<Navigate to="home" />} />
              <Route path="home" element={<Index />} />
              <Route path="inventario" element={<InventarioEmpresarial />} />
              <Route path="historial" element={<HistorialEmpresarial />} />
              <Route path="configuracion" element={<NotificacionesConfig />} />
              <Route path="equipo" element={<TeamManagement />} />
            </Route>

            {/* DESARROLLADOR */}
            <Route path="/app/desarrollador">
              <Route index element={<Navigate to="home" />} />
              <Route path="home" element={<Index />} />
              <Route path="reportes" element={<ReportesDesarrollador />} />
              <Route path="configuracion" element={<NotificacionesConfig />} />
            </Route>

            {/* Auditoría */}
            <Route path="/auditoria" element={<AuditoriaIndex />} />
            <Route path="/auditoria/nutriscan" element={<NutriScanAuditoria />} />
            <Route path="/auditoria/equipo" element={<EquipoAuditoria />} />
            <Route path="/auditoria/usuarios" element={<UsuarioAuditoria />} />

            {/* Otros */}
            <Route path="/nutriscan" element={<NutriScan />} />
            <Route path="/perfil" element={<Profile />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Toaster richColors position="top-right" />
      </Router>
    </UserProvider>
  );
}

export default App;
