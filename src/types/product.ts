import type { MiniCategory } from './category';

export interface Variant {
  option1?: string;
  option2?: string;
  option3?: string;
  price?: number;
  sku?: string;
  quantity?: number;
}

export interface VariantOption {
  name: string;
  values: string[];
}

export type Product = {
  id: string;
  title: string;
  description: string;
  category: MiniCategory;
  sku?: string;
  images: string[];
  averagePrice?: number;
  status: 'draft' | 'published' | 'archived';
  variants?: Variant[];
  variantOptions?: VariantOption[];
  inventoryCount?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type ShoppingListProduct = {
  product: Product;
  quantity: number;
};

export type ProductPayload = Omit<
  Product,
  'id' | 'category' | 'createdAt' | 'updatedAt'
> & { category: string };

export interface GetProductsParams {
  page: number;
  limit: number;
  search?: string;
  status?: string[];
  category?: string[]; // UUID strings
}
