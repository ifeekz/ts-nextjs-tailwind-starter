import type React from 'react';

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function DashboardHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className='mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>{heading}</h1>
        {text && <p className='text-muted-foreground'>{text}</p>}
      </div>
      {children && <div className='flex-shrink-0'>{children}</div>}
    </div>
  );
}
