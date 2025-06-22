import React from 'react'
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'

interface ProductActionsProps {
  onEdit: () => void
  onDelete: () => void
  onView: () => void
}

const ProductActions: React.FC<ProductActionsProps> = ({ onEdit, onDelete, onView }) => {
  return (
    <div className="flex gap-3 pt-3 text-white">
      <button
        onClick={onEdit}
        className="flex items-center gap-1 bg-[#81203D] hover:bg-[#60162F] px-3 py-1.5 rounded-lg text-sm"
      >
        <FaEdit /> Editar
      </button>
      <button
        onClick={onDelete}
        className="flex items-center gap-1 bg-[#FFBA00] hover:bg-[#E6A700] px-3 py-1.5 rounded-lg text-sm text-black"
      >
        <FaTrash /> Eliminar
      </button>
      <button
        onClick={onView}
        className="flex items-center gap-1 bg-[#405057] hover:bg-[#303D42] px-3 py-1.5 rounded-lg text-sm"
      >
        <FaEye /> Ver más
      </button>
    </div>
  )
}

export default ProductActions
