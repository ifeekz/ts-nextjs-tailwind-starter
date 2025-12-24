'use client';

import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for the chart
const dailyData = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const weeklyData = [
  { name: 'Week 1', sales: 12000 },
  { name: 'Week 2', sales: 9800 },
  { name: 'Week 3', sales: 11200 },
  { name: 'Week 4', sales: 13500 },
];

const monthlyData = [
  { name: 'Jan', sales: 42000 },
  { name: 'Feb', sales: 38000 },
  { name: 'Mar', sales: 45000 },
  { name: 'Apr', sales: 39000 },
  { name: 'May', sales: 47000 },
  { name: 'Jun', sales: 52000 },
  { name: 'Jul', sales: 58000 },
  { name: 'Aug', sales: 61000 },
  { name: 'Sep', sales: 55000 },
  { name: 'Oct', sales: 49000 },
  { name: 'Nov', sales: 51000 },
  { name: 'Dec', sales: 68000 },
];

export function SalesChart() {
  const [storeFilter, setStoreFilter] = useState('all');

  return (
    <Card className='h-full'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <div>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>
            View your sales performance over time
          </CardDescription>
        </div>
        <Select value={storeFilter} onValueChange={setStoreFilter}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='All Stores' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Stores</SelectItem>
            <SelectItem value='store-1'>Downtown Market</SelectItem>
            <SelectItem value='store-2'>Westside Grocery</SelectItem>
            <SelectItem value='store-3'>Eastside Market</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='daily'>
          <TabsList className='mb-4'>
            <TabsTrigger value='daily'>Daily</TabsTrigger>
            <TabsTrigger value='weekly'>Weekly</TabsTrigger>
            <TabsTrigger value='monthly'>Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value='daily' className='h-[300px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                <Bar dataKey='sales' fill='#3b82f6' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value='weekly' className='h-[300px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                <Bar dataKey='sales' fill='#3b82f6' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value='monthly' className='h-[300px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                <Bar dataKey='sales' fill='#3b82f6' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
