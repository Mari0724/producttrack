import { EstadoProducto } from "@prisma/client";

export interface ProductosDTO {
    id?: number; // ✅ para que TSOA lo permita
    codigoBarras: string;
    codigoQR: string;
    nombre: string;
    descripcion: string;
    cantidad: number;
    precio: number;
    fechaAdquisicion: string;
    fechaVencimiento: string;
    usuarioId: number;
    estado: EstadoProducto;
    imagen: string;
    categoria?: string;
}