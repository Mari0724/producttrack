import { createOcrClient } from '../utils/ocr';
import { Request, Response } from 'express';

export const extraerTextoDesdeImagen = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No se envió ninguna imagen' });
    }

    const texto = await createOcrClient(file.path); // <-- Usa el nombre correcto
    res.json({ texto });
  } catch (error) {
    console.error('Error en OCR:', error);
    res.status(500).json({ message: 'Error al procesar imagen con OCR' });
  }
};
