'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { stores } from '@/data/stores';

// Combine and sort recent activities
const activities = [
  ...products.slice(0, 3).map((product) => ({
    id: `product-${product.id}`,
    type: 'product',
    title: `Product "${product.name}" was added`,
    timestamp: new Date(product.createdAt as string),
    user: 'JD',
    userFullName: 'John Doe',
  })),
  ...categories.slice(0, 2).map((category) => ({
    id: `category-${category.id}`,
    type: 'category',
    title: `Category "${category.name}" was created`,
    timestamp: new Date(category.createdAt),
    user: 'AS',
    userFullName: 'Alice Smith',
  })),
  ...stores.slice(0, 2).map((store) => ({
    id: `store-${store.id}`,
    type: 'store',
    title: `Store "${store.name}" was updated`,
    timestamp: new Date(store.createdAt),
    user: 'RJ',
    userFullName: 'Robert Johnson',
  })),
]
  .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  .slice(0, 5);

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions across your stores</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {activities.map((activity) => (
            <div key={activity.id} className='flex items-start gap-4'>
              <Avatar className='h-9 w-9'>
                <AvatarImage
                  src='/placeholder.svg?height=36&width=36'
                  alt={activity.userFullName}
                />
                <AvatarFallback>{activity.user}</AvatarFallback>
              </Avatar>
              <div className='space-y-1'>
                <p className='text-sm font-medium'>{activity.title}</p>
                <p className='text-xs text-muted-foreground'>
                  {activity.userFullName} •{' '}
                  {activity.timestamp.toLocaleDateString()} at{' '}
                  {activity.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
