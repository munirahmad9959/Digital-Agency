import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request) {
    // Attempt to retrieve the token
    const token = await getToken({ req: request, secret });

    if (!token) {
        console.log("No token found, redirecting to login...");
        if (request.nextUrl.pathname !== '/login') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.next();
    }

    // Token found, print it to the console
    console.log(`The token of the current session is: ${JSON.stringify(token, null, 2)}`);

    // Example of conditional redirection based on a token property (e.g., user role)
    if (request.nextUrl.pathname.startsWith('/admin') && !token.isAdmin) { // Added: Check for admin access
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();  // Continue with the request if no redirection is needed
}

export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next).*)'],
};
