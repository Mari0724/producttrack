import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout'; // ruta a tu layout
import Dashboard from './pages/individual/Home';
import ProductList from './pages/individual/Inventario';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="inventario" element={<ProductList />} />
          {/* Puedes agregar más rutas aquí */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;