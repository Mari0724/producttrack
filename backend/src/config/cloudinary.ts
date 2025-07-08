import dotenv from 'dotenv';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// ✅ Cargar variables de entorno (solo si aún no están cargadas)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// ✅ Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// ✅ Función para subir imagen manualmente
export const subirImagenCloudinary = async (filePath: string) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'productos',
    });
    return result.secure_url;
  } catch (error) {
    console.error('Error al subir imagen a Cloudinary:', error);
    throw new Error('No se pudo subir la imagen');
  }
};

// ✅ Storage para multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'productos',
      format: 'jpg',
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

// ✅ Exportaciones ordenadas
export { cloudinary, storage };
