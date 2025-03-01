export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        console.log({ email, password });
        return new Response(JSON.stringify({ message: "Registration Successful" }));
    } catch (e) {
        console.log({ e });
    }
}