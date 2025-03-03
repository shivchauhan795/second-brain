import prisma from "@/app/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // Validate email and password
        if (!email || !password) {
            return new Response(JSON.stringify({ message: "Email and password are required." }), { status: 400 });
        }

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return new Response(JSON.stringify({ message: "Email already registered." }), { status: 409 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 8);
        const name = email.split("@")[0];

        // Create the user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });

        return new Response(JSON.stringify({ message: "Registration Successful", user }), { status: 201 });

    } catch (error) {
        console.error("Error during registration:", error);
        
        return new Response(
            JSON.stringify({ message: "Registration Failed", error: error|| "Internal Server Error" }), 
            { status: 500 }
        );
    }
}
