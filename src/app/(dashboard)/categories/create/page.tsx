import type { Metadata } from 'next';

import { CategoryForm } from '../_components/category-form';

export const metadata: Metadata = {
  title: 'Create Category',
  description: 'Add a new product category',
};

export default function CreateCategoryPage() {
  return (
    <div className='container p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md'>
      <div className='flex flex-col gap-6'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Create category</h1>
          <p className='text-muted-foreground'>
            Add a new product category to your store
          </p>
        </div>
        <CategoryForm />
      </div>
    </div>
  );
}
