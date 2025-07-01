import React from 'react';
import InventoryHistoryCard from '../components/InventoryHistoryCard';
import type { InventoryChange } from "../types/Inventory";

interface InventoryHistoryProps {
  changes: InventoryChange[];
}

const InventoryHistory: React.FC<InventoryHistoryProps> = ({ changes }) => {
  const sortedChanges = [...changes].sort((a, b) => 
    new Date(b.changeDate).getTime() - new Date(a.changeDate).getTime()
  );

  if (changes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">📋</div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Sin cambios registrados</h3>
        <p className="text-gray-500">Los cambios en el inventario aparecerán aquí</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Historial de Cambios</h2>
        <div className="bg-gray-100 px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-gray-600">
            {changes.length} {changes.length === 1 ? 'cambio' : 'cambios'}
          </span>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {sortedChanges.map((change) => (
          <InventoryHistoryCard key={change.id} change={change} />
        ))}
      </div>
    </div>
  );
};

export default InventoryHistory;