import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NutriScan from "./pages/NutriScan";
import Layout from "./layout/Layout";

// Página de inicio temporal (puedes reemplazarla luego)
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

        {/* Rutas privadas con Layout (Sidebar) */}
        <Route path="/" element={<Layout />}>
          {/* Aquí van las páginas que comparten el layout */}
          <Route path="nutriscan" element={<NutriScan />} />
        </Route>

        {/* Ruta temporal de inicio después del login */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
