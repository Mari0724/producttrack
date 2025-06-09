// src/utils/ocr.ts
import Tesseract from 'tesseract.js';

export async function createOcrClient(imageUrl: string): Promise<string> {
  const result = await Tesseract.recognize(imageUrl, 'eng');
  return result.data.text;
}
