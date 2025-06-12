import express from 'express';
import { uploadMemory } from '../middleware/uploadMemory'; // <-- este
import { extraerTextoDesdeImagen } from '../controllers/ocr.controller';

const router = express.Router();

// ✅ Aquí cambiamos a memoryStorage para OCR
router.post('/nutriscan-ocr', uploadMemory.single('imagen'), extraerTextoDesdeImagen);

export default router;
