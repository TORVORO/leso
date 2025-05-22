'use client';

import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { UserProfile } from '../auth/UserProfile';
import { SignOutButton } from '../auth/SignOutButton';

export function NavBar() {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <nav className="border-b border-gray-200 bg-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          LeaseSync
        </Link>

        <div className="flex items-center gap-4">
          {isLoaded && isSignedIn ? (
            <UserProfile />
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/sign-in"
                className="text-sm font-medium hover:underline"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="text-sm font-medium bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
