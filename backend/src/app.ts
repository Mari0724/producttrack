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

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ⛔ bodyParser no maneja multipart/form-data, pero no lo elimines
app.use(bodyParser.json());

// 👇 Coloca rutas manuales antes de RegisterRoutes
app.use('/', nutriscanOCRRoutes);

// 👇 Luego rutas generadas por tsoa
RegisterRoutes(app);

// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
