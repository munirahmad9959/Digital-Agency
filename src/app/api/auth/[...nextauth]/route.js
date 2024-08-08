import { User } from '@/lib/models';
import { connectToDb } from '@/lib/utils';
import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { authConfig } from '@/lib/auth.config';


const login = async (credentials) => {
    try {
        connectToDb();

        const user = await User.findOne({ username: credentials.username })

        if (!user) {
            throw new Error("Wrong Credentials!")
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordCorrect) {
            throw new Error("Wrong Credentials!")
        }

        return user

    } catch (error) {
        console.log(`Error in file [...nextauth]/route.js with message: ${error.message}`)
        throw new Error("Failed to login")
    }

}

export const authoptions = NextAuth({
    ...authConfig,
    providers: [
        // OAuth authentication providers...
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials)
                    return user

                } catch (error) {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // console.log(user, account, profile)
            if (account.provider === 'github') {
                connectToDb();

                try {
                    const user = await User.findOne({ email: profile.email })
                    if (!user) {
                        const newUser = new User({
                            username: profile.login,
                            email: profile.email,
                            image: profile.avatar_url,
                        })
                        await newUser.save()
                    }

                } catch (error) {
                    console.log(`Error in file [...nextauth]/route.js with message: ${error.message}`)
                    return false
                }
            }
            return true
        },
        ...authConfig.callbacks,
    }
})

export { authoptions as GET, authoptions as POST }