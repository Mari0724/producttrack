import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import HomeIndividual from './pages/individual/Home';
import InventarioIndividual from './pages/individual/Inventario';
import HomeEmpresarial from './pages/empresarial/Home';
import InventarioEmpresarial from './pages/empresarial/Inventario';
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomeDesarrollador from './pages/desarrollador/Home';
import ReportesDesarrollador from './pages/desarrollador/Reportes';
import NotificacionesConfig from './pages/configuracion/NotificacionesConfig';
import HistorialIndividual from "./pages/individual/Historial";
import HistorialEmpresarial from "./pages/empresarial/Historial";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
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
          <Route path="home" element={<HomeIndividual />} />
          <Route path="inventario" element={<InventarioIndividual />} />
          <Route path="historial" element={<HistorialIndividual />} />
          <Route path="configuracion" element={<NotificacionesConfig />} /> {/* 👈 aquí */}
        </Route>

        {/* EMPRESARIAL */}
        <Route path="/app/empresarial" element={<Layout />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<HomeEmpresarial />} />
          <Route path="inventario" element={<InventarioEmpresarial />} />
          <Route path="historial" element={<HistorialEmpresarial />} />
          <Route path="configuracion" element={<NotificacionesConfig />} /> {/* 👈 aquí también */}
        </Route>

        {/* DESARROLLADOR */}
        <Route path="/app/desarrollador" element={<Layout />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<HomeDesarrollador />} />
          <Route path="reportes" element={<ReportesDesarrollador />} />
          <Route path="configuracion" element={<NotificacionesConfig />} /> {/* 👈 y aquí */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
