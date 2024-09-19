import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request) {
    // Attempt to retrieve the token
    const token = await getToken({ req: request, secret });

    // If no token and the user is trying to access protected routes (not login or register)
    if (!token) {
        if (
            request.nextUrl.pathname !== '/login' && 
            request.nextUrl.pathname !== '/register'
        ) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        // Allow access to /login and /register if not authenticated
        return NextResponse.next();
    }

    // Token found, check for role-based access or redirect authenticated users from login/register
    if (request.nextUrl.pathname.startsWith('/admin') && !token.isAdmin) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Redirect authenticated users from accessing login or register page
    if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Allow access to other pages if authenticated
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next).*)'],
};
