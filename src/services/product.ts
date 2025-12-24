import axios from 'axios';

import type {
  IApiPaginationResponse,
  IApiPaginationResult,
  IApiResponse,
} from '@/types/api';
import type { GetProductsParams, Product } from '@/types/product';

export const searchProducts = async (
  search: string,
  limit: number = 5,
): Promise<IApiResponse<Product[]>> => {
  const { data } = await axios.get<IApiResponse<Product[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/products/search/vector?q=${search}&limit=${limit}`,
  );

  return data;
};

export const getProducts = async (
  params: GetProductsParams,
): Promise<IApiPaginationResult<Product>> => {
  const { data } = await axios.get<IApiPaginationResponse<Product>>(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/products`,
    {
      params,
      paramsSerializer: {
        indexes: false,
        // status=draft&status=published (FastAPI friendly)
      },
    },
  );

  return data.data;
};

export const getProduct = async (id: string): Promise<Product | null> => {
  const { data } = await axios.get<IApiResponse<Product>>(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/products/${id}`,
  );
  return data?.data ?? null;
};
