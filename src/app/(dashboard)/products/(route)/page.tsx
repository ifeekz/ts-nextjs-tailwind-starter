import type { Metadata } from 'next';

import { ProductsDataTable } from './_components/products-data-table';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Manage your product inventory',
};

export default function ProductsPage() {
  return (
    <div className='container p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md'>
      <div className='flex flex-col gap-6'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Products</h1>
          <p className='text-muted-foreground'>Manage your product inventory</p>
        </div>
        <ProductsDataTable />
      </div>
    </div>
  );
}
