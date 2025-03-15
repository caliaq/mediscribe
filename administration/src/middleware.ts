import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  // Get token from cookies or headers
  const token = request.cookies.get('token')?.value || request.headers.get('Authorization')

  // Get the current path
  const { pathname } = request.nextUrl

  // If the user is not authenticated and trying to access protected routes
  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If the user is authenticated and trying to access login page
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public resources)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}