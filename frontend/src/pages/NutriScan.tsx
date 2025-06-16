import FoodAnalyzer from "../components/FoodAnalyzer";
import axios from "axios";

const NutriScan = () => {
  // Función que analiza una imagen enviándola al backend
  const analizarImagen = async (base64: string, token: string): Promise<unknown> => {
    try {
      const response = await axios.post(
        "http://localhost:3000/nutriscan/analizar",
        { imagen: base64 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error al analizar imagen:", error.message);
      } else {
        console.error("Error desconocido:", error);
      }
      throw error;
    }
  };

  return (
    <div className="w-full h-full">
      <FoodAnalyzer analizarImagen={analizarImagen} />
    </div>
  );
};

export default NutriScan;
