import type { Metadata } from 'next';

import ProductForm from './_components/product-form';

export const metadata: Metadata = {
  title: 'Create Product',
  description: 'Add a new product to your store',
};

export default function CreateProductPage() {
  return (
    <div className='container p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md'>
      <div className='flex flex-col gap-6'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Create product</h1>
          <p className='text-muted-foreground'>
            Add a new product to your store inventory
          </p>
        </div>
        <ProductForm />
      </div>
    </div>
  );
}
