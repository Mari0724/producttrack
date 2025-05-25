import express from 'express';
import bodyParser from 'body-parser';
import "reflect-metadata";
import { RegisterRoutes } from "../src/routes/routes"; // este se genera automáticamente
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json";

const app = express();

//middleware
app.use(bodyParser.json());

RegisterRoutes(app);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//aqui mas adelante se pueden agregar rutas




export default app;