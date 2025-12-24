import { redirect } from 'next/navigation';
import type * as React from 'react';

import { AppSidebar } from '@/components/layout/app-sidebar';
import DashboardShell from '@/components/layout/dashboard-shell';
import { SiteHeader } from '@/components/layout/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { getAuthUserServer } from '@/lib/auth';

export default async function DashoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getAuthUserServer();

  if (!user) {
    redirect('/login');
  }

  return (
    <SidebarProvider className='sidebar-gradient'>
      <AppSidebar variant='inset' className='text-white w-70' />
      <SidebarInset className='bg-sidebar-primary-foreground/50x bg-white backdrop-blur-sm'>
        <SiteHeader className='sticky top-0 z-50 bg-sidebar-primary-foreground/50x bg-white/80 backdrop-blur-sm dark:bg-black/50 border-b border-border rounded-t-xl' />
        <DashboardShell className='container p-6'>{children}</DashboardShell>
      </SidebarInset>
    </SidebarProvider>
  );
}
