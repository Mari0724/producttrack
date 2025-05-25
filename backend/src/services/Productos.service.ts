import prisma from '../utils/prismaClient';
import { ProductosDTO } from '../models/ProductosDTO';
import { EstadoProducto } from "@prisma/client";

// 🔍 Obtener productos con filtros
export const getAllProductos = async (filters: any) => {
  const where: any = {};

  // Filtrar por ID
  if (filters.productoId) {
    where.id = Number(filters.productoId);
  }

  // Filtrar por nombre (búsqueda parcial)
  if (filters.nombre) {
    where.nombre = {
      contains: filters.nombre,
      mode: "insensitive",
    };
  }

  // Filtrar por categoría exacta
  if (filters.categoria) {
    where.categoria = filters.categoria;
  }

  // Filtrar por estado (enum)
  if (filters.estado) {
    where.estado = filters.estado as EstadoProducto;
  }

  // Filtrar por usuarioId
  if (filters.usuarioId) {
    where.usuarioId = Number(filters.usuarioId);
  }

  // Rango de fecha de adquisición
  if (filters.fechaAdquisicionDesde || filters.fechaAdquisicionHasta) {
    where.fechaAdquisicion = {};
    if (filters.fechaAdquisicionDesde) {
      where.fechaAdquisicion.gte = new Date(filters.fechaAdquisicionDesde);
    }
    if (filters.fechaAdquisicionHasta) {
      where.fechaAdquisicion.lte = new Date(filters.fechaAdquisicionHasta);
    }
  }

  // Rango de fecha de vencimiento
  if (filters.fechaVencimientoDesde || filters.fechaVencimientoHasta) {
    where.fechaVencimiento = {};
    if (filters.fechaVencimientoDesde) {
      where.fechaVencimiento.gte = new Date(filters.fechaVencimientoDesde);
    }
    if (filters.fechaVencimientoHasta) {
      where.fechaVencimiento.lte = new Date(filters.fechaVencimientoHasta);
    }
  }

  return await prisma.productos.findMany({
    where,
    orderBy: {
      fechaAdquisicion: "desc",
    },
  });
};

// 🔍 Obtener producto por ID
export async function getProductoById(id: number) {
  return await prisma.productos.findUnique({
    where: { id: id },
  });
}

// 📂 Obtener categorías únicas
export async function getCategoriasUnicas(): Promise<string[]> {
  try {
    // 👇 Tipamos explícitamente el tipo que devuelve el findMany
    const categorias: { categoria: string | null }[] = await prisma.productos.findMany({
      select: {
        categoria: true,
      },
      distinct: ['categoria'],
      where: {
        categoria: {
          not: null,
        },
      },
    });

    // Filtrar para que TypeScript entienda que no hay nulls
    return categorias
      .map((c) => c.categoria)
      .filter((c): c is string => c !== null);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw error;
  }
}

// 📂 Obtener productos por categoría
export async function getProductosPorCategoria(categoria: string) {
  try {
    return await prisma.productos.findMany({
      where: {
        categoria: {
          equals: categoria,
          mode: "insensitive", // opcional: ignora mayúsculas/minúsculas
        },
      },
    });
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error);
    throw error;
  }
}

// 🆕 Crear producto con conversiones de tipo
export async function createProducto(data: ProductosDTO) {
  try {
    return await prisma.productos.create({
      data: {
        codigoBarras: data.codigoBarras,
        codigoQR: data.codigoQR,
        nombre: data.nombre,
        descripcion: data.descripcion,
        cantidad: data.cantidad,
        precio: parseFloat(data.precio),
        fechaAdquisicion: new Date(data.fechaAdquisicion),
        fechaVencimiento: new Date(data.fechaVencimiento),
        usuarioId: data.usuarioId,
        estado: data.estado, // ✅ esto es lo correcto
        imagen: data.imagen,
        categoria: data.categoria,
      },
    });
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw error;
  }
}

// ✏️ Actualizar producto
export async function updateProducto(id: number, data: Partial<ProductosDTO>) {
  const producto = await prisma.productos.findUnique({
    where: { id: id },
  });

  if (!producto) throw new Error("Producto no encontrado");

  return await prisma.productos.update({
    where: { id: id },
    data: {
      ...(data.precio && { precio: parseFloat(data.precio) }),
      ...(data.fechaAdquisicion && { fechaAdquisicion: new Date(data.fechaAdquisicion) }),
      ...(data.fechaVencimiento && { fechaVencimiento: new Date(data.fechaVencimiento) }),
      ...(data.nombre && { nombre: data.nombre }),
      ...(data.descripcion && { descripcion: data.descripcion }),
      ...(data.cantidad && { cantidad: data.cantidad }),
      ...(data.usuarioId && { usuarioId: data.usuarioId }),
      ...(data.estado && { estado: data.estado }),
      ...(data.codigoBarras && { codigoBarras: data.codigoBarras }),
      ...(data.codigoQR && { codigoQR: data.codigoQR }),
      ...(data.imagen && { imagen: data.imagen }),
      updatedAt: new Date(),
    },
  });
}

// ❌ Eliminar (soft delete)
export async function deleteProducto(id: number) {
  const producto = await prisma.productos.findUnique({
    where: { id: id },
  });

  if (!producto) throw new Error("Producto no encontrado");

  return await prisma.productos.update({
    where: { id: id },
    data: {
      eliminadoEn: new Date(),
      updatedAt: new Date(),
    },
  });
}
