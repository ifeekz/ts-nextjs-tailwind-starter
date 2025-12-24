// services/category.ts
import axios from 'axios';

import type { IApiPaginationResponse, IApiResponse } from '@/types/api';
import type { Category } from '@/types/category';

export const getCategories = async () => {
  const { data } = await axios.get<IApiPaginationResponse<Category>>(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/categories`,
    {
      params: {
        page: 1,
        limit: 100, // enough for filters
      },
    },
  );

  return data.data.results;
};

export const getCategory = async (id: string): Promise<Category | null> => {
  const { data } = await axios.get<IApiResponse<Category>>(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/categories/${id}`,
  );
  return data?.data ?? null;
};
