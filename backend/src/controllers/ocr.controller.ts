import { obtenerUrlPreprocesada, cloudinaryUploadBuffer } from '../utils/cloudinary';
import { createOcrClient } from '../utils/ocr';
import {
  limpiarTextoOCR,
  palabraMasLarga,
  corregirErroresOCR,
  obtenerCandidatosProductos,
  elegirMejorResultado,
} from '../utils/texto';
import { Request, Response } from 'express';
import { OpenFoodFactsService } from '../services/openfoodfacts.service';
import { GPTService } from '../services/gpt.service';
import prisma from '../utils/prismaClient';
import { preprocesarImagen } from '../utils/preprocesarImagen';

export const extraerTextoDesdeImagen = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    const { usuarioId, tipoAnalisis = 'ocr-gpt-only' } = req.body;

    console.log('📦 File recibido:', file);

    if (!file) {
      res.status(400).json({ message: 'No se envió ninguna imagen' });
      return;
    }

    // 📌 Preprocesar imagen directamente en buffer
    const preprocessedBuffer = await preprocesarImagen(file.buffer);
    console.log('✅ Imagen preprocesada en buffer');

    let textoExtraido: string;
    let imageUrl: string;

    if (tipoAnalisis === 'ocr-gpt-only') {
      // 📤 Subir imagen preprocesada a Cloudinary
      const uploadResult: any = await cloudinaryUploadBuffer(preprocessedBuffer, 'producttrack/ocr');
      imageUrl = obtenerUrlPreprocesada(uploadResult.public_id);
      console.log('📷 Imagen subida a Cloudinary:', imageUrl);

      // 📖 OCR desde URL en Cloudinary
      textoExtraido = await createOcrClient(imageUrl);
    } else {
      // 📖 OCR desde buffer directamente no se puede con Tesseract.js, se necesita archivo o URL
      res.status(400).json({ message: 'Solo se permite OCR desde Cloudinary en esta versión' });
      return;
    }

    if (!textoExtraido.trim()) {
      res.status(400).json({ mensaje: 'No se pudo extraer texto de la imagen' });
      return;
    }

    console.log('📝 Texto detectado por OCR:', textoExtraido);

    const textoLimpio = limpiarTextoOCR(textoExtraido);
    const textoCorregido = corregirErroresOCR(textoLimpio);
    const candidatos = obtenerCandidatosProductos(textoCorregido);
    const nombreProducto = candidatos.length > 0
      ? candidatos[0]
      : palabraMasLarga(textoCorregido);

    console.log('🍽️ Nombre de producto usado:', nombreProducto);

    const esAlimento = true;
    let openFoodFactsResultados = [];

    if (esAlimento) {
      openFoodFactsResultados = await OpenFoodFactsService.buscarAlimentoPorNombre(nombreProducto);
    }

    const mejorResultado = elegirMejorResultado(openFoodFactsResultados, textoCorregido);
    const mensajeGPT = await GPTService.generarMensajeNutricional(nombreProducto, mejorResultado ? [mejorResultado] : []);

    const nuevoRegistro = await prisma.nutriScan.create({
      data: {
        consulta: textoExtraido,
        usuarioId: Number(usuarioId),
        esAlimento,
        respuesta: {
          openFoodFacts: mejorResultado || (openFoodFactsResultados.length > 0 ? openFoodFactsResultados[0] : {}),
          mensajeGPT,
        },
        tipoAnalisis,
      },
    });

    res.status(201).json({
      mensaje: 'Análisis completado',
      registro: nuevoRegistro,
      resultadoOpenFoodFacts: mejorResultado,
      mensajeGPT,
    });

  } catch (error: any) {
    console.error('❌ Error en OCR:', error);
    res.status(500).json({ message: 'Error interno: ' + (error.message || JSON.stringify(error)) });
  }
};
