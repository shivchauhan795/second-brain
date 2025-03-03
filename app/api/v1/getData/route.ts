import prisma from "@/app/db";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("next-auth.session-token")?.value;
        const decodedData = await decode({ token: token, secret: process.env.NEXTAUTH_SECRET || "" });

        const userId = parseInt(decodedData?.sub ?? "");
        if (!userId) {
            return new Response(JSON.stringify({ message: "No User Found" }), { status: 401 });
        }
        const data = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                name: true,
                email: true,
                content: {
                    select: {
                        id: true,
                        title: true,
                        link: true,
                        type: true
                    }
                },
                hash: {
                    select: {
                        hash: true
                    }
                }
            }
        })

        console.log("ye hai data", data);
        return new Response(JSON.stringify(data));
    } catch (e) {
        console.log(e);
    }
}