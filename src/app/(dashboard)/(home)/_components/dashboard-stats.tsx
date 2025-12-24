'use client';

import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  Gavel,
  Percent,
  ShoppingBag,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function DashboardStats() {
  return (
    <>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
          <DollarSign className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>₦35,000</div>
          <p className='text-xs text-muted-foreground'>
            <span className='text-emerald-500 flex items-center'>
              <ArrowUp className='mr-1 h-4 w-4' />
              12.5%
            </span>{' '}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Active Bids</CardTitle>
          <Gavel className='h-4 w-4 text-gray-500' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{500}</div>
          <p className='text-xs text-muted-foreground'>
            <span className='text-emerald-500 flex items-center'>
              1 accepted,
            </span>
            <span className='text-rose-500 flex items-center'>1 rejected</span>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Orders Won</CardTitle>
          <ShoppingBag className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{20}</div>
          <p className='text-xs text-muted-foreground'>
            <span className='text-emerald-500 flex items-center'>
              <ArrowUp className='mr-1 h-4 w-4' />
              4.1%
            </span>{' '}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Conversion Rate</CardTitle>
          <Percent className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>68%</div>
          <p className='text-xs text-muted-foreground'>
            <span className='text-rose-500 flex items-center'>
              <ArrowDown className='mr-1 h-4 w-4' />
              2.5%
            </span>{' '}
            from last month
          </p>
        </CardContent>
      </Card>
    </>
  );
}
