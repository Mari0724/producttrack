import React from 'react';

interface NutritionData {
  food: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

interface NutritionCardProps {
  data: NutritionData;
}

const NutritionCard: React.FC<NutritionCardProps> = ({ data }) => {
  const nutritionItems = [
    { label: 'Proteínas', value: data.protein, unit: 'g', color: 'bg-wine-red', emoji: '💪' },
    { label: 'Carbohidratos', value: data.carbs, unit: 'g', color: 'bg-food-yellow', emoji: '🍞' },
    { label: 'Grasas', value: data.fat, unit: 'g', color: 'bg-olive-green', emoji: '🥑' },
    { label: 'Fibra', value: data.fiber, unit: 'g', color: 'bg-green-600', emoji: '🌾' },
    { label: 'Azúcares', value: data.sugar, unit: 'g', color: 'bg-orange-500', emoji: '🍯' },
    { label: 'Sodio', value: data.sodium, unit: 'mg', color: 'bg-gray-500', emoji: '🧂' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-light-gray overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-olive-green to-food-yellow p-6 text-white">
        <div className="text-center">
          <div className="text-4xl mb-2">🍽️</div>
          <h3 className="text-2xl font-bold font-poppins">{data.food}</h3>
          <div className="mt-4 bg-white/20 rounded-lg p-3 inline-block">
            <div className="text-3xl font-bold">{data.calories}</div>
            <div className="text-sm">calorías</div>
          </div>
        </div>
      </div>

      {/* Nutrition Grid */}
      <div className="p-6">
        <h4 className="text-lg font-semibold text-olive-green mb-4 font-poppins text-center">
          Información Nutricional (por porción)
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {nutritionItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-4 text-center border border-light-gray hover:shadow-md transition-shadow duration-200"
            >
              <div className="text-2xl mb-2">{item.emoji}</div>
              <div className="text-sm text-gray-600 font-poppins mb-1">{item.label}</div>
              <div className="font-bold text-lg text-gray-800 font-poppins">
                {item.value}{item.unit}
              </div>
              <div className={`h-2 ${item.color} rounded-full mt-2 mx-auto`} style={{ width: '60%' }}></div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-6 p-4 bg-food-yellow/10 rounded-xl border border-food-yellow/20">
          <p className="text-sm text-gray-600 text-center font-poppins">
            ℹ️ Los valores nutricionales son aproximados y pueden variar según la preparación y los ingredientes específicos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NutritionCard;