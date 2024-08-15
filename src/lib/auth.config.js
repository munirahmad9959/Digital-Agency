export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // console.log('JWT Callback - User:', user);
                token.id = user.id;
                token.isAdmin = user.isAdmin;
            }
            // console.log('JWT Token:', token);
            return token;
        },
        async session({ session, token }) {
            // console.log('Session Callback - Token:', token);
            if (token) {
                session.user.id = token.id;
                session.user.isAdmin = token.isAdmin;
            }
            // console.log('Session:', session);
            return session;
        },
        async authorized({ token, request }) {
            const isAdmin = token?.isAdmin; // Updated: Checking token.isAdmin instead of user.isAdmin
            const isOnAdminPanel = request.nextUrl?.pathname.startsWith('/admin');
            const isOnBlogPage = request.nextUrl?.pathname.startsWith('/blog');
            const isOnLoginPage = request.nextUrl?.pathname.startsWith('/login');

            // Only admin can access the admin panel
            if (isOnAdminPanel && !isAdmin) { // Updated: Checking isAdmin directly
                return false;
            }

            // Only authenticated users can access the blog page
            if (isOnBlogPage && !token) { // Updated: Checking token instead of user
                return false;
            }

            // Only unauthenticated users can access the login page
            if (isOnLoginPage && token) { // Updated: Redirect if token exists
                return Response.redirect('/', request.nextUrl);
            }

            return true;
        }
    }
};
