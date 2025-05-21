import {
  clerkMiddleware,
  type ClerkMiddlewareAuthObject,
} from '@clerk/nextjs/server';
import { type NextRequest, NextResponse } from 'next/server';

// Regex patterns for routes that should be publicly accessible (no auth required)
const PUBLIC_ROUTE_REGEXES = [
  /^\/sign-in(\/.*)?$/,
  /^\/sign-up(\/.*)?$/,
  /^\/api\/webhooks(\/.*)?$/,
];

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTE_REGEXES.some((regex) => regex.test(pathname));
}

export default clerkMiddleware(
  (auth: ClerkMiddlewareAuthObject, req: NextRequest) => {
    const { pathname } = req.nextUrl;

    // Always allow public routes
    if (isPublicRoute(pathname)) {
      return NextResponse.next();
    }

    // Unauthenticated user on a protected route -> redirect to sign-in
    if (!auth.userId) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Authenticated user visiting the root path ("/") -> redirect to dashboard
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Default: allow request to continue
    return NextResponse.next();
  }
);

// Match all routes except static files and Next.js internals
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)'],
};
