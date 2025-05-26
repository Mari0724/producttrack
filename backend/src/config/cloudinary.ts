import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const subirImagenCloudinary = async (filePath: string) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "productos",
    });
    return result.secure_url; // Esto es lo que guardaremos en la BD
  } catch (error) {
    console.error("Error al subir imagen a Cloudinary:", error);
    throw new Error("No se pudo subir la imagen");
  }
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'productos', // carpeta en tu Cloudinary
      format: 'jpg', // opcional, o usa file.originalname.split('.').pop()
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

export { cloudinary, storage };