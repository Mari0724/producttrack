// EstadoProducto posible: "DISPONIBLE" | "AGOTADO" | etc. (según los valores reales del backend)
export type EstadoProducto = 'DISPONIBLE' | 'AGOTADO' | 'RESERVADO' | 'VENCIDO';

export interface Product {
  id?: number;
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
  usuario?: {
    tipoUsuario: 'INDIVIDUAL' | 'EMPRESARIAL';
  };
}
