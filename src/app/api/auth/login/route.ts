import { login } from "./login";

export async function POST(req: Request) {
    try {

        const data = await req.json();
        const response = await login(
            {
                email: data.username,
                password: data.password
            });

        return Response.json(response)

    } catch (error) {
        return new Response('Internal Server Error', { status: 500 });
    }
}