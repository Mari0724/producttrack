// pages/NutriScan.tsx
import type { RespuestaNutriScan } from "../components/FoodAnalyzer";
import FoodAnalyzer from "../components/FoodAnalyzer";
import axios from "axios";

const NutriScan = () => {
  const analizarImagen = async (
    entrada: string, // base64
    token: string
  ): Promise<RespuestaNutriScan> => {
    try {
      const isBase64 = entrada.startsWith("data:image");
      const formData = new FormData();

      if (isBase64) {
        const blob = await fetch(entrada).then((res) => res.blob());
        const archivo = new File([blob], "imagen.jpg", { type: "image/jpeg" });
        formData.append("imagen", archivo);
        formData.append("tipoAnalisis", "ocr-gpt-only");
        formData.append("usuarioId", "1"); // si lo tomas del token, puedes omitirlo en body
      } else {
        throw new Error("Esta versión solo acepta imágenes en base64.");
      }

      const response = await axios.post(
        "http://localhost:3000/api/ocr/nutriscan-ocr", // tu endpoint real
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("✅ Respuesta de OCR:", response.data);
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
