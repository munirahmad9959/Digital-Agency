export const authConfig = {
    pages: {
        signIn: '/login',
        // signOut: '/logout',
        // error: '/login',
        // verifyRequest: '/login',
        // newUser: null
    },
    providers: [],
    callbacks: {
        authorized({ auth, request }) {
            return false
        }
    }
}