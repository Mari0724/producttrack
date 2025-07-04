// 🌱 Variables de entorno
import './config/env'; // <-- usa el de tu compañera si ya centralizaron config
// Si no tienes un archivo env.ts, puedes usar: import dotenv from "dotenv"; dotenv.config();

import fs from "fs";
import path from "path";
import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import "reflect-metadata";

import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "../src/routes/routes";
import nutriscanOCRRoutes from './routes/ocr.routes';
import userRoutes from "./routes/user.routes";
import { upload } from './middleware/upload'; // para /upload
import './utils/cronJobs'; // tus tareas programadas

const app = express();

// Middleware general
app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(bodyParser.json()); // por compatibilidad
app.use((req, res, next) => {
  console.log("📦 Body recibido:", req.body);
  next();
});

// 🧠 Rutas manuales
app.use('/api/ocr', nutriscanOCRRoutes);
app.use("/api", userRoutes);

// 🧩 Rutas generadas por tsoa
RegisterRoutes(app);

// 📸 Ruta de subida de imágenes
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

app.post('/upload', upload.single('image'), function (req: Request, res: Response): void {
  const file = req.file as Express.Multer.File;

  if (!file) {
    res.status(400).json({ error: 'No se subió ningún archivo' });
    return;
  }

  res.status(200).json({
    message: 'Imagen subida con éxito',
    url: file.path,
    public_id: file.filename,
  });
});

// 📚 Documentación Swagger
const swaggerFilePath = path.join(__dirname, "../docs/swagger.json");
const swaggerRaw = fs.readFileSync(swaggerFilePath, "utf8");
const swaggerData = JSON.parse(JSON.stringify(JSON.parse(swaggerRaw))); // forzamos instancia nueva
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerData));

export default app;
