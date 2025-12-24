import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Order {
  id: string;
  listTitle: string;
  customerName: string;
  customerAvatar: string;
  amount: number;
  status: 'processing' | 'ready' | 'in-transit' | 'delivered' | 'cancelled';
  date: string;
}

const orderStatusColors = {
  processing: 'bg-blue-500',
  ready: 'bg-yellow-500',
  'in-transit': 'bg-purple-500',
  delivered: 'bg-emerald-500',
  cancelled: 'bg-red-500',
};

const orders: Order[] = [
  {
    id: 'ord1',
    listTitle: 'Weekly Grocery Shopping',
    customerName: 'John Doe',
    customerAvatar: '/placeholder.svg?height=40&width=40',
    amount: 15000,
    status: 'processing',
    date: 'Today',
  },
  {
    id: 'ord2',
    listTitle: 'Birthday Party Supplies',
    customerName: 'Sarah Johnson',
    customerAvatar: '/placeholder.svg?height=40&width=40',
    amount: 25000,
    status: 'ready',
    date: 'Yesterday',
  },
  {
    id: 'ord3',
    listTitle: 'Office Supplies',
    customerName: 'Emily Wilson',
    customerAvatar: '/placeholder.svg?height=40&width=40',
    amount: 12000,
    status: 'in-transit',
    date: '2 days ago',
  },
  {
    id: 'ord4',
    listTitle: 'Monthly Groceries',
    customerName: 'David Lee',
    customerAvatar: '/placeholder.svg?height=40&width=40',
    amount: 35000,
    status: 'delivered',
    date: '1 week ago',
  },
];

export default function RecentOrders() {
  return (
    <Card className='lg:col-span-4'>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Latest orders from customers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {orders.slice(0, 3).map((order) => (
            <div key={order.id} className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <Avatar className='h-9 w-9'>
                  <AvatarImage
                    src={order.customerAvatar || '/placeholder.svg'}
                    alt={order.customerName}
                  />
                  <AvatarFallback>
                    {order.customerName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-medium'>{order.customerName}</p>
                  <div className='flex items-center gap-2 text-xs text-gray-500'>
                    <span>{order.listTitle}</span>
                    <span>•</span>
                    <span>{order.date}</span>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <div className='text-right'>
                  <p className='font-medium'>
                    ₦{order.amount.toLocaleString()}
                  </p>
                  <Badge
                    className={`${
                      orderStatusColors[
                        order.status as keyof typeof orderStatusColors
                      ]
                    } capitalize text-white`}
                  >
                    {order.status}
                  </Badge>
                </div>
                <Button variant='ghost' size='icon' asChild>
                  <Link href={`/orders/${order.id}`}>
                    <ChevronRight className='h-4 w-4' />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        {orders.length > 3 && (
          <div className='mt-4 text-center'>
            <Button variant='outline' size='sm'>
              View all orders
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
