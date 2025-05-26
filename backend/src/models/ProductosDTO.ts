import { EstadoProducto } from "@prisma/client";

export interface ProductosDTO {
    codigoBarras: string;
    codigoQR: string;
    nombre: string;
    descripcion: string;
    cantidad: number;
    precio: string;
    fechaAdquisicion: string;
    fechaVencimiento: string;
    usuarioId: number;
    estado: EstadoProducto;
    imagen: string;
    categoria?: string;
}