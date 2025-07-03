import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import InventarioIndividual from './pages/individual/Inventario';
import InventarioEmpresarial from './pages/empresarial/Inventario';
import Register from "./pages/Register";
import Login from "./pages/Login";
import ReportesDesarrollador from './pages/desarrollador/Reportes';
import NotificacionesConfig from './pages/NotificacionesConfig';
import HistorialIndividual from "./pages/individual/Historial";
import HistorialEmpresarial from "./pages/empresarial/Historial";
import Index from "./pages/Index"; // 👈 tu nuevo home
import { Toaster } from 'react-hot-toast';

import { UserProvider } from './context/UserContext'; // 👈 importa el proveedor

function App() {
  return (
    <UserProvider> {/* 👈 envolvemos todo dentro del contexto */}
      <Router>
        <Toaster position="top-right" reverseOrder={false} />

        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* INDIVIDUAL */}
          <Route path="/app/individual" element={<Layout />}>
            <Route index element={<Navigate to="home" />} />
            <Route path="home" element={<Index />} /> {/* 👈 Home Individual y Empresarial */}
            <Route path="inventario" element={<InventarioIndividual />} />
            <Route path="historial" element={<HistorialIndividual />} />
            <Route path="configuracion" element={<NotificacionesConfig />} />
          </Route>

          {/* EMPRESARIAL */}
          <Route path="/app/empresarial" element={<Layout />}>
            <Route index element={<Navigate to="home" />} />
            <Route path="home" element={<Index />} /> {/* 👈 mismo Index para empresarial */}
            <Route path="inventario" element={<InventarioEmpresarial />} />
            <Route path="historial" element={<HistorialEmpresarial />} />
            <Route path="configuracion" element={<NotificacionesConfig />} />
          </Route>

          {/* DESARROLLADOR */}
          <Route path="/app/desarrollador" element={<Layout />}>
            <Route index element={<Navigate to="home" />} />
            <Route path="home" element={<Index />} /> {/* 👈 también puedes usar el mismo */}
            <Route path="reportes" element={<ReportesDesarrollador />} />
            <Route path="configuracion" element={<NotificacionesConfig />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
