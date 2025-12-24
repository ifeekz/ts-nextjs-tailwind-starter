'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Product } from '@/types/product';

interface ProductTabsProps {
  product: Product; // In a real app, you would use a proper type
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs defaultValue='description' className='w-full'>
      <TabsList className='grid w-full grid-cols-3 md:w-auto'>
        <TabsTrigger value='description'>Description</TabsTrigger>
        <TabsTrigger value='specifications'>Specifications</TabsTrigger>
        <TabsTrigger value='reviews'>Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value='description' className='py-4'>
        <div className='space-y-4'>
          <h3 className='text-lg font-medium'>Product Description</h3>
          <div className='prose max-w-none'>
            <p>{product.description}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <h4>Features</h4>
            <ul>
              <li>High-quality materials</li>
              <li>Durable construction</li>
              <li>Versatile design</li>
              <li>Easy to clean and maintain</li>
              <li>Comfortable fit</li>
            </ul>
          </div>
        </div>
      </TabsContent>
      <TabsContent value='specifications' className='py-4'>
        <div className='space-y-4'>
          <h3 className='text-lg font-medium'>Product Specifications</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[200px]'>Specification</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product.specifications?.map((spec: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className='font-medium'>{spec.name}</TableCell>
                  <TableCell>{spec.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
      <TabsContent value='reviews' className='py-4'>
        <div className='space-y-4'>
          <h3 className='text-lg font-medium'>Customer Reviews</h3>
          <div className='rounded-lg border p-6 text-center'>
            <p className='text-muted-foreground'>
              No reviews yet. Be the first to review this product!
            </p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
