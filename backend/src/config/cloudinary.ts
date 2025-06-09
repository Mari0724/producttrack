import dotenv from "dotenv";
import path from "path";

// Cargar dotenv de forma absoluta
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import { v2 as cloudinary } from "cloudinary";

console.log("🔍 CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME); // debe imprimir

cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
api_key: process.env.CLOUDINARY_API_KEY!,
api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export default cloudinary;