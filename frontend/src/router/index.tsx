import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../layout/Layout'
import Dashboard from '../pages/individual/Home'
import ProductList from '../pages/individual/Inventario'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="inventario" element={<ProductList />} />
          {/* Puedes agregar más rutas aquí */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
