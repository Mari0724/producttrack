import { useState } from 'react';
import ImageUpload from './ImageUpload';
import ProcessingState from './ProcessingState';
import NutritionCard from './NutritionCard';
import ManualSearch from './ManualSearch';
import { ShoppingBasket, Search, RotateCcw, ImagePlus } from 'lucide-react';

interface NutritionData {
  food: string;
  calories?: number;
  nutritionInfo: string; // GPT-generated paragraph
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
    console.log('Imagen seleccionada:', imageUrl);
  };

  const handleAnalyzeImage = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);
    setHasError(false);
    console.log('Iniciando análisis de imagen...');

    setTimeout(() => {
      const shouldError = Math.random() < 0.3;

      if (shouldError) {
        setHasError(true);
        setIsProcessing(false);
        console.log('Error en el análisis de imagen');
      } else {
        const mockData: NutritionData = {
          food: "Ensalada mixta con pollo",
          calories: 245,
          nutritionInfo: "Esta ensalada mixta con pollo es una excelente opción saludable que aporta 245 calorías por porción. Es rica en proteínas de alta calidad gracias al pollo, que ayuda en la construcción y reparación muscular. Las verduras frescas proporcionan vitaminas, minerales y fibra dietética esencial para una buena digestión. El contenido de grasas es moderado y proviene principalmente de fuentes saludables como el aceite de oliva usado en el aderezo. Esta comida es ideal para quienes buscan mantener un peso saludable mientras obtienen nutrientes esenciales."
        };

        setNutritionData(mockData);
        setIsProcessing(false);
        console.log('Análisis completado:', mockData);
      }
    }, 3000);
  };

  const handleManualSearch = async (productName: string) => {
    setIsProcessing(true);
    console.log('Buscando información para:', productName);

    setTimeout(() => {
      const mockData: NutritionData = {
        food: productName,
        calories: 180,
        nutritionInfo: `${productName} es un alimento nutritivo que aporta aproximadamente 180 calorías por porción estándar. Contiene una buena combinación de macronutrientes que incluyen proteínas para el mantenimiento muscular, carbohidratos para energía y grasas esenciales. También proporciona vitaminas y minerales importantes para el funcionamiento óptimo del organismo. Es recomendable consumirlo como parte de una dieta balanceada y variada.`
      };

      setNutritionData(mockData);
      setIsProcessing(false);
      setHasError(false);
      console.log('Búsqueda manual completada:', mockData);
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
          <div className="flex justify-center mb-4">
            <ShoppingBasket size={48} className="text-wine-red" />
          </div>
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
                <h3 className="text-xl font-semibold text-wine-red mb-4 font-poppins">
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
                    className="bg-olive-green hover:bg-olive-green/90 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200 font-poppins flex items-center gap-2"
                  >
                    <Search className="w-5 h-5" />
                    Analizar Imagen
                  </button>
                  <button
                    onClick={handleReset}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200 font-poppins flex items-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
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
                  className="bg-wine-red hover:bg-wine-red/90 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200 font-poppins flex items-center gap-2"
                >
                  <ImagePlus className="w-5 h-5" />
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
