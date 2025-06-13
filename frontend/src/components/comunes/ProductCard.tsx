import React, { useState } from 'react'
import ProductActions from './ProductActions'
import { BadgeCheck, CalendarDays } from 'lucide-react'

interface ProductCardProps {
  name: string;
  category: string;
  stock: number;
  expirationDate: string;
  userType: 'INDIVIDUAL' | 'EMPRESARIAL';
  image: string;
  onView?: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  category,
  stock,
  expirationDate,
  userType,
  image,
  onView,
  onEdit,
  onDelete
}) => {
  const [showDetails, setShowDetails] = useState(false)

  const isLowStock = userType === 'EMPRESARIAL' ? stock <= 30 : stock <= 1

  const getStockStyle = () => {
    return isLowStock
      ? 'bg-red-100 text-red-700 border border-red-300'
      : 'bg-green-100 text-green-700 border border-green-300'
  }

  const handleView = () => {
    if (onView) {
      onView() // ✅ Esto lo define el padre (por ejemplo Inventario.tsx)
    } else {
      console.log('Ver más no hace nada porque no hay acción definida')
    }
  }


  return (
    <>
      <div className="rounded-2xl bg-[#FFF5F7] p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 space-y-3 w-full">
        {image && (
          <img
            src={image}
            alt={name}
            className="w-full h-40 object-cover rounded-xl border border-gray-200"
          />
        )}

        <h3
          onClick={() => setShowDetails(!showDetails)}
          className="text-xl font-semibold text-[#81203D] cursor-pointer hover:underline"
        >
          {name}
        </h3>

        {showDetails && (
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-[#81203D]" />
              <p><strong>Categoría:</strong> {category}</p>
            </div>

            <div className={`inline-flex items-center gap-2 text-xs px-2 py-1 rounded-lg ${getStockStyle()}`}>
              Stock: {stock}
              {isLowStock && <span className="font-semibold ml-1">¡Bajo!</span>}
            </div>

            <div className="flex items-center gap-2 text-sm">
              <CalendarDays className="w-4 h-4 text-[#81203D]" />
              <p><strong>Vence:</strong> {expirationDate}</p>
            </div>

            <ProductActions
              onEdit={onEdit}
              onDelete={onDelete}
              onView={handleView}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default ProductCard
