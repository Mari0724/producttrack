import './config/env';
import fs from "fs";
import path from "path";

import cors from 'cors';
import "reflect-metadata";
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from "swagger-ui-express";

import { RegisterRoutes } from "../src/routes/routes";
import nutriscanOCRRoutes from './routes/ocr.routes';
import userRoutes from "./routes/user.routes";

const app = express();

// CORS config
app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// bodyParser para JSON
app.use(bodyParser.json({ limit: "3mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "3mb" }));


// 📌 Rutas OCR manuales primero, bajo /api/ocr
app.use('/api/ocr', nutriscanOCRRoutes);
app.use("/api", userRoutes);

// 📌 Luego las rutas generadas por tsoa
RegisterRoutes(app);

// Swagger docs
const swaggerFilePath = path.join(__dirname, "../docs/swagger.json");
const swaggerRaw = fs.readFileSync(swaggerFilePath, "utf8");
const swaggerData = JSON.parse(JSON.stringify(JSON.parse(swaggerRaw))); // forzamos instancia nueva

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerData));

export default app;
