export async function POST(req: Request) {

    try {
        const data = await req.json();
        const body = {
            email: data.email,
            password: data.password,
            fullname: data.fullname,
            dob: data.dob
        };

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

        const response = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const result = await response.json();

        return Response.json(result);

    } catch (err) {
        return new Response('Internal Server Error', { status: 500 });
    }
}