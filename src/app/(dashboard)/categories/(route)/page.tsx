import { Plus } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { CategoryTable } from './_components/category-table';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Manage your product categories',
};

export default function CategoriesPage() {
  return (
    <div className='container p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md'>
      <div className='flex flex-col gap-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>Categories</h1>
            <p className='text-muted-foreground'>
              Manage and organize your product categories
            </p>
          </div>
          <Button asChild>
            <Link href='/categories/create'>
              <Plus className='mr-2 h-4 w-4' />
              Add Category
            </Link>
          </Button>
        </div>
        <CategoryTable />
      </div>
    </div>
  );
}
