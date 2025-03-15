import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
    const isLoginPage = request.nextUrl.pathname === '/login';
    
    // Get the JWT token from the Authorization header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1]; // Extract token from "Bearer <token>"
    
    let isAuthenticated = false;

    if (token) {
        try {
            const secret = process.env.NEXT_PUBLIC_SESSION_SECRET!;
            jwt.verify(token, secret);
            isAuthenticated = true;
        } catch (error) {
            console.error('JWT verification failed:', error);
            isAuthenticated = false;
        }
    }

    console.log('Middleware check:', {
        isAuthenticated,
        isLoginPage,
        pathname: request.nextUrl.pathname
    });

    if (!isAuthenticated && !isLoginPage) {
        console.log('Redirecting to login');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isAuthenticated && isLoginPage) {
        console.log('Redirecting to home');
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};