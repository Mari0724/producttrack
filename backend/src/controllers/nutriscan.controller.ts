import {
  Controller,
  Route,
  Tags,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Path,
  SuccessResponse,
  Response,
  Security,
  Request,
} from "tsoa";

import { NutriScanService } from "../services/nutriscan.service";
import { NutriScanSchema } from "../models/NutriScanModel";

@Route("nutriscan")
@Tags("NutriScan")
export class NutriScanController extends Controller {
  private service = new NutriScanService();

  // ✅ Crea un nuevo análisis nutricional con validación de roles
  @SuccessResponse("201", "Registro creado")
  @Response("400", "Datos inválidos")
  @Response("403", "Acceso denegado")
  @Security("jwt")
  @Post()
  async create(@Body() body: unknown, @Request() req: any) {
    const usuario = req.user;

    const puedeUsarNutriScan =
      usuario.tipoUsuario === "INDIVIDUAL" ||
      usuario.rol === "ADMIN" ||
      usuario.rol === "DESARROLLADOR";

    if (!puedeUsarNutriScan) {
      this.setStatus(403);
      return { message: "Acceso denegado: No tienes permiso para usar NutriScan." };
    }

    try {
      const created = await this.service.create(body);
      this.setStatus(201);
      return created;
    } catch (error: any) {
      this.setStatus(400);
      return { message: error.message };
    }
  }

  // 🔍 Retorna todos los análisis registrados
  @Get()
  async findAll() {
    return this.service.findAll();
  }

  // 🔍 Retorna un análisis por su ID
  @Get("{id}")
  async findById(@Path() id: number) {
    return this.service.findById(id);
  }

  // ✏️ Actualiza un análisis por ID
  @Put("{id}")
  @Response("400", "Datos inválidos")
  async update(@Path() id: number, @Body() body: unknown) {
    try {
      return await this.service.update(id, body);
    } catch (error: any) {
      this.setStatus(400);
      return { message: error.message };
    }
  }

  // 🗑️ Elimina un análisis por ID
  @Delete("{id}")
  async delete(@Path() id: number) {
    return this.service.delete(id);
  }
}
