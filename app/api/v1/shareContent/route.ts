import prisma from "@/app/db";
import Hash from "@/app/utils/hash";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("next-auth.session-token")?.value;
        const decodedData = await decode({ token: token, secret: process.env.NEXTAUTH_SECRET || "" });

        const userId = parseInt(decodedData?.sub ?? "");
        if (!userId) {
            return new Response(JSON.stringify({ message: "No User Found" }), { status: 401 });
        }
        const { isChecked } = await req.json();
        if (!userId) {
            return new Response(JSON.stringify({ message: "Share Content Failed" }), { status: 500 });
        }

        if (!isChecked) {
            const link = await prisma.shareLink.findFirst({
                where: {
                    userId
                }
            })
            if (link) {
                await prisma.shareLink.delete({
                    where: {
                        userId
                    }
                })
            } else {
                return new Response(JSON.stringify({ message: "No Link Found" }), { status: 401 });
            }
            return new Response(JSON.stringify({ message: "Link Deleted Successfully" }), { status: 200 });
        }

        //  create hash
        const hash = Hash();
        await prisma.shareLink.create({
            data: {
                hash,
                userId
            }
        })
        return new Response(JSON.stringify({ message: "Link Created Successfully", hash }), { status: 200 });
    }
    catch (e) {
        return new Response(JSON.stringify({ message: "Share Content Failed" }), { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("next-auth.session-token")?.value;
        const decodedData = await decode({ token: token, secret: process.env.NEXTAUTH_SECRET || "" });

        const userId = parseInt(decodedData?.sub ?? "");
        if (!userId) {
            return new Response(JSON.stringify({ message: "No User Found" }), { status: 401 });
        }
        const link = await prisma.shareLink.findFirst({
            where: {
                userId
            }
        })
        if (link) {
            return new Response(JSON.stringify({ message: "Link Found", link }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ message: "No Link Found" }), { status: 401 });
        }
    } catch (e) {
        return new Response(JSON.stringify({ message: "Getting Link Failed" }), { status: 500 });
    }
}