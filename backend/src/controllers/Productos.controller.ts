import { Body, Controller, Delete, Get, Path, Post, Put, Query, Route,SuccessResponse, Response, Tags } from "tsoa";
import { ProductosDTO } from "../models/ProductosDTO";
import { zodValidate } from "../utils/zodValidate";
import { productoSchema } from "../models/ProductosModel";
import { getAllProductos, getProductoById, createProducto, updateProducto, deleteProducto, } from "../services/Productos.service";
import { getCategoriasUnicas } from "../services/Productos.service";
import {getProductosPorCategoria,} from "../services/Productos.service";

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
        ...(fechaAdquisicionHasta && { lte: new Date(fechaAdquisicionHasta) }),
      };
    }

    if (fechaVencimientoDesde || fechaVencimientoHasta) {
      filters.fechaVencimiento = {
        ...(fechaVencimientoDesde && { gte: new Date(fechaVencimientoDesde) }),
        ...(fechaVencimientoHasta && { lte: new Date(fechaVencimientoHasta) }),
      };
    }

    return await getAllProductos(filters);
  }

  // ✅ Obtener categorías únicas
  @Get("/categorias")
  public async obtenerCategorias(): Promise<string[]> {
    try {
      return await getCategoriasUnicas();
    } catch (error) {
      this.setStatus(500);
      return [];
    }
  }

  // ✅ Obtener por categoría
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

  // ✅ Obtener por ID
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
  @Post("/")
  public async create(@Body() requestBody: ProductosDTO): Promise<any> {
    console.log("➡️ Request body recibido:", requestBody);
    const parsed = zodValidate(productoSchema, requestBody);

    if (!parsed.success) {
      console.log("❌ Error de validación:", parsed.error);
      this.setStatus(400);
      return {
        message: "Datos inválidos",
        detalles: parsed.error,
      };
    }

    try {
      const nuevoProducto = await createProducto(parsed.data);
      this.setStatus(201);
      return {
        message: "Producto creado correctamente",
        data: nuevoProducto,
      };
    } catch (error) {
      console.error("🚨 Error al crear producto:", error);
      this.setStatus(500);
      return { message: "Error interno al crear el producto" };
    }
  }

  // ✅ Actualizar producto
  @Put("/{id}")
  public async updateProducto(
    @Path() id: number,
    @Body() body: Partial<ProductosDTO>
  ): Promise<{ message: string; detalles?: any }> {
    const parsed = zodValidate(productoSchema.partial(), body);

    if (!parsed.success) {
      this.setStatus(400);
      return {
        message: "Datos inválidos",
        detalles: parsed.error,
      };
    }

    try {
      await updateProducto(id, parsed.data);
      return { message: "Producto actualizado correctamente" };
    } catch (error) {
      console.error("🚨 Error al actualizar:", error);
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
  public async deleteProducto(@Path() id: number): Promise<{ message: string }> {
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