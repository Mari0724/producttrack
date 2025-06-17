import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/comunes/ProductCard';
import FloatingButton from '../../components/comunes/FloatingButton';
import ProductModal from '../../components/comunes/ProductModal';
import ConfirmDeleteModal from '../../components/comunes/ConfirmDeleteModal';
import type { Product } from '../../types/Product';
import { getProductos, crearProducto, editarProducto, eliminarProducto } from '../../api/productos';

const Inventario: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const res = await getProductos();
        setProducts(res.data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    }

    fetchProductos();
  }, []);

  const handleSaveProduct = async (product: Product) => {
    try {
      const res = await crearProducto(product);
      setProducts(prev => [...prev, res.data]);
      setShowProductModal(false);
    } catch {
      alert("Error al guardar producto");
    }
  };

  const handleEditProduct = async (updatedProduct: Product) => {
    try {
      await editarProducto(updatedProduct.id, updatedProduct);
      setProducts(prev =>
        prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      setProductToEdit(null);
    } catch {
      alert("Error al editar producto");
    }
  };

  const openEditModal = (product: Product) => {
    setProductToEdit(product);
    setShowProductModal(true);
  };

  const handleAskDelete = (productId: number) => {
    setProductToDelete(productId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete !== null) {
      try {
        await eliminarProducto(productToDelete);
        setProducts(prev =>
          prev.filter(product => product.id !== productToDelete)
        );
        setShowConfirmModal(false);
        setProductToDelete(null);
      } catch {
        alert("Error al eliminar producto");
      }
    }
  };

  return (
    <div className="main">
      <div className="content">
        <h2 className="text-2xl font-bold text-[#81203D] mb-6">Inventario de Productos</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              {...product}
              onEdit={() => openEditModal(product)}
              onDelete={() => handleAskDelete(product.id)}
            />
          ))}
        </div>

        <FloatingButton onAddProduct={() => setShowProductModal(true)} />

        <ConfirmDeleteModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmDelete}
          productName={productToDelete?.toString() || ''}
        />

        <ProductModal
          isOpen={showProductModal}
          onClose={() => {
            setShowProductModal(false);
            setProductToEdit(null);
          }}
          onSave={productToEdit ? handleEditProduct : handleSaveProduct}
          initialData={productToEdit ?? undefined}
        />
      </div>
    </div>
  );
};

export default Inventario;
