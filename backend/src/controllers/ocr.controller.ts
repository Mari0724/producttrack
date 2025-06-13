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

// 📌 Endpoint principal OCR con extracción y análisis
export const extraerTextoDesdeImagen = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    const { usuarioId, tipoAnalisis = 'ocr-gpt-only' } = req.body;

    console.log('📦 File recibido:', file);

    if (!file) {
      res.status(400).json({ message: 'No se envió ninguna imagen' });
      return;
    }

    const preprocessedBuffer = await preprocesarImagen(file.buffer);
    console.log('✅ Imagen preprocesada en buffer');

    let textoExtraido: string;
    let imageUrl: string;

    if (tipoAnalisis === 'ocr-gpt-only') {
      const uploadResult: any = await cloudinaryUploadBuffer(preprocessedBuffer, 'producttrack/ocr');
      imageUrl = obtenerUrlPreprocesada(uploadResult.public_id);
      console.log('📷 Imagen subida a Cloudinary:', imageUrl);

      textoExtraido = await createOcrClient(imageUrl);
    } else {
      res.status(400).json({ message: 'Solo se permite OCR desde Cloudinary en esta versión' });
      return;
    }

    if (!textoExtraido.trim()) {
      res.status(400).json({ mensaje: 'No se pudo extraer texto de la imagen' });
      return;
    }

    console.log('📝 Texto detectado por OCR:', textoExtraido);

    // Limpiar texto OCR para asegurar consulta fiable
    const textoLimpio = limpiarTextoOCR(textoExtraido);
    console.log('🧹 Texto limpio:', textoLimpio);

    const textoCorregido = corregirErroresOCR(textoLimpio);
    console.log('🔧 Texto corregido:', textoCorregido);

    const candidatos = obtenerCandidatosProductos(textoCorregido);
    console.log('🎯 Candidatos detectados:', candidatos);

    let nombreProducto = '';
    let requiereConfirmacion = false;

    if (candidatos.length > 0) {
      nombreProducto = candidatos[0];
    } else {
      // Si no hay candidatos, intenta usar al menos el texto limpio completo para buscar
      nombreProducto = textoCorregido;
      requiereConfirmacion = true;
    }

    console.log('🍽️ Nombre de producto usado para consulta:', nombreProducto || 'Ninguno');

    const esAlimento = true;
    let openFoodFactsResultados = [];

    if (esAlimento) {
      openFoodFactsResultados = await OpenFoodFactsService.buscarAlimentoPorNombre(nombreProducto);
      console.log('📦 Resultados OpenFoodFacts:', openFoodFactsResultados);
    }


    const mejorResultado = elegirMejorResultado(openFoodFactsResultados, textoCorregido);
    const mensajeGPT = await GPTService.generarMensajeNutricional(
      nombreProducto || 'Producto desconocido',
      mejorResultado ? [mejorResultado] : []
    );

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
      mensaje: requiereConfirmacion
        ? 'No se reconoció un nombre claro de producto. Por favor confirma o escribe uno manualmente.'
        : 'Análisis completado',
      registro: nuevoRegistro,
      resultadoOpenFoodFacts: mejorResultado,
      mensajeGPT,
      requiereConfirmacion,
      sugerencia: nombreProducto || null,
    });
  } catch (error: any) {
    console.error('❌ Error en OCR:', error);
    res.status(500).json({ message: 'Error interno: ' + (error.message || JSON.stringify(error)) });
  }
};

// 📌 Nuevo endpoint: confirmar nombre manual y actualizar registro existente
export const confirmarNombreManual = async (req: Request, res: Response): Promise<void> => {
  try {
    const { registroId, nombreProducto, tipoAnalisis = 'manual' } = req.body;

    if (!registroId) {
      res.status(400).json({ message: 'Falta el registroId.' });
      return;
    }

    if (!nombreProducto || !nombreProducto.trim()) {
      res.status(400).json({ message: 'Debes proporcionar un nombre de producto válido.' });
      return;
    }

    // ⚙️ Buscar alimento en OpenFoodFacts
    const openFoodFactsResultados = await OpenFoodFactsService.buscarAlimentoPorNombre(nombreProducto);
    const mejorResultado = elegirMejorResultado(openFoodFactsResultados, nombreProducto);

    // ⚙️ Generar mensaje GPT
    const mensajeGPT = await GPTService.generarMensajeNutricional(
      nombreProducto,
      mejorResultado ? [mejorResultado] : []
    );

    // 📌 Actualizar registro existente
    const registroActualizado = await prisma.nutriScan.update({
      where: { id: Number(registroId) },
      data: {
        consulta: nombreProducto,
        tipoAnalisis,
        respuesta: {
          set: {
            openFoodFacts: mejorResultado || (openFoodFactsResultados.length > 0 ? openFoodFactsResultados[0] : {}),
            mensajeGPT,
          },
        },
        actualizadoEn: new Date(),
      },
    });

    res.status(200).json({
      mensaje: 'Análisis manual completado',
      registro: registroActualizado,
      resultadoOpenFoodFacts: mejorResultado,
      mensajeGPT,
    });

  } catch (error: any) {
    console.error('❌ Error en confirmación manual:', error);
    res.status(500).json({ message: 'Error interno: ' + (error.message || JSON.stringify(error)) });
  }
};

