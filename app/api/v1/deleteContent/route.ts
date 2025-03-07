import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import prisma from "@/app/db";

export async function DELETE(req: Request) {
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
        const data = await req.json();
        const id = data.id;
        console.log(typeof id);
        console.log(id, userId);
        await prisma?.content.delete({
            where: {
                id,
                userId
            }
        })

        return new Response(JSON.stringify({ message: "Content Deleted Successfully" }));
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ message: "Content Deletion Failed" }), { status: 500 });
    }
}