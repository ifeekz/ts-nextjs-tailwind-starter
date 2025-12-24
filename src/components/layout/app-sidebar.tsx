'use client';

import {
  AudioWaveform,
  BarChartIcon,
  Bell,
  CameraIcon,
  Command,
  CreditCard,
  Database,
  DatabaseIcon,
  FileCodeIcon,
  FileText,
  FileTextIcon,
  GalleryVerticalEnd,
  LayoutDashboardIcon,
  Mail,
  Settings,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import type * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { NavMain } from './nav-main';
import { NavSecondary } from './nav-secondary';
import { NavUser } from './nav-user';
// import { TeamSwitcher } from "./team-switcher"

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: LayoutDashboardIcon,
    },
    {
      title: 'Analytics',
      url: '/analytics',
      icon: BarChartIcon,
    },
    {
      title: 'Reports',
      url: '/reports',
      icon: FileText,
    },
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: CameraIcon,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Proposal',
      icon: FileTextIcon,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Prompts',
      icon: FileCodeIcon,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
  ],
  management: [
    {
      title: 'Inventory',
      icon: DatabaseIcon,
      url: '/products',
    },
    {
      title: 'Users',
      icon: Users,
      url: '#',
    },
    {
      title: 'Orders',
      icon: ShoppingBag,
      url: '#',
    },
    {
      title: 'Payments',
      icon: CreditCard,
      url: '#',
    },
  ],
  system: [
    {
      title: 'Security',
      url: '/security',
      icon: Shield,
    },
    {
      title: 'Notifications',
      url: '/notifications',
      icon: Bell,
    },
    {
      title: 'Email Templates',
      url: '/email-templates',
      icon: Mail,
    },
    {
      title: 'System Logs',
      url: '/logs',
      icon: Database,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings,
    },
  ],
  inventory: [
    {
      name: 'Products',
      url: '/products ',
      icon: DatabaseIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              // className='data-[slot=sidebar-menu-button]:p-1.5!'
            >
              <Link href='#'>
                <ShoppingCart className='h-10 w-10 text-emerald-500' />
                <span className='text-base font-semibold'>Priceforte</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* <TeamSwitcher teams={data.teams} /> */}
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary
          label='Management'
          items={data.management}
          className='mt-auto bg-red'
        />
        <NavSecondary label='System' items={data.system} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
