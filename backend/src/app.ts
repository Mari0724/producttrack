import './config/env';
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

import { uploadProductos } from './middleware/allCloudinaryUploads';
import './utils/cronJobs';

const app = express();

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// CORS config
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));

// 🧠 Middleware Body Parser
app.use(bodyParser.json({ limit: "3mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "3mb" }));

// 🔍 Rutas manuales primero
app.use('/api/ocr', nutriscanOCRRoutes);
app.use("/api", userRoutes);

// 📄 Rutas generadas por tsoa
RegisterRoutes(app);

// 📁 Swagger docs (instancia limpia)
const swaggerFilePath = path.join(__dirname, "../docs/swagger.json");
const swaggerRaw = fs.readFileSync(swaggerFilePath, "utf8");
const swaggerData = JSON.parse(JSON.stringify(JSON.parse(swaggerRaw)));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerData));

// 🖼 Ruta para subida de imágenes
app.post('/upload', uploadProductos.single('image'), (req: MulterRequest, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: 'No se subió ningún archivo' });
    return;
  }

  res.json({
    message: 'Imagen subida con éxito',
    url: req.file.path,
    public_id: req.file.filename,
  });
});


app.get('/', (req: Request, res: Response) => {
  res.json({"ms": "BIenvenido a mi aplicación para ver el Swagger agregue en la barra de navegaciòn /docs"});
});

export default app;
