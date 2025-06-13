import './config/env';

import cors from 'cors';
import "reflect-metadata";
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json";
import { RegisterRoutes } from "../src/routes/routes";
import nutriscanOCRRoutes from './routes/ocr.routes';

const app = express();

// CORS config
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// bodyParser para JSON
app.use(bodyParser.json());

// 📌 Rutas OCR manuales primero, bajo /api/ocr
app.use('/api/ocr', nutriscanOCRRoutes);

// 📌 Luego las rutas generadas por tsoa
RegisterRoutes(app);

// Swagger docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
