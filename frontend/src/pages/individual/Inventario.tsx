import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import FloatingButton from '../../components/FloatingButton';
import ProductModal from '../../components/ProductModal';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import type { Product } from '../../types/Product';
import { getProductos, crearProducto, editarProducto, eliminarProducto, getCategorias, getProductosPorCategoria } from '../../api/productos';
import toast from 'react-hot-toast';
import ProductCommentsModal from '../../components/CommentsModal';

const Inventario: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('');

  const tipoUsuario = localStorage.getItem("tipoUsuario"); // 👈 Esto determina si es individual
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const openCommentsModal = (product: Product) => {
    setSelectedProduct(product);
    setShowCommentsModal(true);
  };

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

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await getCategorias();
        setCategorias(res.data);
      } catch (error) {
        console.error(error);
        toast.error('Error al cargar categorías');
      }
    };

    fetchCategorias();
  }, []);

  const handleCategoriaChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevaCategoria = e.target.value;
    setCategoriaSeleccionada(nuevaCategoria);

    try {
      if (nuevaCategoria === '') {
        const res = await getProductos(); // 🔁 volver a mostrar todos
        setProducts(res.data);
      } else {
        const res = await getProductosPorCategoria(nuevaCategoria);
        setProducts(res.data);
      }
    } catch (error) {
      console.error(error);
      toast.error('No se pudieron cargar los productos');
      setProducts([]);
    }
  };

  const handleSaveProduct = async (product: Product) => {
    try {
      // Obtener el usuarioId del localStorage (o donde lo tengas)
      const userId = Number(localStorage.getItem("userId")); // o el nombre real que usaste

      const productoConUsuario = {
        ...product,
        usuarioId: userId, // sobreescribe con el ID correcto
      };

      const res = await crearProducto(productoConUsuario);
      setProducts(prev => [...prev, res.data]);
      setShowProductModal(false);
    } catch {
      alert("Error al guardar producto");
    }
  };

  const handleEditProduct = async (updatedProduct: Product) => {
    if (updatedProduct.id === undefined) {
      alert("Producto sin ID, no se puede editar");
      return;
    }

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
        toast.success("Producto eliminado exitosamente");
        setShowConfirmModal(false);
        setProductToDelete(null);
      } catch {
        toast.error("Error al eliminar producto");
      }
    }
  };

  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por categoría:</label>
        <select
          value={categoriaSeleccionada}
          onChange={handleCategoriaChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full max-w-xs text-sm"
        >
          <option value="">-- Selecciona una categoría --</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="main">
        <div className="content">
          <h2 className="text-2xl font-bold text-[#81203D] mb-6">Inventario de Productos</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3">
            {products.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard 
                  product={product}
                  onEdit={() => openEditModal(product)}
                  onDelete={() => handleAskDelete(product.id!)}
                />

                {/* ✅ Mostrar "Notas personales" solo si el usuario es individual */}
                {tipoUsuario === "individual" && (
                  <button
                    onClick={() => openCommentsModal(product)}
                    className="mt-2 ml-1 text-xs text-blue-600 hover:underline"
                  >
                    Notas personales
                  </button>
                )}
              </div>
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
          {selectedProduct && showCommentsModal && (
            <ProductCommentsModal
              productId={selectedProduct.id!}
              productName={selectedProduct.nombre}
              onClose={() => setShowCommentsModal(false)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Inventario;
