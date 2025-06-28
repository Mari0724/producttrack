import prisma from '../utils/prismaClient';
import { Body, Controller, Delete, Get, Path, Put, Query, Security, Request, Res, Route, Post, SuccessResponse, Response, Tags } from "tsoa";
import { ProductosDTO } from "../models/ProductosDTO";
import { zodValidate } from "../utils/zodValidate";
import { productoSchema } from "../models/ProductosModel";
import {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  getCategoriasUnicas,
  getCantidadPorCategoria,
  getProductosPorCategoria,
  getCantidadPorRangoPrecio,
  obtenerNombresProductosUsuario
} from "../services/productos.service";
import {
  ResponseMessage,
  ResponseMessageWithData
} from "../interfaces/ResponseMenssage";
import { AuthenticatedRequest } from "../types/express";
import { puede } from "../utils/checkPermissions";
import { Middlewares } from "tsoa";
import { autenticarToken } from "../middleware/token.middleware";

@Route("/Productos")
@Tags("Productos")
export class ProductosController extends Controller {
  // 🔍 Obtener productos con filtros
  @Get("/")
  public async getAll(
    @Query() nombre?: string,
    @Query() categoria?: string,
    @Query() estado?: string,
    @Query() fechaAdquisicionDesde?: string,
    @Query() fechaAdquisicionHasta?: string,
    @Query() fechaVencimientoDesde?: string,
    @Query() fechaVencimientoHasta?: string,
    @Query() usuarioId?: number
  ): Promise<any[]> {
    const filters: any = {};

    if (nombre) filters.nombre = nombre;
    if (categoria) filters.categoria = categoria;
    if (estado) filters.estado = estado;
    if (usuarioId) filters.usuarioId = usuarioId;

    if (fechaAdquisicionDesde || fechaAdquisicionHasta) {
      filters.fechaAdquisicion = {
        ...(fechaAdquisicionDesde && { gte: new Date(fechaAdquisicionDesde) }),
        ...(fechaAdquisicionHasta && { lte: new Date(fechaAdquisicionHasta) })
      };
    }

    if (fechaVencimientoDesde || fechaVencimientoHasta) {
      filters.fechaVencimiento = {
        ...(fechaVencimientoDesde && { gte: new Date(fechaVencimientoDesde) }),
        ...(fechaVencimientoHasta && { lte: new Date(fechaVencimientoHasta) })
      };
    }

    return await getAllProductos(filters);
  }

  // ✅ Obtener categorías únicas
  @Get("/categorias")
  public async obtenerCategorias(
    @Query() tipoUsuario?: string
  ): Promise<string[] | ResponseMessage> {
    try {
      if (!tipoUsuario) {
        this.setStatus(400);
        return { message: "Se requiere el tipoUsuario para obtener las categorías." };
      }

      const categorias = await getCategoriasUnicas(tipoUsuario);
      return categorias;
    } catch (error) {
      console.error("🚨 Error al obtener categorías:", error);
      this.setStatus(500);
      return { message: "Error interno al obtener categorías" };
    }
  }

  // ✅ Obtener productos por categoría
  @Get("/por-categoria")
  public async getByCategoria(@Query() categoria: string): Promise<any> {
    if (!categoria?.trim()) {
      this.setStatus(400);
      return { message: "La categoría es requerida" };
    }

    try {
      const productos = await getProductosPorCategoria(categoria);
      if (!productos.length) {
        this.setStatus(404);
        return { message: "No se encontraron productos en esa categoría" };
      }

      return productos;
    } catch (error) {
      console.error(error);
      this.setStatus(500);
      return { message: "Error al obtener productos por categoría" };
    }
  }

  // ✅ Devuelve los nombres de los productos del usuario
  @Get('/nombres/:idUsuario')
  public async getNombresProductosDelUsuario(@Path() idUsuario: number) {
    const productos = await prisma.productos.findMany({
      where: { usuarioId: idUsuario, eliminadoEn: null },
      select: { nombre: true },
    });

    return productos.map(p => p.nombre); // 👈 debe devolver solo los nombres
  }

  // ✅ Cantidad de productos por categoría
  @Get("/cantidad-por-categoria")
  public async getCantidadPorCategoria(): Promise<any> {
    try {
      const resultados = await getCantidadPorCategoria();
      return resultados.map((item) => ({
        categoria: item.categoria ?? "Sin categoría",
        cantidad: item._count.id
      }));
    } catch (error) {
      console.error("🚨 Error al obtener cantidades:", error);
      this.setStatus(500);
      return { message: "Error interno al obtener cantidades por categoría" };
    }
  }

  // ✅ Cantidad de productos por rango de precio
  @Get("/cantidad-por-rango-precio")
  public async getCantidadPorRangoPrecio(): Promise<any> {
    try {
      const resultados = await getCantidadPorRangoPrecio();
      return Object.entries(resultados).map(([rango, cantidad]) => ({
        rango,
        cantidad
      }));
    } catch (error) {
      console.error("🚨 Error al obtener cantidades por precio:", error);
      this.setStatus(500);
      return { message: "Error interno al obtener cantidades por rango de precio" };
    }
  }

  // ✅ Obtener producto por ID
  @Get("/{id}")
  public async getById(@Path() id: string): Promise<any> {
    const numericId = Number(id);

    if (isNaN(numericId) || numericId <= 0) {
      this.setStatus(400);
      return { message: "ID inválido" };
    }

    const producto = await getProductoById(numericId);
    if (!producto) {
      this.setStatus(404);
      return { message: "Producto no encontrado" };
    }

    return producto;
  }

  // ✅ Crear producto
  @SuccessResponse("201", "Producto creado correctamente")
  @Response("400", "Datos inválidos")
  @Security("jwt")
  @Middlewares([autenticarToken])
  @Post("/")
  public async create(
    @Request() req: AuthenticatedRequest,
    @Body() requestBody: ProductosDTO
  ): Promise<ResponseMessageWithData<any> | ResponseMessage> {
    const rol = req.user?.rol;

    if (!rol || !puede("crear", rol)) {
      this.setStatus(403);
      return { message: "No tienes permiso para crear productos." };
    }

    const parsed = zodValidate(productoSchema, requestBody);
    if (!parsed.success) {
      this.setStatus(400);
      return {
        message: "Datos inválidos",
        detalles: parsed.error
      };
    }

    try {
      const nuevoProducto = await createProducto({
        ...parsed.data,
        precio: Number(parsed.data.precio),
      });
      this.setStatus(201);
      return {
        message: "Producto creado correctamente",
        data: nuevoProducto
      };
    } catch (error) {
      console.error("🚨 Error al crear producto:", error);
      this.setStatus(500);
      return { message: "Error interno al crear el producto" };
    }
  }

  // ✅ Actualizar producto
  @Put("/{id}")
  @Security("jwt")
  @Middlewares([autenticarToken])
  public async updateProducto(
    @Request() req: AuthenticatedRequest,
    @Path() id: number,
    @Body() body: Partial<ProductosDTO>
  ): Promise<ResponseMessage> {
    const rol = req.user?.rol;

    if (!rol || !puede("editar", rol)) {
      this.setStatus(403);
      return { message: "No tienes permiso para editar productos." };
    }
    const { id: _, ...bodySinId } = body; // quitar id antes de validar

    const parsed = zodValidate(productoSchema.partial(), body);

    if (!parsed.success) {
      console.error("❌ Errores de validación Zod:", parsed.error.flatten());

      this.setStatus(400);
      return {
        message: "Datos inválidos",
        detalles: parsed.error.flatten(), // ✅ ahora esto funciona bien
      };
    }

    try {
      console.log("🔧 Datos recibidos para actualización:", parsed.data);

      const { precio, ...resto } = parsed.data;

      await updateProducto(id, {
        ...resto,
        ...(precio !== undefined && { precio: Number(precio) }),
      });

      return { message: "Producto actualizado correctamente" };
    } catch (error) {
      console.error("🚨 Error al actualizar producto:", JSON.stringify(error, null, 2));
      console.error("🔍 Detalle completo:", error);
      if (error instanceof Error && error.message.includes("no encontrado")) {
        this.setStatus(404);
        return { message: "Producto no encontrado" };
      }

      this.setStatus(500);
      return { message: "Error al actualizar producto" };
    }

  }

  // ✅ Eliminar producto
  @Delete("/{id}")
  @Security("jwt")
  @Middlewares([autenticarToken])
  public async deleteProducto(
    @Request() req: AuthenticatedRequest,
    @Path() id: number
  ): Promise<ResponseMessage> {
    const rol = req.user?.rol;

    if (!rol || !puede("eliminar", rol)) {
      this.setStatus(403);
      return { message: "No tienes permiso para eliminar productos." };
    }

    try {
      await deleteProducto(id);
      return { message: "Producto eliminado correctamente" };
    } catch (error) {
      console.error("🚨 Error al eliminar:", error);
      if (error instanceof Error && error.message.includes("no encontrado")) {
        this.setStatus(404);
        return { message: "Producto no encontrado" };
      }

      this.setStatus(500);
      return { message: "Error al eliminar producto" };
    }
  }
}
