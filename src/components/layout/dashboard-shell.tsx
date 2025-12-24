import type React from 'react';

interface DashboardShellProps {
  children: React.ReactNode;
  className?: string;
}

export default function DashboardShell({
  children,
  className,
}: DashboardShellProps) {
  return <div className={`space-y-6 ${className}`}>{children}</div>;
}
