'use client';

import { BarChart3, Package, ShoppingBag, Store } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function QuickLinks() {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
        <CardDescription>
          Quickly access key areas of your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <Button asChild variant='outline' className='h-auto justify-start p-3'>
          <Link href='/products' className='flex items-center gap-3'>
            <Package className='h-5 w-5' />
            <div className='flex flex-col items-start'>
              <span className='font-medium'>Products</span>
              <span className='text-xs text-muted-foreground'>
                Manage your product inventory
              </span>
            </div>
          </Link>
        </Button>
        <Button asChild variant='outline' className='h-auto justify-start p-3'>
          <Link href='/categories' className='flex items-center gap-3'>
            <ShoppingBag className='h-5 w-5' />
            <div className='flex flex-col items-start'>
              <span className='font-medium'>Categories</span>
              <span className='text-xs text-muted-foreground'>
                Organize your product catalog
              </span>
            </div>
          </Link>
        </Button>
        <Button asChild variant='outline' className='h-auto justify-start p-3'>
          <Link href='/stores' className='flex items-center gap-3'>
            <Store className='h-5 w-5' />
            <div className='flex flex-col items-start'>
              <span className='font-medium'>Stores</span>
              <span className='text-xs text-muted-foreground'>
                Manage your store locations
              </span>
            </div>
          </Link>
        </Button>
        <Button asChild variant='outline' className='h-auto justify-start p-3'>
          <Link href='/reports' className='flex items-center gap-3'>
            <BarChart3 className='h-5 w-5' />
            <div className='flex flex-col items-start'>
              <span className='font-medium'>Reports</span>
              <span className='text-xs text-muted-foreground'>
                View sales and performance data
              </span>
            </div>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
