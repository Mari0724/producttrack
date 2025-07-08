import express from 'express';
import { uploadProductos } from '../middleware/allCloudinaryUploads';
import { extraerTextoDesdeImagen, confirmarNombreManual } from '../controllers/ocr.controller';

const router = express.Router();

// 📌 OCR por imagen (con uploadProductos en memoria)
router.post('/nutriscan-ocr', uploadProductos.single('imagen'), extraerTextoDesdeImagen);

// 📌 Confirmar nombre manual
router.post('/confirmar-nombre', confirmarNombreManual);

export default router;