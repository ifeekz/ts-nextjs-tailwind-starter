'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { products } from '@/data/products';

// Sort products by price (as a proxy for popularity in this demo)
const topProducts = [...products].sort((a, b) => b.price - a.price).slice(0, 5);

export function TopProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Your best-selling products this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {topProducts.map((product) => (
            <div key={product.id} className='flex items-center gap-4'>
              <div className='h-12 w-12 relative overflow-hidden rounded-md border'>
                <Image
                  src={
                    product.thumbnail || '/placeholder.svg?height=48&width=48'
                  }
                  alt={product.name}
                  fill
                  className='object-cover'
                />
              </div>
              <div className='flex-1 space-y-1'>
                <Link
                  href={`/products/${product.id}`}
                  className='font-medium hover:underline'
                >
                  {product.name}
                </Link>
                <p className='text-xs text-muted-foreground'>
                  {(product.category as string).charAt(0).toUpperCase() +
                    (product.category as string).slice(1)}
                </p>
              </div>
              <div className='font-medium'>${product.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
