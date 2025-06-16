import FoodAnalyzer from "../components/FoodAnalyzer";
import axios from "axios";

const NutriScan = () => {
  // Función que analiza una imagen enviándola al backend
  const analizarImagen = async (base64: string, token: string): Promise<unknown> => {
    try {
      const response = await axios.post(
        "http://localhost:3000/nutriscan",
        {
          respuesta: {
            base64: base64, // lo que espera el backend
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("🔎 Respuesta de NutriScan:", response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error en respuesta del servidor:", error.response?.data || error.message);
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
