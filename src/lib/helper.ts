import { ColumnFiltersState } from '@tanstack/react-table';

export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
}

export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}

export const getInitials = (text: string) =>
  text
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export function getFilterValue<T = string>(
  filters: ColumnFiltersState,
  id: string,
): T[] | undefined {
  const f = filters.find((f) => f.id === id);
  return Array.isArray(f?.value) ? (f.value as T[]) : undefined;
}
