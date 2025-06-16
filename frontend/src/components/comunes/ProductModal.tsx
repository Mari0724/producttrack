import React, { useState, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import type { Product } from '../../types/Product';

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (product: Product) => void
  initialData?: Product;
}

const CLOUD_NAME = 'delkfnnil'
const UPLOAD_PRESET = 'productos_imagenes' // Crea uno en la consola

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [form, setForm] = useState<Product>({
  id: 0,
  name: '',
  category: '',
  stock: 0,
  expirationDate: '',
  userType: 'INDIVIDUAL',
  image: '',
});

  const [uploading, setUploading] = useState(false)

  useEffect(() => {
  setForm(initialData || {
    id: 0,
    name: '',
    category: '',
    stock: 0,
    expirationDate: '',
    userType: 'INDIVIDUAL',
    image: '',
  });
}, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === 'stock' ? parseInt(value) : value,
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Solo se permiten archivos de imagen')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)

    try {
      setUploading(true)
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      console.log('Respuesta de Cloudinary:', data) // 👀 Mira en la consola
      if (data.secure_url) {
        setForm(prev => ({ ...prev, image: data.secure_url }))
      } else {
        alert('Error al subir imagen: ' + data.error?.message)
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error)
      alert('Error al subir la imagen')
    } finally {
      setUploading(false)
    }
  }


  const handleSubmit = () => {
    if (!form.name || !form.category || !form.expirationDate || !form.userType) return
    onSave(form)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#81203D]"
        >
          <AiOutlineClose size={22} />
        </button>

        <h2 className="text-2xl font-bold text-[#81203D] mb-4">
          {initialData ? 'Detalles del producto' : 'Agregar nuevo producto'}
        </h2>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold">Nombre</label>
            <input
              type="text"
              name="name"
              placeholder="Nombre del producto"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-[#81203D]"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Categoría</label>
            <input
              type="text"
              name="category"
              placeholder="Categoría"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-[#81203D]"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Cantidad</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-[#81203D]"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Fecha de expiración</label>
            <input
              type="date"
              name="expirationDate"
              value={form.expirationDate}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-[#81203D]"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Tipo de usuario</label>
            <select
              name="userType"
              value={form.userType}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-[#81203D]"
            >
              <option value="INDIVIDUAL">Individual</option>
              <option value="EMPRESARIAL">Empresarial</option>
            </select>
          </div>

          <div>
          <label className="text-sm font-semibold">Imagen del producto</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border px-4 py-2 rounded-lg text-sm"
          />
          {uploading ? (
            <p className="text-sm mt-2 text-[#81203D]">Subiendo imagen...</p>
          ) : form.image ? (
            <img
              src={form.image}
              alt="Vista previa"
              className="mt-3 rounded-lg h-40 object-cover w-full border"
            />
          ) : (
            <div className="w-full h-40 mt-3 flex items-center justify-center bg-gray-100 rounded-lg text-gray-400 border">
              Sin imagen
            </div>
          )}
        </div>

        </div>


        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded text-sm hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#81203D] text-white px-4 py-2 rounded text-sm hover:bg-[#9c2c53]"
          >
            💾 Guardar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
