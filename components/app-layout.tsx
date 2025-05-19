"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  // Handle window resize
  useEffect(() => {
    setIsMounted(true);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Don't render anything until client-side
  if (!isMounted) return null;

  // Check if we're on the login page
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return (
      <main className="flex min-h-screen flex-col">{children}</main>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} isMobile={isMobile} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main className={cn(
          "flex-1 overflow-y-auto p-4 md:p-6 transition-all",
          {
            "lg:ml-64": !isCollapsed,
            "lg:ml-20": isCollapsed,
          }
        )}>
          {children}
        </main>
      </div>
    </div>
  );
}