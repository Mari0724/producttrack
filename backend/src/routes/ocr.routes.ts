// src/routes/ocr.routes.ts
import express, { Request, Response } from 'express';
import { upload } from '../middleware/upload';
import { createOcrClient } from '../utils/ocr';
import prisma from '../utils/prismaClient';

const router = express.Router();

router.post('/nutriscan-ocr', upload.single('imagen'), async (req: Request, res: Response) => {
  try {
    const { usuarioId, tipoAnalisis = 'ocr-gpt-only' } = req.body;

    if (!req.file || !req.file.path || !req.file['path']) {
      return void res.status(400).json({ message: 'No se subió imagen' });
    }

    const cloudinaryUrl = req.file.path as string;

    const texto = await createOcrClient(cloudinaryUrl);

    const nuevoRegistro = await prisma.nutriScan.create({
      data: {
        consulta: texto,
        usuarioId: Number(usuarioId),
        esAlimento: false,
        respuesta: {},
        tipoAnalisis,
      },
    });

    res.status(201).json(nuevoRegistro);
  } catch (error) {
    console.error('Error en NutriScan OCR:', error);
    res.status(500).json({ message: 'Error al procesar imagen o guardar datos' });
  }
});

export default router;
