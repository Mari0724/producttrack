import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import FloatingButton from '../../components/FloatingButton';
import ProductModal from '../../components/ProductModal';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import EnterpriseCommentsModal from '../../components/empresarial/CompanyCommentsModal';
import type { Product } from '../../types/Product';
import { getProductos, getProductoPorId, crearProducto, editarProducto, eliminarProducto, getCategorias, getProductosPorCategoria } from '../../api/productos';
import toast from 'react-hot-toast';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const InventarioEmpresarial: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('');

  const [selectedProduct] = useState<Product | null>(null);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const userId = Number(localStorage.getItem("userId"));
  const userRol = localStorage.getItem("rolEquipo") || localStorage.getItem("rol") || "";

  const tipoUsuario = localStorage.getItem('tipoUsuario');
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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
      // Actualiza el producto
      await editarProducto(updatedProduct.id, updatedProduct);

      // Trae el producto actualizado desde el backend
      const res = await getProductoPorId(updatedProduct.id);
      const productoActualizado = res.data;

      // Reemplaza el producto en el estado sin recargar
      setProducts(prev =>
        prev.map(p => (p.id === updatedProduct.id ? productoActualizado : p))
      );

      toast.success("Producto actualizado correctamente");
      setProductToEdit(null);
      setShowProductModal(false);
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
      <div className="main px-4 sm:px-0">
        {/* Título bonito centrado */}
        <h2 className="text-2xl font-bold text-[#81203D] mb-4">Inventario de Productos</h2>

        {/* 🔍 Filtro + Búsqueda alineados */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          {/* Filtro de Categoría */}
          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filtrar por categoría:
            </label>
            <select
              value={categoriaSeleccionada}
              onChange={handleCategoriaChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full text-sm shadow-sm"
            >
              <option value="">-- Selecciona una categoría --</option>
              {categorias.map((cat: string) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Barra de Búsqueda */}
          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar por nombre:
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute w-5 h-5 left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar producto..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#81203D]"
              />
            </div>
          </div>
        </div>

        {/* 📦 Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3">
          {products
            .filter(
              (product) =>
                (!categoriaSeleccionada ||
                  product.categoria === categoriaSeleccionada) &&
                product.usuario?.tipoUsuario === tipoUsuario &&
                product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product) => (
              <div key={product.id} className="relative">
                <ProductCard
                  product={product}
                  onEdit={
                    userRol.toUpperCase() === "EDITOR" ? () => openEditModal(product) : undefined
                  }
                  onDelete={
                    userRol.toUpperCase() === "EDITOR"
                      ? () => handleAskDelete(product.id!)
                      : undefined
                  }
                  rol={userRol.toUpperCase()}
                />
              </div>
            ))}
        </div>

        {/* ➕ Botón flotante */}
        {userRol === "EDITOR" && (
          <FloatingButton onAddProduct={() => setShowProductModal(true)} />
        )}

        {/* 🗑️ Modal de confirmación de eliminación */}
        <ConfirmDeleteModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmDelete}
          productName={productToDelete?.toString() || ""}
        />

        {/* 📝 Modal de producto */}
        <ProductModal
          isOpen={showProductModal}
          onClose={() => {
            setShowProductModal(false);
            setProductToEdit(null);
          }}
          onSave={productToEdit ? handleEditProduct : handleSaveProduct}
          initialData={productToEdit ?? undefined}
        />

        {/* 💬 Modal de comentarios */}
        {selectedProduct && showCommentsModal && (
          <EnterpriseCommentsModal
            productId={selectedProduct.id!}
            productName={selectedProduct.nombre}
            onClose={() => setShowCommentsModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default InventarioEmpresarial;
