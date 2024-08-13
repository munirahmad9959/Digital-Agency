// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth({
//     pages: {
//         signIn: "/login",  
//     },
//     callbacks: {
//         authorized({ token, req }) {
//             const { pathname } = req.nextUrl;
//             console.log(`Token from middleware file is ${JSON.stringify(token, null, 2)}`);

//             if (token) {
//                 return true;
//             }


//         },
//     },
// });

// export const config = {
//     matcher: ['/((?!api|static|.*\\..*|_next).*)']
// };


// import { NextResponse } from 'next/server';

// export function middleware(req) {
//     // Extract token or other authentication data from request headers, cookies, etc.
//     const token = req.headers.get('authorization')?.replace('Bearer ', '');

//     // Define paths that do not require authentication
//     const publicPaths = ['/login', '/public'];

//     // Check if the request path is one of the public paths
//     if (publicPaths.includes(req.nextUrl.pathname)) {
//         return NextResponse.next();
//     }

//     // Custom authentication logic
//     if (token) {
//         // Here, you might validate the token or check session status
//         // If valid, allow the request
//         // For example, you might verify the token with an API
//         // Assuming a function validateToken exists
//         // const isValid = validateToken(token);
//         const isValid = true; // Replace with actual validation logic

//         if (isValid) {
//             return NextResponse.next();
//         }
//     }

//     // If authentication fails, redirect to the login page
//     const url = req.nextUrl.clone();
//     url.pathname = '/login';
//     return NextResponse.redirect(url);
// }

// export const config = {
//     matcher: ['/((?!api|static|.*\\..*|_next).*)']
// };


import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from './app/api/auth/[...nextauth]/route';

export async function middleware(req) {
    // Get session
    const session = await getServerSession(req, authOptions);

    if (session) {
        // Redirect authenticated users
        // return NextResponse.redirect(new URL('/', req.url));
        console.log("Session is available. Therefore you can review this page");
    } else {
        // Redirect unauthenticated users
        console.log("Session is not available. Therefore you cannot review this page");
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

// export const config = {
//     matcher: ['/((?!api|static|.*\\..*|_next).*)'],
// };
