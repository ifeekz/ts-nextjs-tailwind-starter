import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';

import { ProductStatus } from '@/components/product-status';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getInitials } from '@/lib/helper';
import type { Product } from '@/types/product';

import { ProductActions } from './product-actions';

export const columns: ColumnDef<Product>[] = [
  {
    id: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const images = row.original.images;
      const title = row.original.title;

      const imageUrl =
        Array.isArray(images) && images.length > 0 ? images[0] : null;

      return (
        <div className='flex items-center'>
          <Avatar className='h-10 w-10 rounded-md'>
            {imageUrl && (
              <AvatarImage
                src={imageUrl}
                alt={title}
                className='object-cover'
              />
            )}
            <AvatarFallback className='rounded-md bg-muted text-xs font-semibold'>
              {getInitials(title)}
            </AvatarFallback>
          </Avatar>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Product
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className='flex flex-col'>
          <Link
            href={`/products/${row.original.id}`}
            className='font-medium hover:underline'
          >
            {row.getValue('title')}
          </Link>
          <span className='text-xs text-muted-foreground'>
            SKU: {row.original.sku}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return <ProductStatus status={row.getValue('status')} />;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Category
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const category = row.original.category;

      return (
        <div className='text-sm'>
          {category?.name ?? (
            <span className='text-muted-foreground italic'>Uncategorized</span>
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const categoryName = row.original.category?.name;
      return categoryName ? value.includes(categoryName) : false;
    },
  },
  {
    accessorKey: 'averagePrice',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='justify-end'
        >
          Avg. Price
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.original.averagePrice;

      if (price === null || price === undefined || price <= 0) {
        return <div className='text-right text-muted-foreground italic'>—</div>;
      }

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);

      return <div className='text-right font-medium'>{formatted}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ProductActions product={row.original} />,
  },
];
