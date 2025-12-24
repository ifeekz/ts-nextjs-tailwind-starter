'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { DataTableFacetedFilter } from '@/components/data-table-faceted-filter';
import { DataTablePagination } from '@/components/data-table-pagination';
import { DataTableViewOptions } from '@/components/data-table-view-options';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDebounce } from '@/hooks/use-debounce';
import { getFilterValue } from '@/lib/helper';
import { getCategories } from '@/services/category';
import { getProducts } from '@/services/product';

import { columns } from './columns';

export function ProductsDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(20);
  const [search, setSearch] = React.useState('');
  const debouncedSearch = useDebounce(search, 400);
  const statusFilter = getFilterValue(columnFilters, 'status');
  const categoryFilter = getFilterValue<string>(columnFilters, 'category');

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const { data, isLoading } = useQuery({
    queryKey: [
      'products',
      page,
      limit,
      debouncedSearch,
      statusFilter,
      categoryFilter,
    ],
    queryFn: () =>
      getProducts({
        page,
        limit,
        search: debouncedSearch || undefined,
        status: statusFilter,
        category: categoryFilter,
      }),
    placeholderData: keepPreviousData,
    staleTime: 5000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const categoryOptions =
    categories?.map((cat) => ({
      label: cat.name,
      value: cat.id, // IMPORTANT: UUID
    })) ?? [];

  const table = useReactTable({
    data: data?.results ?? [],
    columns,
    manualPagination: true,
    pageCount: data?.paginator?.pageCount ?? 0,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: page - 1,
        pageSize: limit,
      },
    },

    onPaginationChange: (updater) => {
      const next =
        typeof updater === 'function'
          ? updater({ pageIndex: page - 1, pageSize: limit })
          : updater;

      setPage(next.pageIndex + 1);
      setLimit(next.pageSize);
    },

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  React.useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter, categoryFilter]);

  return (
    <div className='space-y-4'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex flex-1 items-center space-x-2'>
          <Input
            placeholder='Search products...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='max-w-sm'
          />
          <div className='flex flex-wrap gap-2'>
            {table.getColumn('status') && (
              <DataTableFacetedFilter
                column={table.getColumn('status')}
                title='Status'
                options={[
                  { label: 'Published', value: 'published' },
                  { label: 'Draft', value: 'draft' },
                  { label: 'Archived', value: 'archived' },
                ]}
              />
            )}
            {table.getColumn('category') && categoryOptions.length > 0 && (
              <DataTableFacetedFilter
                column={table.getColumn('category')}
                title='Category'
                options={categoryOptions}
              />
            )}
            {/* Reset filters button */}
            {table.getState().columnFilters.length > 0 && (
              <Button
                variant='ghost'
                onClick={() => table.resetColumnFilters()}
                className='h-8 px-2 lg:px-3'
              >
                Reset
              </Button>
            )}
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <DataTableViewOptions table={table} />
          <Button asChild>
            <Link href='/products/create'>
              <Plus className='mr-2 h-4 w-4' />
              Add Product
            </Link>
          </Button>
        </div>
      </div>
      <Card>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} isLoading={isLoading} />
      </Card>
    </div>
  );
}
