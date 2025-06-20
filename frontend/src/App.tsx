import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NutriScan from "./pages/NutriScan";
import Layout from "./layout/Layout";
import AuditoriaIndex from "./pages/AuditoriaIndex";
import NutriScanAuditoria from "./pages/NutriScanAuditoria";

// (Opcional) futuras auditorías si ya las tienes:
// import AuditoriaProductos from "./pages/AuditoriaProductos";
// import AuditoriaInventario from "./pages/AuditoriaInventario";
// import AuditoriaGraficas from "./pages/AuditoriaGraficas";
// import AuditoriaEquipo from "./pages/AuditoriaEquipo";

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

        {/* Rutas privadas con Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="nutriscan" element={<NutriScan />} />
          <Route path="auditoria" element={<AuditoriaIndex />} />
          <Route path="auditoria/nutriscan" element={<NutriScanAuditoria />} />
          
          {/* Puedes agregar estas después si quieres */}
          {/* <Route path="auditoria/productos" element={<AuditoriaProductos />} /> */}
          {/* <Route path="auditoria/inventario" element={<AuditoriaInventario />} /> */}
          {/* <Route path="auditoria/graficas" element={<AuditoriaGraficas />} /> */}
          {/* <Route path="auditoria/equipo" element={<AuditoriaEquipo />} /> */}
        </Route>

        {/* Ruta temporal de inicio después del login */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
