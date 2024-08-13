import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { authConfig } from '@/lib/auth.config';
import { User } from '@/lib/models';
import { connectToDb } from '@/lib/utils';

const login = async (credentials) => {
    try {
        await connectToDb();
        const user = await User.findOne({ username: credentials.username });

        if (!user) {
            throw new Error("Wrong Credentials!");
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordCorrect) {
            throw new Error("Wrong Credentials!");
        }

        return user;
    } catch (error) {
        console.log(`Error in file [...nextauth]/route.js with message: ${error.message}`);
        throw new Error("Failed to login");
    }
};

export const authOptions = NextAuth({
    ...authConfig,
    providers: [
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
                    const user = await login(credentials);
                    return { id: user._id, email: user.email, isAdmin: user.isAdmin };
                } catch (error) {
                    console.log(`Authorization failed: ${error.message}`);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === 'github') {
                await connectToDb();
                try {
                    let existingUser = await User.findOne({ email: profile.email });
                    if (!existingUser) {
                        existingUser = new User({
                            username: profile.login,
                            email: profile.email,
                            image: profile.avatar_url,
                        });
                        await existingUser.save();
                    }
                } catch (error) {
                    console.log(`Error in file [...nextauth]/route.js with message: ${error.message}`);
                    return false;
                }
            }
            return true;
        },
        ...authConfig.callbacks,
    }
});

export { authOptions as GET, authOptions as POST };
