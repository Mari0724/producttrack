import dotenv from "dotenv";

dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import "reflect-metadata";
import { RegisterRoutes } from "../src/routes/routes"; // este se genera automáticamente
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json";
import { upload } from './middleware/upload';
import { Request, Response } from 'express';

const app = express();

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

//middleware
app.use(bodyParser.json());

RegisterRoutes(app);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Aquí agregamos la nueva ruta para subir imágenes

app.post('/upload', upload.single('image'), (req: MulterRequest, res: Response) => {
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

export default app;