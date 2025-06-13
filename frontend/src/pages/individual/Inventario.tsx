import React, { useState } from 'react';
import ProductCard from '../../components/comunes/ProductCard';
import FloatingButton from '../../components/comunes/FloatingButton';
import ProductModal from '../../components/comunes/ProductModal';

interface Product {
  name: string;
  category: string;
  stock: number;
  expirationDate: string;
  userType: 'INDIVIDUAL' | 'EMPRESARIAL';
  image: string;
}

const Inventario: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      name: 'Shampoo Natural',
      category: 'Cuidado personal',
      stock: 2,
      expirationDate: '2025-10-01',
      userType: 'INDIVIDUAL',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Arroz Premium 5kg',
      category: 'Alimentos',
      stock: 40,
      expirationDate: '2026-01-15',
      userType: 'EMPRESARIAL',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Crema dental',
      category: 'Cuidado personal',
      stock: 1,
      expirationDate: '2024-12-01',
      userType: 'INDIVIDUAL',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Aceite vegetal',
      category: 'Alimentos',
      stock: 28,
      expirationDate: '2026-03-05',
      userType: 'EMPRESARIAL',
      image: 'https://via.placeholder.com/150'
    }
  ]);

  const [showProductModal, setShowProductModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const handleSaveProduct = (product: Product) => {
    // Imagen por defecto si no se proporciona
    const productWithImage = {
      ...product,
      image: product.image?.trim() || 'https://via.placeholder.com/150'
    };

    // Verifica si ya existe un producto con ese nombre
    const exists = products.some(p => p.name === product.name);
    if (exists) {
      alert('Ya existe un producto con ese nombre.');
      return;
    }

    setProducts(prev => [...prev, productWithImage]);
    setShowProductModal(false);
  };

  const handleDeleteProduct = (name: string) => {
    setProducts(prev => prev.filter(product => product.name !== name));
  };

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(product => 
      product.name === updatedProduct.name ? updatedProduct : product
    ));
    setProductToEdit(null);
  };

  // AQUÍ VA 👇
  const openEditModal = (product: Product) => {
    setProductToEdit(product);
    setShowProductModal(true);
  };

  return (
    <div className="p-6 bg-[#F8F8F8] min-h-screen relative">
      <h2 className="text-2xl font-bold text-[#81203D] mb-6">Inventario de Productos</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3">
        {products.map((product, idx) => (
          <ProductCard 
            key={idx}
            {...product}
            onEdit={() => openEditModal(product)}
            onDelete={() => handleDeleteProduct(product.name)}
          />
        ))}
      </div>

      <FloatingButton 
        onAddProduct={() => setShowProductModal(true)}
      />

      <ProductModal 
        isOpen={showProductModal}
        onClose={() => {
          setShowProductModal(false);
          setProductToEdit(null); // cerramos y limpiamos
        }}
        onSave={productToEdit ? handleEditProduct : handleSaveProduct}
        initialData={productToEdit ?? undefined}
      />
    </div>
  );
};

export default Inventario;
