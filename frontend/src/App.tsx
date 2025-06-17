import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout'; // ruta a tu layout
import Dashboard from './pages/individual/Home';
import ProductList from './pages/individual/Inventario';
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
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
          {/* Puedes agregar más rutas privadas aquí */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;