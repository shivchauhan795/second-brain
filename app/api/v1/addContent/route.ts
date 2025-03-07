import prisma from "@/app/db";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        let tokenName;
        if (process.env.NODE_ENV === "development") {
            tokenName = "__Secure-next-auth.session-token";
        } else {
            tokenName = "next-auth.session-token";
        }
        const token = cookieStore.get(tokenName)?.value;
        const decodedData = await decode({ token: token, secret: process.env.NEXTAUTH_SECRET || "" });

        const userId = parseInt(decodedData?.sub ?? "");
        if (!userId) {
            return new Response(JSON.stringify({ message: "No User Found" }), { status: 401 });
        }
        const { title, link, type } = await req.json();
        await prisma.content.create({
            data: {
                title,
                link,
                type,
                userId
            }
        })

        return new Response(JSON.stringify({ message: "Content Added Successfully" }));
    } catch (e) {
        return new Response(JSON.stringify({ message: "Content Addition Failed" }), { status: 500 });
    }
}