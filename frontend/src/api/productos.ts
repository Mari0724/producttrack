import axios from 'axios';
import type { Product } from '../types/Product';

const API_URL = 'http://localhost:3000';

const token = localStorage.getItem("token");

const authHeader = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

export const getProductos = () => axios.get<Product[]>(`${API_URL}/Productos`);

export const crearProducto = (data: Product) =>
  axios.post<Product>(`${API_URL}/Productos`, data, authHeader);

export const editarProducto = (id: number, data: Partial<Product>) =>
  axios.put(`${API_URL}/Productos/${id}`, data, authHeader);

export const eliminarProducto = (id: number) =>
  axios.delete(`${API_URL}/Productos/${id}`, authHeader);
