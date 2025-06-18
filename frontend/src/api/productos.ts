import type { Product } from '../types/Product';
import axiosInstance from '../utils/axiosInstance';

export const getProductos = () =>
  axiosInstance.get<Product[]>('/Productos');

export const crearProducto = (data: Product) =>
  axiosInstance.post<Product>('/Productos', data);

export const editarProducto = (id: number, data: Partial<Product>) =>
  axiosInstance.put(`/Productos/${id}`, data);

export const eliminarProducto = (id: number) =>
  axiosInstance.delete(`/Productos/${id}`);
