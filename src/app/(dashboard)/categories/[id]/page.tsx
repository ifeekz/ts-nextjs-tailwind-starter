import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { categories } from '@/data/categories';

import { CategoryForm } from '../_components/category-form';

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = categories.find((category) => category.id === params.id);

  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found',
    };
  }

  return {
    title: `Edit ${category.name}`,
    description: `Edit category: ${category.name}`,
  };
}

export default function EditCategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((category) => category.id === params.id);

  if (!category) {
    notFound();
  }

  return (
    <div className='container p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md'>
      <div className='flex flex-col gap-6'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Edit category</h1>
          <p className='text-muted-foreground'>
            Update details for {category.name}
          </p>
        </div>
        <CategoryForm category={category} />
      </div>
    </div>
  );
}
