import dotenv from 'dotenv';
import path from 'path';

// Cargar dotenv desde ruta absoluta
dotenv.config({ path: path.resolve(__dirname, '../../.env') });