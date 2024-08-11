export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        // async jwt({ token, user }) {
        //     if (user) {
        //         console.log('JWT Callback - User:', user);
        //         token.id = user.id;
        //         token.isAdmin = user.isAdmin;
        //     }
        //     console.log('JWT Token:', token);
        //     return token;
        // },
        // async session({ session, token }) {
        //     console.log('Session Callback - Token:', token);
        //     if (token) {
        //         session.user.id = token.id;
        //         session.user.isAdmin = token.isAdmin;
        //     }
        //     console.log('Session:', session);
        //     return session;
        // },
        // async authorized({ token }) {
        //     console.log('Authorized Callback - Token:', token);
        //     return !!token;  // Allow access only if there is a token
        // }
    }
};
