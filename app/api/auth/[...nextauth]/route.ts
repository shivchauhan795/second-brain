import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/db";
import bcrypt from "bcrypt";

const handler = NextAuth({
    pages: {
        signIn: "/signin",
    },
    cookies: {
        sessionToken:{
            name: "next-auth.session-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
            }
        }  
    },
    useSecureCookies: process.env.NODE_ENV === "production",
    providers: [
        CredentialsProvider({
            name: "email",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;

                const foundUser = await prisma.user.findFirst({
                    where: {
                        email: email,
                    }
                })

                if (!foundUser) {
                    return null;
                }

                if (password && ! await bcrypt.compare(password, foundUser.password)) {
                    return null;
                }

                const user = {
                    id: foundUser.id.toString(),
                    name: foundUser.name,
                    email: foundUser.email,
                }

                if (user) {
                    Response.json(user);
                    return user
                }
                else {
                    return null
                }
            }
        }),

    ],
    secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };