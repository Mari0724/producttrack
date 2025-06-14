import { useState } from 'react';
import ImageUpload from './ImageUpload.tsx';
import ProcessingState from './ProcessingState.tsx';
import NutritionCard from './NutritionCard.tsx';
import ManualSearch from './ManualSearch';
import { Search, RotateCcw, ImagePlus, ShoppingBasket  } from 'lucide-react'; // Íconos

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

const FoodAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [hasError, setHasError] = useState(false);

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setNutritionData(null);
    setHasError(false);
  };

  const handleAnalyzeImage = async () => {
    if (!selectedImage) return;
    setIsProcessing(true);
    setHasError(false);

    setTimeout(() => {
      const shouldError = Math.random() < 0.3;
      if (shouldError) {
        setHasError(true);
        setIsProcessing(false);
      } else {
        const mockData: NutritionData = {
          food: 'Frijoles enlatados',
          calories: 245,
          protein: 28,
          carbs: 12,
          fat: 8,
          fiber: 4,
          sugar: 6,
          sodium: 320,
        };
        setNutritionData(mockData);
        setIsProcessing(false);
      }
    }, 3000);
  };

  const handleManualSearch = async (productName: string) => {
    setIsProcessing(true);

    setTimeout(() => {
      const mockData: NutritionData = {
        food: productName,
        calories: 180,
        protein: 15,
        carbs: 20,
        fat: 5,
        fiber: 3,
        sugar: 8,
        sodium: 250,
      };
      setNutritionData(mockData);
      setIsProcessing(false);
      setHasError(false);
    }, 2000);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setNutritionData(null);
    setIsProcessing(false);
    setHasError(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-olive-green/10 to-food-yellow/10 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
            <ShoppingBasket className="mx-auto w-12 h-12 text-wine-red mb-2" />
            <h1 className="text-4xl md:text-5xl font-bold text-wine-red mb-2 font-poppins">
                NutriScan
            </h1>
            <p className="text-lg text-gray-600 font-poppins">
                Analiza la información nutricional de tus alimentos con inteligencia artificial
            </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {!selectedImage && !isProcessing && !nutritionData && !hasError && (
            <ImageUpload onImageSelect={handleImageSelect} />
          )}

          {selectedImage && !isProcessing && !nutritionData && !hasError && (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-light-gray">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-black mb-4 font-poppins">
                  Imagen seleccionada
                </h3>
                <div className="mb-6">
                  <img
                    src={selectedImage}
                    alt="Comida seleccionada"
                    className="max-w-full h-64 object-cover rounded-lg mx-auto border-2 border-light-gray"
                  />
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleAnalyzeImage}
                    className="bg-olive-green hover:bg-olive-green/90 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200 font-poppins"
                  >
                    <Search className="inline-block w-5 h-5 mr-2 -mt-1" />
                    Analizar Imagen
                  </button>
                  <button
                    onClick={handleReset}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200 font-poppins"
                  >
                    <RotateCcw className="inline-block w-5 h-5 mr-2 -mt-1" />
                    Cambiar Imagen
                  </button>
                </div>
              </div>
            </div>
          )}

          {isProcessing && <ProcessingState />}

          {hasError && !isProcessing && (
            <ManualSearch onSearch={handleManualSearch} onReset={handleReset} />
          )}

          {nutritionData && (
            <div className="space-y-6">
              <NutritionCard data={nutritionData} />
              <div className="text-center">
                <button
                  onClick={handleReset}
                  className="bg-wine-red hover:bg-wine-red/90 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200 font-poppins"
                >
                  <ImagePlus className="inline-block w-5 h-5 mr-2 -mt-1" />
                  Analizar Nueva Imagen
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodAnalyzer;
