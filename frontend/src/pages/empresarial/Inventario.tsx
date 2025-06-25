import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import FloatingButton from '../../components/FloatingButton';
import ProductModal from '../../components/ProductModal';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import EnterpriseCommentsModal from '../../components/empresarial/CompanyCommentsModal';
import type { Product } from '../../types/Product';
import { getProductos, crearProducto, editarProducto, eliminarProducto, getCategorias , getProductosPorCategoria } from '../../api/productos';
import toast from 'react-hot-toast';

const InventarioEmpresarial: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const userId = Number(localStorage.getItem("userId"));
  const userRol = localStorage.getItem("rol"); // comentarista, administrador, etc.

  const tipoUsuario = localStorage.getItem('tipoUsuario');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await getProductos();
        const tipoUsuarioActual = localStorage.getItem("tipoUsuario")?.toUpperCase();

        const productosFiltrados = res.data.filter(
          (p: Product) => p.usuario?.tipoUsuario === tipoUsuarioActual
        );

        setProducts(productosFiltrados);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const tipoUsuario = localStorage.getItem("tipoUsuario")?.toUpperCase() || "";
        const res = await getCategorias(tipoUsuario); // ✅ enviamos el tipoUsuario
        setCategorias(res.data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    fetchProductos();
    fetchCategorias();
  }, []);


  const handleCategoriaChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevaCategoria = e.target.value;
    setCategoriaSeleccionada(nuevaCategoria);

    try {
      let productosFiltrados = [];

      if (nuevaCategoria === '') {
        const res = await getProductos();
        productosFiltrados = res.data;
      } else {
        const res = await getProductosPorCategoria(nuevaCategoria);
        productosFiltrados = res.data;
      }

      const tipoUsuarioActual = localStorage.getItem("tipoUsuario")?.toUpperCase();

      const soloDelUsuario = productosFiltrados.filter(
        (p) => p.usuario?.tipoUsuario === tipoUsuarioActual
      );

      setProducts(soloDelUsuario);
    } catch (error) {
      console.error(error);
      toast.error('No se pudieron cargar los productos');
      setProducts([]);
    }
  };

  const handleSaveProduct = async (product: Product) => {
    try {
      const productoConUsuario = {
        ...product,
        usuarioId: userId,
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

  const openCommentsModal = (product: Product) => {
    setSelectedProduct(product);
    setShowCommentsModal(true);
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
          {categorias.map((cat: string) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

      </div>

      <div className="main">
        <div className="content">
          <h2 className="text-2xl font-bold text-[#81203D] mb-6">Inventario de Productos</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3">
            {products
              .filter(product =>
                (!categoriaSeleccionada || product.categoria === categoriaSeleccionada) &&
                product.usuario?.tipoUsuario === tipoUsuario
              )
              .map((product) => (
                <div key={product.id} className="relative">
                  <ProductCard
                    product={product}
                    onEdit={userRol === "EDITOR" ? () => openEditModal(product) : undefined}
                    onDelete={userRol === "EDITOR" ? () => handleAskDelete(product.id!) : undefined}
                  />

                  {(userRol === "COMENTARISTA" || userRol === "EDITOR") && (
                    <button
                      onClick={() => openCommentsModal(product)}
                      className="mt-2 ml-1 text-xs text-blue-600 hover:underline"
                    >
                      Ver más
                    </button>
                  )}
                </div>
              ))}
          </div>

          {userRol === "EDITOR" && (
            <FloatingButton onAddProduct={() => setShowProductModal(true)} />
          )}

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
            <EnterpriseCommentsModal
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

export default InventarioEmpresarial;
