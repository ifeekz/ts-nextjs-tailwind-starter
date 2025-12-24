import type { AxiosError } from 'axios';

// Base response without data
export interface IBaseResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export interface IPaginationMeta {
  totalCount?: number;
  perPage?: number;
  pageCount?: number;
  currentPage?: number;
  slNo?: number;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
  prev?: string | boolean;
  next?: string | boolean;
}

export interface IApiResponse<T> extends IBaseResponse {
  data: T | null;
}

export interface IApiPaginationResult<T> {
  results: T[];
  paginator: IPaginationMeta;
}

export interface IApiPaginationResponse<T> extends IBaseResponse {
  data: {
    results: T[];
    paginator: IPaginationMeta;
  };
}

interface ApiErrorResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export type TypedAxiosError = AxiosError<ApiErrorResponse>;
