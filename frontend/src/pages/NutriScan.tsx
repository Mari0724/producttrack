import type { RespuestaNutriScan } from "../components/FoodAnalyzer";
import FoodAnalyzer from "../components/FoodAnalyzer";
import axios from "axios";

const NutriScan = () => {
  const analizarImagen = async (
    entrada: string,
    token: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
   _nombreManual?: string // <- lo agregas así aunque no lo uses
  ): Promise<RespuestaNutriScan> => {
    try {
      const isBase64 = entrada.startsWith("data:image");
      const formData = new FormData();

      if (isBase64) {
        const blob = await fetch(entrada).then((res) => res.blob());
        const archivo = new File([blob], "imagen.jpg", { type: "image/jpeg" });
        formData.append("imagen", archivo);
        formData.append("tipoAnalisis", "ocr-gpt-only");
        formData.append("usuarioId", "1"); // opcional si lo infieres del token
      } else {
        throw new Error("Esta versión solo acepta imágenes en base64.");
      }

      const response = await axios.post(
        "http://localhost:3000/api/ocr/nutriscan-ocr",
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

  const confirmarConsulta = async (
    registroId: number,
    nombreProducto: string,
    token: string
  ): Promise<RespuestaNutriScan> => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/ocr/confirmar-nombre",
        {
          registroId,
          nombreProducto,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Confirmación enviada:", response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error en confirmación:", error.response?.data || error.message);
      } else {
        console.error("Error desconocido:", error);
      }
      throw error;
    }
  };

  return (
    <div className="w-full h-full">
      <FoodAnalyzer
        analizarImagen={analizarImagen}
        confirmarConsulta={confirmarConsulta}
      />
    </div>
  );
};

export default NutriScan;
