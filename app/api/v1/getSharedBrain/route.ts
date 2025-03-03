import prisma from "@/app/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const hash = searchParams.get("brainId");
        if (!hash) {
            return new Response(JSON.stringify({ message: "Invalid Link" }), { status: 401 });
        }

        const data = await prisma.user.findFirst({
            where: {
                hash: {
                    hash
                }
            },
            select: {
                name: true,
                content: {
                    select: {
                        id: true,
                        title: true,
                        link: true,
                        type: true
                    }
                }
            }
        })
        if (!data) {
            return new Response(JSON.stringify({ message: "No Data Found" }), { status: 401 });
        }

        return new Response(JSON.stringify({ message: "Data Found", data }), { status: 200 });

    } catch (e) {
        return new Response(JSON.stringify({ message: "Getting Shared Brain Failed" }), { status: 500 });
    }
}