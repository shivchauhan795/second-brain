import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
    pages: {
        signIn: "/signin",
    },
    providers: [
        CredentialsProvider({
            name: "email",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                // db logic here
                const username = credentials?.email;
                const password = credentials?.password;
                console.log(username, password);
                const user = {
                    id: "1",
                    name: "shiv",
                    email: "abc@example.com",
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