'use client';

import { useUser } from '@clerk/nextjs';
import { SignOutButton } from './SignOutButton';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function UserProfile() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />;
  }

  if (!user) {
    return null;
  }

  // Get initials for avatar fallback
  const initials =
    user.firstName && user.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
      : user.emailAddresses[0]?.emailAddress.substring(0, 2).toUpperCase() ||
        '??';

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-end">
        <p className="text-sm font-medium">
          {user.fullName || user.emailAddresses[0]?.emailAddress}
        </p>
        <SignOutButton
          variant="link"
          size="sm"
          showIcon={false}
          className="h-auto p-0 text-xs text-gray-500"
        />
      </div>
      <Avatar>
        <AvatarImage src={user.imageUrl} alt={user.fullName || 'User'} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </div>
  );
}
