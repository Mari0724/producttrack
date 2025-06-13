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

  // ✅ Crear análisis nutricional (solo INDIVIDUAL, ADMIN y DESARROLLADOR)
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
      const isTest = usuario.rol === "DESARROLLADOR"; // solo desarrollador guarda como prueba
      const created = await this.service.create(body, usuario.id, isTest);
      this.setStatus(201);
      return created;
    } catch (error: any) {
      this.setStatus(400);
      return { message: error.message || 'Ocurrió un error al procesar la solicitud.' };
    }
  }

  // ✅ Solo ADMIN y DESARROLLADOR pueden listar análisis de auditoría
  @Security("jwt")
  @Get()
  async findAll(@Request() req: any) {
    const usuario = req.user;

    if (usuario.rol === "ADMIN") {
      return this.service.findTestsOnly();
    }

    if (usuario.rol === "DESARROLLADOR") {
      return this.service.findTestsByUser(usuario.id);
    }

    this.setStatus(403);
    return { message: "Acceso denegado: solo disponible para auditoría o pruebas." };
  }

  // ✅ Buscar por ID — accesible solo a ADMIN
  @Security("jwt")
  @Get("{id}")
  async findById(@Path() id: number, @Request() req: any) {
    const usuario = req.user;

    if (usuario.rol !== "ADMIN") {
      this.setStatus(403);
      return { message: "Acceso denegado: solo disponible para auditoría." };
    }

    return this.service.findById(id);
  }

  // ✅ Actualizar — solo ADMIN
  @Security("jwt")
  @Put("{id}")
  @Response("400", "Datos inválidos")
  async update(@Path() id: number, @Body() body: unknown, @Request() req: any) {
    const usuario = req.user;

    if (usuario.rol !== "ADMIN") {
      this.setStatus(403);
      return { message: "Acceso denegado: solo disponible para auditoría." };
    }

    try {
      return await this.service.update(id, body);
    } catch (error: any) {
      this.setStatus(400);
      return { message: error.message || 'Ocurrió un error al actualizar el análisis.' };
    }
  }

  // ✅ Eliminar — solo ADMIN
  @Security("jwt")
  @Delete("{id}")
  async delete(@Path() id: number, @Request() req: any) {
    const usuario = req.user;

    if (usuario.rol !== "ADMIN") {
      this.setStatus(403);
      return { message: "Acceso denegado: solo disponible para auditoría." };
    }

    return this.service.delete(id);
  }
}
