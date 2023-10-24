import nextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import db from "@/prisma/db";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Trader" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null
                }

                const user = await db.user.findUnique({
                    where: {
                        username: credentials.username
                    },
                });

                if (!user || !user?.hashedPassword) {
                    return null;
                }

                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isValid) {
                    return null;
                }

                return user;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                }
            }
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                }
            }
            return token;
        }
    }
}

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };