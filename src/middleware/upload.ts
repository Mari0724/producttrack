import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de Cloudinary con variables de entorno
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuración de almacenamiento con Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'producttrack/perfiles', // Carpeta en Cloudinary (no necesitas crearla en Visual)
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }],
    } as any, 
});

// Middleware de Multer
export const upload = multer({ storage });
