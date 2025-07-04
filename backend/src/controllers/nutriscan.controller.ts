import { Controller, Route, Tags, Post, Get, Put, Delete, Body, Path, SuccessResponse, Response, Security, Request } from "tsoa";

import { NutriScanService } from "../services/nutriscan.service";
import {
  NutriScanSchemaWithoutUserId,
  NutriScanUpdateSchema,
} from "../models/NutriScanModel";

@Route("nutriscan")
@Tags("NutriScan")
export class NutriScanController extends Controller {
  private service = new NutriScanService();

  // Crear análisis
  @SuccessResponse("201", "Registro creado")
  @Response("400", "Datos inválidos")
  @Response("403", "Acceso denegado")
  @Security("jwt")
  @Post()
  async create(@Body() body: unknown, @Request() req: unknown) {
    const usuario = (req as any).user;

    const puedeUsarNutriScan =
      usuario.tipoUsuario === "INDIVIDUAL" ||
      usuario.rol === "ADMIN" ||
      usuario.rol === "DESARROLLADOR";

    if (!puedeUsarNutriScan) {
      this.setStatus(403);
      return { message: "Acceso denegado: No tienes permiso para usar NutriScan." };
    }

    try {
      const parsedBody = NutriScanSchemaWithoutUserId.parse(body);
      const isTest = usuario.rol === "DESARROLLADOR";

      const created = await this.service.create(parsedBody, usuario.id, isTest);
      this.setStatus(201);
      return created;
    } catch (error: unknown) {
      this.setStatus(400);
      return {
        message:
          error instanceof Error
            ? error.message
            : "Ocurrió un error al procesar la solicitud.",
      };
    }
  }

  @Security("jwt")
  @Get()
  async findAll(@Request() req: unknown) {
    const usuario = (req as any).user;

    if (usuario.rol === "ADMIN") {
      return this.service.findAll();
    }

    if (usuario.rol === "DESARROLLADOR") {
      return this.service.findTestsByUser(usuario.id);
    }

    this.setStatus(403);
    return {
      message: "Acceso denegado: solo disponible para auditoría o pruebas.",
    };
  }

  @Security("jwt")
  @Get("usuario/{usuarioId}")
  async findByUserId(@Path() usuarioId: number, @Request() req: unknown) {
    const usuario = (req as any).user;

    if (usuario.rol !== "ADMIN") {
      this.setStatus(403);
      return { message: "Acceso denegado: solo disponible para auditoría." };
    }

    return this.service.findByUserId(usuarioId);
  }

  // ✅ Actualizar un análisis
  @Security("jwt")
  @Put("{id}")
  @Response("400", "Datos inválidos")
  async update(@Path() id: number, @Body() body: unknown, @Request() req: unknown) {
    const usuario = (req as any).user;

    if (usuario.rol !== "ADMIN") {
      this.setStatus(403);
      return { message: "Acceso denegado: solo disponible para auditoría." };
    }

    try {
      const parsedBody = NutriScanUpdateSchema.parse(body);
      return await this.service.update(id, parsedBody);
    } catch (error: unknown) {
      this.setStatus(400);
      return {
        message:
          error instanceof Error
            ? error.message
            : "Ocurrió un error al actualizar el análisis.",
      };
    }
  }

  @Security("jwt")
  @Delete("{id}")
  async delete(@Path() id: number, @Request() req: unknown) {
    const usuario = (req as any).user;

    if (usuario.rol !== "ADMIN") {
      this.setStatus(403);
      return { message: "Acceso denegado: solo disponible para auditoría." };
    }

    return this.service.delete(id);
  }
}