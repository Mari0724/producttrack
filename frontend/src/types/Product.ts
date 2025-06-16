export interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  expirationDate: string;
  userType: 'INDIVIDUAL' | 'EMPRESARIAL';
  image: string;
}