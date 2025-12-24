import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

const products: Product[] = [
  {
    id: 'p1',
    name: 'Rice (5kg)',
    category: 'Groceries',
    price: 5000,
    stock: 50,
    image: '/placeholder.svg?height=80&width=80',
    status: 'in-stock',
  },
  {
    id: 'p2',
    name: 'Beans (2kg)',
    category: 'Groceries',
    price: 3000,
    stock: 30,
    image: '/placeholder.svg?height=80&width=80',
    status: 'in-stock',
  },
  {
    id: 'p3',
    name: 'Vegetable Oil (5L)',
    category: 'Groceries',
    price: 8000,
    stock: 15,
    image: '/placeholder.svg?height=80&width=80',
    status: 'low-stock',
  },
  {
    id: 'p4',
    name: 'Tomato Paste (400g)',
    category: 'Groceries',
    price: 1200,
    stock: 0,
    image: '/placeholder.svg?height=80&width=80',
    status: 'out-of-stock',
  },
  {
    id: 'p5',
    name: 'Milk (1L)',
    category: 'Dairy',
    price: 2500,
    stock: 25,
    image: '/placeholder.svg?height=80&width=80',
    status: 'in-stock',
  },
  {
    id: 'p6',
    name: 'Eggs (Crate)',
    category: 'Dairy',
    price: 3500,
    stock: 10,
    image: '/placeholder.svg?height=80&width=80',
    status: 'low-stock',
  },
];

export default function InventoryStatus() {
  const lowStockProducts = products.filter(
    (product) => product.status === 'low-stock',
  );
  const outOfStockProducts = products.filter(
    (product) => product.status === 'out-of-stock',
  );

  return (
    <Card className='lg:col-span-3'>
      <CardHeader>
        <CardTitle>Inventory Status</CardTitle>
        <CardDescription>Overview of your product inventory</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='h-3 w-3 rounded-full bg-emerald-500' />
              <span className='text-sm'>In Stock</span>
            </div>
            <span className='font-medium'>
              {products.filter((p) => p.status === 'in-stock').length} products
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='h-3 w-3 rounded-full bg-yellow-500' />
              <span className='text-sm'>Low Stock</span>
            </div>
            <span className='font-medium'>
              {lowStockProducts.length} products
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='h-3 w-3 rounded-full bg-red-500' />
              <span className='text-sm'>Out of Stock</span>
            </div>
            <span className='font-medium'>
              {outOfStockProducts.length} products
            </span>
          </div>

          <div className='pt-4'>
            <p className='mb-2 text-sm font-medium'>Low Stock Items</p>
            <div className='space-y-3'>
              {lowStockProducts.slice(0, 2).map((product) => (
                <div
                  key={product.id}
                  className='flex items-center justify-between'
                >
                  <div className='flex items-center gap-2'>
                    <Avatar className='h-8 w-8 rounded-md'>
                      <AvatarImage
                        src={product.image || '/placeholder.svg'}
                        alt={product.name}
                      />
                      <AvatarFallback className='rounded-md'>
                        {product.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='text-sm font-medium'>{product.name}</p>
                      <p className='text-xs text-gray-500'>
                        {product.stock} units left
                      </p>
                    </div>
                  </div>
                  <Button size='sm' variant='outline'>
                    Restock
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='mt-4 text-center'>
          <Button variant='outline' size='sm'>
            Manage inventory
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
