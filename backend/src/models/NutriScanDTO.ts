export interface NutriScanDTO {
  usuarioId: number;
  esAlimento: boolean;
  consulta: string; // Texto OCR
  respuesta: any;   // JSON de GPT
  tipoAnalisis: "ocr-gpt-only" | "ocr-openfoodfacts-gpt";
}
