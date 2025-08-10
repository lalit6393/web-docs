import { cookies } from "next/headers";

export async function POST(req: Request) {

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value || '';
        const data = await req.json();

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

        const res = await fetch(`${baseUrl}/document/collaborator`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        return Response.json(result);

    } catch (_error) {
        return new Response('Internal Server Error', { status: 500 });
    }
}