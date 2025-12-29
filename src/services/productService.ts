import api from "../lib/api";

export interface Product {
  productCode: string;
  name: string;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>("/api/products");
  return response.data;
};
