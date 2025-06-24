import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import FloatingButton from '../../components/FloatingButton';
import ProductModal from '../../components/ProductModal';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import type { Product } from '../../types/Product';
import { getProductos, crearProducto, editarProducto, eliminarProducto, getCategorias, getProductosPorCategoria } from '../../api/productos';
import toast from 'react-hot-toast';
import ProductCommentsModal from '../../components/individuales/CommentsModal';

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

  // ✅ CAMBIO: función que puedes usar en cualquier parte
  const fetchProductos = async () => {
    try {
      const res = await getProductos();
      setProducts(res.data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  const openCommentsModal = (product: Product) => {
    setSelectedProduct(product);
    setShowCommentsModal(true);
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await getProductos();
        const tipoUsuarioStorage = localStorage.getItem("tipoUsuario")?.toUpperCase();
        const soloDelUsuario = res.data.filter(
          (p) => p.usuario?.tipoUsuario === tipoUsuarioStorage
        );
        setProducts(soloDelUsuario);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const tipoUsuarioStorage = localStorage.getItem("tipoUsuario") || "";
        const res = await getCategorias(tipoUsuarioStorage.toUpperCase());
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
      let productosFiltrados;
      if (nuevaCategoria === '') {
        const res = await getProductos();
        productosFiltrados = res.data;
      } else {
        const res = await getProductosPorCategoria(nuevaCategoria);
        productosFiltrados = res.data;
      }

      // Aplicar filtro por tipo de usuario también
      const tipoUsuarioStorage = localStorage.getItem("tipoUsuario")?.toUpperCase();
      const soloDelUsuario = productosFiltrados.filter(
        (p) => p.usuario?.tipoUsuario === tipoUsuarioStorage
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
      const userId = Number(localStorage.getItem("userId"));

      const productoConUsuario = {
        ...product,
        usuarioId: userId,
      };

      await crearProducto(productoConUsuario);
      toast.success("Producto creado correctamente");
      setShowProductModal(false);

      await fetchProductos(); // ✅ CAMBIO: recarga la lista actualizada
    } catch {
      toast.error("Error al guardar producto");
    }
  };

  const handleEditProduct = async (updatedProduct: Product) => {
    if (updatedProduct.id === undefined) {
      toast.error("Producto sin ID, no se puede editar");
      return;
    }

    try {
      await editarProducto(updatedProduct.id, updatedProduct);
      toast.success("Producto editado correctamente");
      setProductToEdit(null);
      setShowProductModal(false);

      await fetchProductos(); // ✅ CAMBIO: recarga lista tras editar
    } catch {
      toast.error("Error al editar producto");
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
        toast.success("Producto eliminado exitosamente");

        await fetchProductos(); // ✅ CAMBIO: lista actualizada tras borrar

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
            {products
            .filter(product =>
              (!categoriaSeleccionada || product.categoria === categoriaSeleccionada) &&
              product.usuario?.tipoUsuario === tipoUsuario?.toUpperCase()
            )
            .map((product) => (
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
