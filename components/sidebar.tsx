"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  FileText, 
  UploadCloud, 
  BarChart3, 
  Settings, 
  Users, 
  ChevronRight, 
  ChevronLeft,
  Building2,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobile: boolean;
}

export function Sidebar({ isCollapsed, setIsCollapsed, isMobile }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(!isMobile);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);

  if (!isOpen && isMobile) {
    return null;
  }

  return (
    <>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-card border-r border-border transition-all duration-300 ease-in-out",
          {
            "w-64": !isCollapsed,
            "w-20": isCollapsed,
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen && isMobile,
          }
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          <div className={cn("flex items-center gap-2 transition-all", { "w-0 overflow-hidden": isCollapsed })}>
            <Building2 className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">LeaseSync</span>
          </div>
          {!isMobile && (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          )}
        </div>
        <ScrollArea className="flex-1 py-2">
          <nav className="flex flex-col gap-1 px-2">
            <SidebarItem
              href="/"
              icon={<Home className="h-5 w-5" />}
              label="Dashboard"
              isActive={pathname === '/'}
              isCollapsed={isCollapsed}
            />
            <SidebarItem
              href="/leases"
              icon={<FileText className="h-5 w-5" />}
              label="Leases"
              isActive={pathname.startsWith('/leases')}
              isCollapsed={isCollapsed}
            />
            <SidebarItem
              href="/upload"
              icon={<UploadCloud className="h-5 w-5" />}
              label="Upload"
              isActive={pathname.startsWith('/upload')}
              isCollapsed={isCollapsed}
            />
            <SidebarItem
              href="/reports"
              icon={<BarChart3 className="h-5 w-5" />}
              label="Reports"
              isActive={pathname.startsWith('/reports')}
              isCollapsed={isCollapsed}
            />
            <SidebarItem
              href="/users"
              icon={<Users className="h-5 w-5" />}
              label="Users"
              isActive={pathname.startsWith('/users')}
              isCollapsed={isCollapsed}
            />
            <SidebarItem
              href="/settings"
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              isActive={pathname.startsWith('/settings')}
              isCollapsed={isCollapsed}
            />
          </nav>
        </ScrollArea>
        <div className="mt-auto border-t border-border p-2">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start",
                    isCollapsed ? "px-2" : "px-4"
                  )}
                  onClick={() => {}}
                >
                  <LogOut className="h-5 w-5" />
                  {!isCollapsed && <span className="ml-2">Logout</span>}
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  Logout
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </aside>
    </>
  );
}

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
}

function SidebarItem({ href, icon, label, isActive, isCollapsed }: SidebarItemProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link href={href}>
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start transition-all",
                isCollapsed ? "px-2" : "px-4"
              )}
            >
              {icon}
              {!isCollapsed && <span className="ml-2">{label}</span>}
            </Button>
          </Link>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="right">
            {label}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}