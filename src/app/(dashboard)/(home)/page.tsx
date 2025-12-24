import type { Metadata } from 'next';

import { DashboardHeader } from './_components/dashboard-header';
import { DashboardStats } from './_components/dashboard-stats';
import InventoryStatus from './_components/inventory-status';
import { QuickLinks } from './_components/quick-links';
import { RecentActivity } from './_components/recent-activity';
import RecentOrders from './_components/recent-orders';
import { SalesChart } from './_components/sales-chart';
import { TopProducts } from './_components/top-products';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Overview of your store performance and recent activity',
};

export default function BusinessDashboardPage() {
  return (
    <div className='container p-6 flex-1 space-y-6'>
      <DashboardHeader />
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <DashboardStats />
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <RecentOrders />
        <InventoryStatus />
      </div>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <SalesChart />
        </div>
        <div>
          <QuickLinks />
        </div>
      </div>
      <div className='grid gap-6 md:grid-cols-2 mt-6'>
        <TopProducts />
        <RecentActivity />
      </div>
    </div>
  );
}
