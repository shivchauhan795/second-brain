import prisma from "@/app/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        const name = email.split("@")[0];
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        });
        console.log(user);
        return new Response(JSON.stringify({ message: "Registration Successful" }));
    } catch (e) {
        return new Response(JSON.stringify({ message: "Registration Failed" }), { status: 500 });
    }
}