import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error("❌ Faltan variables de entorno de Cloudinary. Verifica tu archivo .env");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Configuración actual compatible con las typings modernas
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'producttrack/perfiles',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
      transformation: [{ width: 500, height: 500, crop: 'limit' }],
    };
  },
});

export const upload = multer({ storage });
