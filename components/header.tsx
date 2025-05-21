'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  MenuIcon,
  BellIcon,
  Search,
  User,
  LogOut,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useUser, useClerk } from '@clerk/nextjs';

interface HeaderProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export function Header({ isCollapsed, setIsCollapsed }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoaded: isUserLoaded } = useUser();
  const { signOut } = useClerk();
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/sign-in');
  };

  useEffect(() => {
    // Update page title based on pathname
    if (pathname === '/') {
      setPageTitle('Dashboard');
    } else if (pathname.startsWith('/leases')) {
      setPageTitle('Lease Management');
    } else if (pathname.startsWith('/upload')) {
      setPageTitle('Upload Documents');
    } else if (pathname.startsWith('/reports')) {
      setPageTitle('Reports & Analytics');
    } else if (pathname.startsWith('/settings')) {
      setPageTitle('Settings');
    } else if (pathname.startsWith('/users')) {
      setPageTitle('User Management');
    }

    // Check if mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      )}

      <div className="flex-1 flex flex-col gap-1">
        <h1 className="text-lg font-semibold md:text-xl">{pageTitle}</h1>
        <div className="hidden md:flex text-xs text-muted-foreground">
          <span>Wednesday, June 12, 2024</span>
        </div>
      </div>

      <div
        className={`relative transition-all ${isSearchFocused ? 'w-64 md:w-80' : 'w-40 md:w-60'}`}
      >
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="pl-8 w-full"
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
      </div>

      <Separator orientation="vertical" className="h-8" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
            <span className="sr-only">Notifications</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <div className="p-2 font-medium">Notifications</div>
          <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
            <div className="font-medium">New lease uploaded</div>
            <div className="text-sm text-muted-foreground">
              Office space at 123 Business Plvd
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              2 minutes ago
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
            <div className="font-medium">Lease expiring soon</div>
            <div className="text-sm text-muted-foreground">
              Warehouse lease #WH-2023-01
            </div>
            <div className="text-xs text-muted-foreground mt-1">1 hour ago</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ModeToggle />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Avatar className="h-9 w-9">
              {isUserLoaded && user?.imageUrl ? (
                <AvatarImage
                  src={user.imageUrl}
                  alt={user.fullName || 'User'}
                />
              ) : null}
              <AvatarFallback className="bg-primary/10 text-primary">
                {isUserLoaded && user
                  ? user.firstName && user.lastName
                    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
                    : user.emailAddresses[0]?.emailAddress
                        .substring(0, 2)
                        .toUpperCase() || 'U'
                  : 'U'}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="p-2 text-start">
            <div className="font-medium">
              {isUserLoaded && user ? user.fullName || 'User' : 'Loading...'}
            </div>
            <div className="text-sm text-muted-foreground">
              {isUserLoaded && user
                ? user.primaryEmailAddress?.emailAddress
                : ''}
            </div>
          </div>
          <DropdownMenuItem onClick={() => router.push('/user-profile')}>
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
