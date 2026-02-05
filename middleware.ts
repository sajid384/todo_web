import { NextRequest, NextResponse } from 'next/server';

// Protect all routes except login, register, and public assets
export function middleware(request: NextRequest) {
  // Allow access to login and register pages
  if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') {
    return NextResponse.next();
  }

  // For other routes, we'll let the components handle authentication
  // since we need to use React hooks for session management
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};