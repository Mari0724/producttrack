

export interface HistorialInventarioDTO {
  id: number;
  productoId: number;
  nombreProducto: string;
  accion: AccionHistorial;
  cantidad_anterior: number;
  cantidad_nueva: number;
  precio_anterior: number;
  precio_nuevo: number;
  fechaCambio: Date;
}
