import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import HomeIndividual from './pages/individual/Home';
import InventarioIndividual from './pages/individual/Inventario';
import HomeEmpresarial from './pages/empresarial/Home';
import InventarioEmpresarial from './pages/empresarial/Inventario';
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* INDIVIDUAL */}
        <Route path="/app/individual" element={<Layout />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<HomeIndividual />} />
          <Route path="inventario" element={<InventarioIndividual />} />
        </Route>

        {/* EMPRESARIAL */}
        <Route path="/app/empresarial" element={<Layout />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<HomeEmpresarial />} />
          <Route path="inventario" element={<InventarioEmpresarial />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
