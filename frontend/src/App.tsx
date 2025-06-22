import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Dashboard from './pages/individual/Home';
import ProductList from './pages/individual/Inventario';
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from 'react-hot-toast'; // ✅ Toast para notificaciones

function App() {
  return (
    <Router>
      {/* ✅ Componente que muestra los toasts */}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* Redirección raíz a /register */}
        <Route path="/" element={<Navigate to="/register" />} />

        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas con layout */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="individual/home" element={<Dashboard />} />
          <Route path="inventario" element={<ProductList />} />
          {/* Más rutas aquí si las necesitas */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
