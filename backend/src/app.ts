import dotenv from "dotenv";
dotenv.config();

import cors from 'cors';
import "reflect-metadata";
import express from 'express';
import bodyParser from 'body-parser';
import { RegisterRoutes } from "../src/routes/routes"; // este se genera automáticamente
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json";


const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

//Middlewares
app.use(bodyParser.json());

RegisterRoutes(app);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Aquí más adelante puedes agregar tus rutas

export default app;